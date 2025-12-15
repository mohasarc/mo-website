import React from 'react';
import { Separator } from "@/components/ui/separator";

interface SectionProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
  withSeparator?: boolean;
}

export const Section = ({ title, children, className, withSeparator = false }: SectionProps) => {
  return (
    <section className={`mb-6 ${className || ''}`}>
      {title && (
        // letter spacing large
        <h2 className="text-sm text-muted-foreground uppercase tracking-widest mb-2">
          {title}
        </h2>
      )}
      {withSeparator && <Separator className="mb-4" />}
      {children}
    </section>
  );
};
