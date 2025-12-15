"use client";
import React, { useState } from 'react';
import { portfolioData } from "../data/portfolio";

const scrollById = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
};

export const ResearchDiagram = () => {
  const { topics, pointers } = portfolioData.main.diagram;
  const [activeTopic, setActiveTopic] = useState<string | null>(null);

  // Geometry Constants
  // Scaled up again
  const width = 1000; 
  const height = 600; 
  const centerX = width / 2;
  const centerY = height / 2;
  const petalRadius = 110; 
  const orbitRadius = 100; // Distance of petal center from diagram center

  // Pre-calculate positions for topics
  const count = topics.length;
  const angleStep = (2 * Math.PI) / count;
  // Rotate so first petal is at Top ( -PI/2 )
  const startAngle = -Math.PI / 2;

  const topicPositions = topics.map((topic, index) => {
    const angle = startAngle + index * angleStep;
    const cx = centerX + orbitRadius * Math.cos(angle);
    const cy = centerY + orbitRadius * Math.sin(angle);
    return { ...topic, cx, cy, angle };
  });

  // activeColor unused, using style logic

  return (
    <div className="w-full flex justify-center mb-16 px-4 relative">
       <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="w-full h-auto max-w-[1000px] font-sans">
         <defs>
            <style>{`
              .petal { stroke: #fff; stroke-width: 2; transition: fill-opacity 0.3s, fill 0.3s; cursor: pointer; mix-blend-mode: multiply; }
              .label-line { stroke: #999; stroke-width: 1; fill: none; }
              .label-text { font-size: 16px; fill: #555; cursor: pointer; transition: fill 0.2s; }
              .label-text:hover { fill: #000; font-weight: bold; }
              .category-text { font-weight: bold; font-size: 16px; pointer-events: none; fill: #222; text-transform: uppercase; letter-spacing: 0.05em; text-anchor: middle; dominant-baseline: middle; }
            `}</style>
         </defs>

         {/* Draw Petals (Circles) Layer */}
         {topicPositions.map((topic) => {
           const isFaint = activeTopic && activeTopic !== topic.id;
           return (
             <circle 
                key={topic.id}
                cx={topic.cx} cy={topic.cy} r={petalRadius} 
                className="petal" 
                fill={topic.color}
                style={{ fillOpacity: isFaint ? 0.2 : 0.9 }}
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
             const elbowRadius = 240 + (pointer.distanceOffset || 0); 
             
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

             return (
               <g key={idx}>
                 <polyline points={`${avgX},${avgY} ${elbowX},${elbowY} ${labelX},${labelY}`} className="label-line" />
                 {/* Dot at centroid */}
                 <circle cx={avgX} cy={avgY} r="2" fill="#444" />
                 
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
                        className="label-text"
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
                className="category-text"
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
