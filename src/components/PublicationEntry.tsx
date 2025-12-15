import React from 'react';

interface PublicationEntryProps {
  title: string;
  authors: React.ReactNode; 
  venue: string;
  abstract: string;
  links: { label: string; url: string }[];
}

export const PublicationEntry = ({ title, authors, venue, abstract, links }: PublicationEntryProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-6 mb-8">
      {/* Thumbnail */}
      <div className="w-full sm:w-[200px] sm:shrink-0">
        <div className="aspect-[4/3] bg-gray-200 rounded border border-gray-100 flex items-center justify-center text-gray-400">
             {/* Placeholder for project image */}
             <span className="text-2xl">🖼️</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col gap-2">
        <h3 className="text-lg font-bold text-[#222222] leading-tight">
          {title}
        </h3>
        <div className="text-sm text-[#444444] leading-relaxed">
          {authors}
        </div>
        <div className="text-sm italic text-[#666666]">
          {venue}
        </div>
        <p className="text-sm text-[#444444] leading-relaxed mb-1">
          {abstract}
        </p>
        
        {/* Buttons */}
        <div className="flex flex-wrap gap-2 mt-1">
          {links.map((link, idx) => (
            <a 
              key={idx}
              href={link.url}
              className="px-3 py-1 bg-[#F0F0F0] text-[#333333] text-xs font-semibold rounded hover:bg-[#E0E0E0] transition-colors border border-transparent hover:border-gray-300"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
