import type { Root, Element, Text } from "hast";
import type { Plugin } from "unified";

/**
 * Rehype plugin that extracts mermaid code blocks BEFORE Shiki processes them.
 * Replaces <pre><code class="language-mermaid">...</code></pre> with
 * <div data-mermaid="true">chart text</div> so Shiki skips them.
 *
 * Walks all node types (including mdxJsxFlowElement for tags like <details>)
 * so mermaid blocks inside arbitrary nesting are still caught.
 */
const rehypeMermaid: Plugin<[], Root> = () => {
  return (tree: Root) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    visit(tree as any);
  };
};

function visit(node: { children: Array<Record<string, unknown>> }) {
  for (let i = 0; i < node.children.length; i++) {
    const child = node.children[i];

    // Check if this child is a <pre><code class="language-mermaid"> block
    if (child.type === "element") {
      const el = child as unknown as Element;
      if (
        el.tagName === "pre" &&
        el.children.length === 1 &&
        el.children[0].type === "element"
      ) {
        const code = el.children[0] as Element;
        if (
          code.tagName === "code" &&
          Array.isArray(code.properties?.className) &&
          code.properties.className.some(
            (c: string | number) => String(c) === "language-mermaid"
          )
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
    }

    // Recurse into any node that has children (element, mdxJsxFlowElement, etc.)
    const maybeParent = child as { children?: unknown };
    if (Array.isArray(maybeParent.children)) {
      visit(child as { children: Array<Record<string, unknown>> });
    }
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
