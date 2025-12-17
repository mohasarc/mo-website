import React from 'react';
import { Button } from "@/components/ui/button";
import { parseMarkdown } from "@/lib/markdown";

interface PublicationEntryProps {
  id?: string;
  title: string;
  authors: React.ReactNode; 
  venue: string;
  abstract: string;
  links: { label: string; url: string }[];
  image?: string;
}

export const PublicationEntry = ({ id, title, authors, venue, abstract, links, image }: PublicationEntryProps) => {
  return (
    <div id={id} className="flex flex-col sm:flex-row gap-4 mb-4 scroll-mt-20">
      {/* Thumbnail */}
      <div className="w-full sm:w-[200px] sm:shrink-0">
        <div className="aspect-[6/4] bg-muted rounded border border-border flex items-center justify-center text-muted-foreground overflow-hidden">
             {image ? (
               <img src={image} alt={title} className="w-full h-full object-cover transition-transform hover:scale-105 duration-500" />
             ) : (
               <span className="text-2xl">🖼️</span>
             )}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col gap-1">
        <h3 className="text-sm font-bold text-foreground leading-tight">
          {title}
        </h3>
        <div className="text-xs text-muted-foreground leading-relaxed">
          {authors}
        </div>
        <div className="text-xs italic text-muted-foreground">
          {venue}
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed mb-1">
          {parseMarkdown(abstract)}
        </p>
        
        {/* Buttons */}
        <div className="flex flex-wrap gap-2 mt-2">
          {links.map((link, idx) => (
            <Button 
              key={idx} 
              variant="outline" 
              size="sm"
              className="h-auto py-[2px] px-2 text-xs font-medium uppercase tracking-wide border-muted-foreground/50 text-muted-foreground hover:border-foreground hover:text-foreground hover:bg-transparent rounded-none transition-colors"
              asChild
            >
              <a href={link.url} target="_blank" rel="noopener noreferrer">{link.label}</a>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};
