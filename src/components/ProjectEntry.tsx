import React from 'react';

interface ProjectEntryProps {
  id?: string;
  title: string;
  authors?: React.ReactNode; 
  date?: string;
  description: string;
  links?: { label: string; url: string }[];
  image?: string; // Placeholder usage
}

export const ProjectEntry = ({ id, title, authors, date, description, links, image }: ProjectEntryProps) => {
  return (
    <div id={id} className="flex flex-col sm:flex-row gap-6 mb-8 scroll-mt-20">
      {/* Thumbnail */}
      <div className="w-full sm:w-[200px] sm:shrink-0">
        <div className="aspect-[4/3] bg-gray-200 rounded border border-gray-100 flex items-center justify-center text-gray-400">
             {/* Placeholder for project image */}
             <span className="text-2xl">{image === "sketchbook" ? "✏️" : image === "vr" ? "🕶️" : "🖼️"}</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col gap-2">
        <h3 className="text-lg font-bold font-sans text-[#222222] leading-tight">
          {title}
        </h3>
        <div className="text-sm text-[#444444] leading-relaxed">
          {authors} {date && <span className="text-gray-400">| {date}</span>}
        </div>
        <p className="text-sm text-[#444444] leading-relaxed mb-1">
          {description}
        </p>
        
        {/* Buttons */}
        {links && links.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {links.map((link, idx) => (
              <a 
                key={idx}
                href={link.url}
                className="px-2 py-[2px] bg-white text-black text-[10px] font-medium uppercase tracking-wide border border-black hover:bg-black hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
