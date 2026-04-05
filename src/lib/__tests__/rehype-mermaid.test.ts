import { describe, it, expect } from "vitest";
import rehypeMermaid from "../rehype-mermaid";
import type { Root, Element, Text } from "hast";

function makeCodeBlock(lang: string, text: string): Element {
  return {
    type: "element",
    tagName: "pre",
    properties: {},
    children: [
      {
        type: "element",
        tagName: "code",
        properties: { className: [`language-${lang}`] },
        children: [{ type: "text", value: text } as Text],
      },
    ],
  };
}

describe("rehypeMermaid", () => {
  const transform = rehypeMermaid();

  it("replaces mermaid code blocks with div[data-mermaid]", () => {
    const tree: Root = {
      type: "root",
      children: [makeCodeBlock("mermaid", "graph LR\n    A --> B")],
    };
    transform(tree, {} as never, () => {});
    const div = tree.children[0] as Element;
    expect(div.tagName).toBe("div");
    expect(div.properties?.["data-mermaid"]).toBe("true");
    expect((div.children[0] as Text).value).toBe("graph LR\n    A --> B");
  });

  it("does not modify non-mermaid code blocks", () => {
    const tree: Root = {
      type: "root",
      children: [makeCodeBlock("typescript", "const x = 1;")],
    };
    transform(tree, {} as never, () => {});
    const pre = tree.children[0] as Element;
    expect(pre.tagName).toBe("pre");
  });

  it("replaces mermaid blocks nested inside other elements (e.g. details)", () => {
    const tree: Root = {
      type: "root",
      children: [
        {
          // Simulates mdxJsxFlowElement or any wrapper with children
          type: "mdxJsxFlowElement" as never,
          children: [makeCodeBlock("mermaid", "graph TD\n    X --> Y")],
        } as never,
      ],
    };
    transform(tree, {} as never, () => {});
    const wrapper = tree.children[0] as unknown as {
      children: Element[];
    };
    const div = wrapper.children[0];
    expect(div.tagName).toBe("div");
    expect(div.properties?.["data-mermaid"]).toBe("true");
  });
});
