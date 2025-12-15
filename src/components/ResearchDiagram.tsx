"use client";
import React, { useState } from 'react';
import { portfolioData } from "../data/portfolio";
import { useTheme } from "next-themes";

const scrollById = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
};

export const ResearchDiagram = () => {
  const { topics, pointers } = portfolioData.main.diagram;
  const [activeTopic, setActiveTopic] = useState<string | null>(null);
  const { theme } = useTheme();

  // Geometry Constants
  // Scaled up again
  const width = 1000; 
  const height = 400; 
  const centerX = width / 2;
  const centerY = height / 2;
  const petalRadius = 80; 
  const orbitRadius = 70; // Distance of petal center from diagram center

  // Pre-calculate positions for topics
  const count = topics.length;
  const angleStep = (2 * Math.PI) / count;
  // Rotate so first petal is at Top ( -PI/2 )
  const startAngle = -Math.PI / 2;

  const getThemeColor = (id: string, baseColor: string) => {
    if (theme === 'dark' || theme === 'colorful') {
      // Parse Hex
      const hex = baseColor.replace('#', '');
      const r = parseInt(hex.substring(0, 2), 16) / 255;
      const g = parseInt(hex.substring(2, 4), 16) / 255;
      const b = parseInt(hex.substring(4, 6), 16) / 255;

      // RGB to HSL
      const max = Math.max(r, g, b), min = Math.min(r, g, b);
      let h = 0, s = 0, l = (max + min) / 2;

      if (max !== min) {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
          case r: h = (g - b) / d + (g < b ? 6 : 0); break;
          case g: h = (b - r) / d + 2; break;
          case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
      }
      
      // Adjust for Dark Mode: darkened lightness
      l = Math.max(0.3, l * 0.65); 
      
      return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
    }
    return baseColor;
  };

  const topicPositions = topics.map((topic, index) => {
    const angle = startAngle + index * angleStep;
    const cx = centerX + orbitRadius * Math.cos(angle);
    const cy = centerY + orbitRadius * Math.sin(angle);
    return { ...topic, cx, cy, angle, themeColor: getThemeColor(topic.id, topic.color) };
  });

  // activeColor unused, using style logic

  return (
    <div className="w-full flex justify-center mb-0 px-4 relative">
       <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="w-full h-auto max-w-[1000px] font-sans">
         {/* Draw Petals (Circles) Layer */}
         {topicPositions.map((topic) => {
           const isFaint = activeTopic && activeTopic !== topic.id;
           return (
             <circle 
                key={topic.id}
                cx={topic.cx} cy={topic.cy} r={petalRadius} 
                className={`transition-all duration-300 cursor-pointer ${
                   theme === 'colorful' 
                     ? 'brightness-110 stroke-none' 
                     : 'mix-blend-multiply dark:mix-blend-screen stroke-background stroke-2'
                 } ${
                   isFaint 
                     ? 'opacity-20' 
                     : (theme === 'colorful' ? 'opacity-60 mix-blend-hard-light' : 'opacity-90 dark:opacity-40')
                 }`}
                fill={topic.themeColor}
                onMouseEnter={() => setActiveTopic(topic.id)}
                onMouseLeave={() => setActiveTopic(null)}
             />
           );
         })}

         {/* Draw Pointers */}
         {pointers.map((pointer, idx) => {
             // Calculate Intersection/Centroid
             const targets = topicPositions.filter(t => pointer.topicIds.includes(t.id));
             if (targets.length === 0) return null;

             const avgX = targets.reduce((sum, t) => sum + t.cx, 0) / targets.length;
             const avgY = targets.reduce((sum, t) => sum + t.cy, 0) / targets.length;

             // Logic: Elbow Connector
             // 1. Radial vector from center to centroid
             let dx = avgX - centerX;
             let dy = avgY - centerY;
             const len = Math.sqrt(dx*dx + dy*dy);
             if (len !== 0) { dx /= len; dy /= len; } 
             else { dx = 0; dy = -1; }

             // 2. Elbow Point: Go out radially to a fixed "inner radius" safely outside petals
             const elbowRadius = 190 + (pointer.distanceOffset || 0); 
             
             // Calculate angle from center to centroid
             let angle = Math.atan2(dy, dx);
             if (pointer.angleOffset) {
                 angle += pointer.angleOffset * (Math.PI / 180);
             }

             const elbowX = centerX + Math.cos(angle) * elbowRadius;
             const elbowY = centerY + Math.sin(angle) * elbowRadius;

             // 3. Horizontal extension
             // Determine direction based on existing X
             const isRight = elbowX > centerX;
             const horizontalLen = 40; 
             const labelX = isRight ? elbowX + horizontalLen : elbowX - horizontalLen;
             const labelY = elbowY;

             const anchor = isRight ? "start" : "end";
             const textOffsetX = isRight ? 5 : -5;

             const isFaint = activeTopic && !pointer.topicIds.includes(activeTopic);

             return (
               <g key={idx} className={`transition-opacity duration-300 ${isFaint ? 'opacity-20' : 'opacity-100'}`}>
                 <polyline points={`${avgX},${avgY} ${elbowX},${elbowY} ${labelX},${labelY}`} 
                    className={`stroke-1 fill-none ${theme === 'colorful' ? 'stroke-white' : 'stroke-muted-foreground'}`} />
                 {/* Dot at centroid */}
                 <circle cx={avgX} cy={avgY} r="2" className={theme === 'colorful' ? 'fill-white' : 'fill-foreground'} />
                 
                 {/* Render Multiple Items */}
                 {pointer.items.map((item, itemIdx) => (
                    <text 
                        key={itemIdx}
                        x={labelX + textOffsetX} 
                        y={labelY + (itemIdx * 20) - ((pointer.items.length - 1) * 10)} // Center the block vertically around the line? Or start at line?
                        // Let's center the block of text relative to the line end (labelY)
                        // If 1 item: y = labelY
                        // If 2 items: y = labelY - 10, labelY + 10
                        textAnchor={anchor} 
                        dominantBaseline="middle"
                        className={`text-[16px] cursor-pointer transition-colors duration-200 hover:font-bold ${theme === 'colorful' ? 'fill-white hover:fill-yellow-300' : 'fill-muted-foreground hover:fill-foreground'}`}
                        onClick={() => scrollById(item.targetId)}
                    >
                        {item.label}
                    </text>
                 ))}
               </g>
             );
         })}

         {/* Draw Category Text Layer (Always on top) */}
         {topicPositions.map((topic) => {
            const isFaint = activeTopic && activeTopic !== topic.id;
            return (
              <text 
                key={`text-${topic.id}`} 
                x={topic.cx} y={topic.cy} 
                className={`font-bold text-[16px] pointer-events-none uppercase tracking-widest ${theme === 'colorful' ? 'fill-white' : 'fill-foreground'}`}
                textAnchor="middle"
                dominantBaseline="middle"
                style={{ opacity: isFaint ? 0.2 : 1, transition: 'opacity 0.3s' }}
              >
                {topic.label}
              </text>
            );
         })}
         
       </svg>
    </div>
  );
};
