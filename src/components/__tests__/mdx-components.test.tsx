import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { mdxComponents } from "../mdx-components";

// Mock the Mermaid component since it uses dynamic imports and client-side rendering
vi.mock("../Mermaid", () => ({
  default: ({ chart }: { chart: string }) => (
    <div data-testid="mermaid-mock">{chart}</div>
  ),
}));

describe("mdxComponents", () => {
  it("exports mappings for all expected elements", () => {
    const expectedElements = [
      "h1", "h2", "h3", "h4", "p", "a", "blockquote",
      "code", "pre", "table", "th", "td", "img", "ul", "ol", "hr",
    ];
    for (const el of expectedElements) {
      expect(mdxComponents[el]).toBeDefined();
    }
  });

  it("h1 renders with font-serif class", () => {
    const H1 = mdxComponents.h1 as React.FC<React.ComponentPropsWithoutRef<"h1">>;
    render(<H1>Title</H1>);
    const el = screen.getByText("Title");
    expect(el.className).toContain("font-serif");
    expect(el.className).toContain("text-3xl");
  });

  it("h2 renders with font-sans class", () => {
    const H2 = mdxComponents.h2 as React.FC<React.ComponentPropsWithoutRef<"h2">>;
    render(<H2>Subtitle</H2>);
    const el = screen.getByText("Subtitle");
    expect(el.className).toContain("font-sans");
    expect(el.className).toContain("text-2xl");
  });

  it("h3 renders with font-sans class", () => {
    const H3 = mdxComponents.h3 as React.FC<React.ComponentPropsWithoutRef<"h3">>;
    render(<H3>Section</H3>);
    const el = screen.getByText("Section");
    expect(el.className).toContain("font-sans");
  });

  it("inline code renders with bg-muted and font-mono", () => {
    const Code = mdxComponents.code as React.FC<React.ComponentPropsWithoutRef<"code">>;
    render(<Code>snippet</Code>);
    const el = screen.getByText("snippet");
    expect(el.className).toContain("bg-muted");
    expect(el.className).toContain("font-mono");
  });

  it("link renders with target=_blank and rel=noopener noreferrer", () => {
    const A = mdxComponents.a as React.FC<React.ComponentPropsWithoutRef<"a">>;
    render(<A href="https://example.com">Link</A>);
    const el = screen.getByText("Link");
    expect(el).toHaveAttribute("target", "_blank");
    expect(el).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("pre renders Mermaid when data-language is mermaid (Shiki output)", () => {
    const Pre = mdxComponents.pre as React.FC<Record<string, unknown>>;
    render(
      <Pre data-language="mermaid">
        <code>
          <span className="line">
            <span>graph LR</span>
          </span>
          <span className="line">
            <span>{"    A --> B"}</span>
          </span>
        </code>
      </Pre>
    );
    expect(screen.getByTestId("mermaid-mock")).toBeInTheDocument();
    expect(screen.getByTestId("mermaid-mock")).toHaveTextContent("graph LR");
  });

  it("pre renders normal pre for non-mermaid code blocks", () => {
    const Pre = mdxComponents.pre as React.FC<React.ComponentPropsWithoutRef<"pre">>;
    const { container } = render(
      <Pre>
        <code className="language-typescript">{"const x = 1;"}</code>
      </Pre>
    );
    expect(container.querySelector("pre")).toBeInTheDocument();
    expect(screen.queryByTestId("mermaid-mock")).not.toBeInTheDocument();
  });

  it("pre merges custom className with Shiki className", () => {
    const Pre = mdxComponents.pre as React.FC<React.ComponentPropsWithoutRef<"pre">>;
    const { container } = render(
      <Pre className="shiki github-light">
        <code>{"const x = 1;"}</code>
      </Pre>
    );
    const pre = container.querySelector("pre");
    expect(pre?.className).toContain("rounded-lg");
    expect(pre?.className).toContain("shiki");
  });
});
