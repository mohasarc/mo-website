import type { MDXComponents } from "mdx/types";
import type { ComponentPropsWithoutRef, ReactElement } from "react";
import Mermaid from "./Mermaid";

function isMermaidCodeBlock(
  children: React.ReactNode
): children is ReactElement<{ children: string; className: string }> {
  if (
    children &&
    typeof children === "object" &&
    "props" in children &&
    typeof children.props === "object" &&
    children.props !== null &&
    "className" in children.props
  ) {
    return (
      typeof children.props.className === "string" &&
      children.props.className.includes("language-mermaid")
    );
  }
  return false;
}

export const mdxComponents: MDXComponents = {
  h1: (props: ComponentPropsWithoutRef<"h1">) => (
    <h1
      className="font-serif text-3xl font-bold mt-8 mb-4 text-foreground"
      {...props}
    />
  ),
  h2: (props: ComponentPropsWithoutRef<"h2">) => (
    <h2
      className="font-sans text-2xl font-bold mt-8 mb-3 text-foreground"
      {...props}
    />
  ),
  h3: (props: ComponentPropsWithoutRef<"h3">) => (
    <h3
      className="font-sans text-xl font-semibold mt-6 mb-2 text-foreground"
      {...props}
    />
  ),
  h4: (props: ComponentPropsWithoutRef<"h4">) => (
    <h4
      className="font-sans text-lg font-semibold mt-4 mb-2 text-foreground"
      {...props}
    />
  ),
  p: (props: ComponentPropsWithoutRef<"p">) => (
    <p className="text-base leading-relaxed text-foreground my-4" {...props} />
  ),
  a: (props: ComponentPropsWithoutRef<"a">) => (
    <a
      className="text-primary underline underline-offset-4 hover:text-primary/80"
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    />
  ),
  blockquote: (props: ComponentPropsWithoutRef<"blockquote">) => (
    <blockquote
      className="border-l-4 border-primary pl-4 italic text-muted-foreground my-4"
      {...props}
    />
  ),
  code: (props: ComponentPropsWithoutRef<"code">) => (
    <code
      className="font-mono text-sm bg-muted px-1.5 py-0.5 rounded-md"
      {...props}
    />
  ),
  pre: ({ children, ...props }: ComponentPropsWithoutRef<"pre">) => {
    if (isMermaidCodeBlock(children)) {
      return <Mermaid chart={children.props.children} />;
    }
    return (
      <pre
        className="rounded-lg border border-border overflow-x-auto p-4 my-4 [&>code]:bg-transparent [&>code]:p-0 [&>code]:rounded-none"
        {...props}
      >
        {children}
      </pre>
    );
  },
  table: (props: ComponentPropsWithoutRef<"table">) => (
    <div className="overflow-x-auto my-4">
      <table className="w-full border-collapse" {...props} />
    </div>
  ),
  th: (props: ComponentPropsWithoutRef<"th">) => (
    <th
      className="bg-muted font-semibold text-left px-4 py-2 border border-border"
      {...props}
    />
  ),
  td: (props: ComponentPropsWithoutRef<"td">) => (
    <td className="px-4 py-2 border border-border" {...props} />
  ),
  img: (props: ComponentPropsWithoutRef<"img">) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className="rounded-lg border border-border max-w-full my-4"
      alt={props.alt ?? ""}
      {...props}
    />
  ),
  ul: (props: ComponentPropsWithoutRef<"ul">) => (
    <ul className="list-disc pl-6 my-4 space-y-1" {...props} />
  ),
  ol: (props: ComponentPropsWithoutRef<"ol">) => (
    <ol className="list-decimal pl-6 my-4 space-y-1" {...props} />
  ),
  hr: (props: ComponentPropsWithoutRef<"hr">) => (
    <hr className="border-border my-8" {...props} />
  ),
};
