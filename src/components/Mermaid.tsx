"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";

interface MermaidProps {
  chart: string;
}

export default function Mermaid({ chart }: MermaidProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    let cancelled = false;

    async function render() {
      const mermaid = (await import("mermaid")).default;
      if (cancelled || !containerRef.current) return;

      const isDark = resolvedTheme === "dark" || resolvedTheme === "colorful";
      mermaid.initialize({
        startOnLoad: false,
        theme: isDark ? "dark" : "default",
        fontFamily: "var(--font-geist-sans)",
      });

      const id = `mermaid-${Date.now()}`;
      try {
        const { svg } = await mermaid.render(id, chart);
        if (!cancelled && containerRef.current) {
          containerRef.current.innerHTML = svg;
          setIsLoading(false);
        }
      } catch {
        if (!cancelled && containerRef.current) {
          containerRef.current.textContent = "Failed to render diagram";
          setIsLoading(false);
        }
      }
    }

    setIsLoading(true);
    render();

    return () => {
      cancelled = true;
    };
  }, [chart, resolvedTheme]);

  return (
    <div className="my-6">
      {isLoading && (
        <div className="bg-muted rounded-lg animate-pulse h-48" />
      )}
      <div ref={containerRef} className={isLoading ? "hidden" : ""} />
    </div>
  );
}
