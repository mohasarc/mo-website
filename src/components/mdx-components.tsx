import type { MDXComponents } from "mdx/types";
import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";
import Mermaid from "./Mermaid";

export const mdxComponents: MDXComponents = {
  h1: ({ className, ...props }: ComponentPropsWithoutRef<"h1">) => (
    <h1
      className={cn(
        "font-serif text-3xl font-bold mt-8 mb-4 text-foreground",
        className
      )}
      {...props}
    />
  ),
  h2: ({ className, ...props }: ComponentPropsWithoutRef<"h2">) => (
    <h2
      className={cn(
        "font-sans text-2xl font-bold mt-8 mb-3 text-foreground",
        className
      )}
      {...props}
    />
  ),
  h3: ({ className, ...props }: ComponentPropsWithoutRef<"h3">) => (
    <h3
      className={cn(
        "font-sans text-xl font-semibold mt-6 mb-2 text-foreground",
        className
      )}
      {...props}
    />
  ),
  h4: ({ className, ...props }: ComponentPropsWithoutRef<"h4">) => (
    <h4
      className={cn(
        "font-sans text-lg font-semibold mt-4 mb-2 text-foreground",
        className
      )}
      {...props}
    />
  ),
  p: ({ className, ...props }: ComponentPropsWithoutRef<"p">) => (
    <p
      className={cn(
        "text-base leading-relaxed text-foreground my-4",
        className
      )}
      {...props}
    />
  ),
  a: (props: ComponentPropsWithoutRef<"a">) => (
    <a
      className="text-primary underline underline-offset-4 hover:text-primary/80"
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    />
  ),
  blockquote: ({ className, ...props }: ComponentPropsWithoutRef<"blockquote">) => (
    <blockquote
      className={cn(
        "border-l-4 border-primary pl-4 italic text-muted-foreground my-4",
        className
      )}
      {...props}
    />
  ),
  code: ({ className, ...props }: ComponentPropsWithoutRef<"code">) => (
    <code
      className={cn(
        "font-mono text-sm bg-muted px-1.5 py-0.5 rounded-md",
        className
      )}
      {...props}
    />
  ),
  pre: ({
    children,
    className,
    ...props
  }: ComponentPropsWithoutRef<"pre">) => (
    <pre
      className={cn(
        "rounded-lg border border-border overflow-x-auto p-4 my-4 [&>code]:bg-transparent [&>code]:p-0 [&>code]:rounded-none",
        className
      )}
      {...props}
    >
      {children}
    </pre>
  ),
  // Mermaid blocks are converted to <div data-mermaid> by rehype-mermaid before Shiki
  div: ({
    children,
    ...props
  }: ComponentPropsWithoutRef<"div"> & { "data-mermaid"?: string }) => {
    if (props["data-mermaid"] === "true") {
      return <Mermaid chart={typeof children === "string" ? children : ""} />;
    }
    return <div {...props}>{children}</div>;
  },
  table: (props: ComponentPropsWithoutRef<"table">) => (
    <div className="overflow-x-auto my-4">
      <table className="w-full border-collapse" {...props} />
    </div>
  ),
  th: ({ className, ...props }: ComponentPropsWithoutRef<"th">) => (
    <th
      className={cn(
        "bg-muted font-semibold text-left px-4 py-2 border border-border",
        className
      )}
      {...props}
    />
  ),
  td: ({ className, ...props }: ComponentPropsWithoutRef<"td">) => (
    <td
      className={cn("px-4 py-2 border border-border", className)}
      {...props}
    />
  ),
  img: ({ className, ...props }: ComponentPropsWithoutRef<"img">) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className={cn(
        "rounded-lg border border-border max-w-full my-4",
        className
      )}
      alt={props.alt ?? ""}
      {...props}
    />
  ),
  ul: ({ className, ...props }: ComponentPropsWithoutRef<"ul">) => (
    <ul
      className={cn("list-disc pl-6 my-4 space-y-1", className)}
      {...props}
    />
  ),
  ol: ({ className, ...props }: ComponentPropsWithoutRef<"ol">) => (
    <ol
      className={cn("list-decimal pl-6 my-4 space-y-1", className)}
      {...props}
    />
  ),
  hr: ({ className, ...props }: ComponentPropsWithoutRef<"hr">) => (
    <hr className={cn("border-border my-8", className)} {...props} />
  ),
};
