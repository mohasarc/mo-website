import React from 'react';
import { PublicationEntry } from './PublicationEntry';
import { portfolioData } from "../data/portfolio";

export const MainContent = () => {
  const { bio, interests, publications } = portfolioData.main;

  return (
    <main className="flex-1 p-6 md:p-12 md:max-w-4xl mx-auto">
      
      {/* Biography & Interests */}
      <section className="mb-12">
        <div className="text-base text-[#222222] leading-relaxed mb-6">
          {bio.map((paragraph, index) => (
            <p key={index} className="mb-4">
              {paragraph}
            </p>
          ))}
        </div>

        <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">RESEARCH INTERESTS</h2>
        <p className="text-base text-[#222222] leading-relaxed mb-8">
          {interests}
        </p>

        {/* Research Visualization Diagram */}
        <div className="w-full flex justify-center mb-16 px-4">
           {/* Simple static SVG visualization */}
           <svg width="600" height="350" viewBox="0 0 600 350" className="w-full h-auto max-w-[600px]">
             {/* Lines connecting nodes - simplified for clean look */}
             <line x1="300" y1="80" x2="160" y2="200" stroke="#E0E0E0" strokeWidth="2" />
             <line x1="300" y1="80" x2="440" y2="200" stroke="#E0E0E0" strokeWidth="2" />
             <line x1="160" y1="200" x2="440" y2="200" stroke="#E0E0E0" strokeWidth="2" />
             <line x1="300" y1="80" x2="300" y2="280" stroke="#E0E0E0" strokeWidth="2" />

             {/* Main Nodes */}
             {/* Top: Generative AI */}
             <circle cx="300" cy="80" r="60" fill="white" stroke="#333" strokeWidth="1.5" />
             <text x="300" y="85" textAnchor="middle" className="text-sm font-bold fill-[#222]" fontSize="14" fontFamily="sans-serif">Generative AI</text>

             {/* Bottom Left: Computer Vision */}
             <circle cx="160" cy="200" r="60" fill="white" stroke="#333" strokeWidth="1.5" />
             <text x="160" y="205" textAnchor="middle" className="text-sm font-bold fill-[#222]" fontSize="14" fontFamily="sans-serif">Computer Vision</text>

             {/* Bottom Right: HCI */}
             <circle cx="440" cy="200" r="60" fill="white" stroke="#333" strokeWidth="1.5" />
             <text x="440" y="205" textAnchor="middle" className="text-sm font-bold fill-[#222]" fontSize="14" fontFamily="sans-serif">HCI</text>

             {/* Bottom Center: Robotics (Smaller, optional or connected) */}
             <circle cx="300" cy="280" r="40" fill="white" stroke="#333" strokeWidth="1.5" />
             <text x="300" y="285" textAnchor="middle" className="text-xs font-bold fill-[#222]" fontSize="12" fontFamily="sans-serif">Robotics</text>

             {/* Floating Labels for intersections */}
             <text x="210" y="130" textAnchor="middle" className="text-[10px] fill-[#666] bg-white" fontSize="11" fontFamily="sans-serif">Video Synthesis</text>
             <text x="390" y="130" textAnchor="middle" className="text-[10px] fill-[#666]" fontSize="11" fontFamily="sans-serif">Interactive Agents</text>
             <text x="300" y="190" textAnchor="middle" className="text-[10px] fill-[#666]" fontSize="11" fontFamily="sans-serif">Sketch-based Modeling</text>
           </svg>
        </div>
      </section>

      {/* Publications */}
      <section>
        <h2 className="text-2xl font-bold text-[#222222] mb-8 pb-2 border-b border-gray-100">PUBLICATIONS</h2>
        
        {publications.map((pub, index) => (
          <PublicationEntry 
            key={index}
            title={pub.title}
            authors={pub.authors}
            venue={pub.venue}
            abstract={pub.abstract}
            links={pub.links}
          />
        ))}

      </section>
    </main>
  );
};
