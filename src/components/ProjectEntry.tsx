import React from 'react';
import { Button } from "@/components/ui/button";

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
    <div id={id} className="flex flex-col sm:flex-row gap-4 mb-4 scroll-mt-20">
      {/* Thumbnail */}
      <div className="w-full sm:w-[200px] sm:shrink-0">
        <div className="aspect-[6/4] bg-muted rounded border border-border flex items-center justify-center text-muted-foreground">
             {/* Placeholder for project image */}
             <span className="text-2xl">{image === "sketchbook" ? "✏️" : image === "vr" ? "🕶️" : "🖼️"}</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col gap-1">
        <h3 className="text-sm font-bold font-sans text-foreground leading-tight">
          {title}
        </h3>
        <div className="text-xs text-muted-foreground leading-relaxed">
          {authors} {date && <span className="text-muted-foreground">| {date}</span>}
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed mb-1">
          {description}
        </p>
        
        {/* Buttons */}
        {links && links.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {links.map((link, i) => (
              <Button key={i} variant="outline" size="sm" asChild 
                className="h-auto py-[2px] px-2 text-xs font-medium uppercase tracking-wide border-muted-foreground/50 text-muted-foreground hover:border-foreground hover:text-foreground hover:bg-transparent rounded-none transition-colors"
              >
                <a href={link.url} target="_blank" rel="noopener noreferrer">
                  {link.label}
                </a>
              </Button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
