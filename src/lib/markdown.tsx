import React from 'react';

export const parseMarkdown = (text: string) => {
  // Split by markdown syntax for images and links: ![alt](url) or [text](url)
  const parts = text.split(/(!?\[[^\]]*\]\([^\)]+\))/g);

  return parts.map((part, index) => {
    // Check if image: ![alt](url)
    const imgMatch = part.match(/^!\[([^\]]*)\]\(([^\)]+)\)$/);
    if (imgMatch) {
      return (
         <img key={index} src={imgMatch[2]} alt={imgMatch[1]} className="inline-block h-3.5 mx-1 mb-0.5 align-sub opacity-100 transition-opacity" />
      );
    }

    // Check if link: [text](url)
    const linkMatch = part.match(/^\[([^\]]+)\]\(([^\)]+)\)$/);
    if (linkMatch) {
      return (
        <a key={index} href={linkMatch[2]} target="_blank" rel="noopener noreferrer" className="text-primary underline opacity-90 hover:opacity-100 transition-opacity hover:decoration-primary">
          {linkMatch[1]}
        </a>
      );
    }

    // Return text (handling bold **text**)
    const boldParts = part.split(/(\*\*[^\*]+\*\*)/g);
    return boldParts.map((subPart, subIndex) => {
        const boldMatch = subPart.match(/^\*\*([^\*]+)\*\*$/);
        if (boldMatch) {
            return <strong key={`${index}-${subIndex}`} className="font-bold text-foreground">{boldMatch[1]}</strong>;
        }
        return <span key={`${index}-${subIndex}`}>{subPart}</span>;
    });
  });
};
