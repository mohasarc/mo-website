import type { Root, Element, Text } from "hast";
import type { Plugin } from "unified";

/**
 * Rehype plugin that extracts mermaid code blocks BEFORE Shiki processes them.
 * Replaces <pre><code class="language-mermaid">...</code></pre> with
 * <div data-mermaid="true">chart text</div> so Shiki skips them.
 */
const rehypeMermaid: Plugin<[], Root> = () => {
  return (tree: Root) => {
    visit(tree);
  };
};

function visit(node: Root | Element) {
  if (!("children" in node)) return;

  for (let i = 0; i < node.children.length; i++) {
    const child = node.children[i];
    if (child.type !== "element") continue;

    if (
      child.tagName === "pre" &&
      child.children.length === 1 &&
      child.children[0].type === "element" &&
      child.children[0].tagName === "code"
    ) {
      const code = child.children[0] as Element;
      const classes = code.properties?.className;
      if (
        Array.isArray(classes) &&
        classes.some((c) => String(c) === "language-mermaid")
      ) {
        const text = extractText(code);
        node.children[i] = {
          type: "element",
          tagName: "div",
          properties: { "data-mermaid": "true" },
          children: [{ type: "text", value: text }],
        };
        continue;
      }
    }

    visit(child);
  }
}

function extractText(node: Element): string {
  return node.children
    .map((child) => {
      if (child.type === "text") return (child as Text).value;
      if (child.type === "element") return extractText(child as Element);
      return "";
    })
    .join("");
}

export default rehypeMermaid;
