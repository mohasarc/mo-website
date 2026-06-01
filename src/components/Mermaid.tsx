"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useTheme } from "next-themes";
import { Maximize2, Minimize2, RotateCcw } from "lucide-react";

interface MermaidProps {
  chart: string;
}

export default function Mermaid({ chart }: MermaidProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const fullscreenAreaRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [svgContent, setSvgContent] = useState("");
  const { resolvedTheme } = useTheme();

  const [isFullscreen, setIsFullscreen] = useState(false);
  const [scale, setScale] = useState(1);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const isPanning = useRef(false);
  const panStart = useRef({ x: 0, y: 0 });
  const translateStart = useRef({ x: 0, y: 0 });

  // Render mermaid SVG
  useEffect(() => {
    let cancelled = false;

    async function render() {
      const mermaid = (await import("mermaid")).default;
      if (cancelled) return;

      const isDark = resolvedTheme === "dark" || resolvedTheme === "colorful";
      mermaid.initialize({
        startOnLoad: false,
        theme: isDark ? "dark" : "default",
        fontFamily: "var(--font-geist-sans)",
      });

      const id = `mermaid-${Date.now()}`;
      try {
        const { svg } = await mermaid.render(id, chart);
        if (!cancelled) {
          setSvgContent(svg);
          setIsLoading(false);
        }
      } catch {
        if (!cancelled) {
          setSvgContent("");
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

  // Calculate a scale that fits the SVG in the viewport with padding
  const calcFitScale = useCallback(() => {
    if (!svgContent) return 1;
    const parser = new DOMParser();
    const doc = parser.parseFromString(svgContent, "image/svg+xml");
    const svg = doc.querySelector("svg");
    if (!svg) return 1;

    const vw = window.innerWidth * 0.85;
    const vh = window.innerHeight * 0.75;
    const sw =
      parseFloat(svg.getAttribute("width") ?? "0") ||
      svg.viewBox?.baseVal?.width ||
      0;
    const sh =
      parseFloat(svg.getAttribute("height") ?? "0") ||
      svg.viewBox?.baseVal?.height ||
      0;
    if (!sw || !sh) return 1;

    const fit = Math.min(vw / sw, vh / sh);
    // Clamp between 0.5 and 3 so it's never too tiny or absurdly big
    return Math.min(Math.max(fit, 0.5), 3);
  }, [svgContent]);

  const resetView = useCallback(() => {
    setScale(isFullscreen ? calcFitScale() : 1);
    setTranslate({ x: 0, y: 0 });
  }, [isFullscreen, calcFitScale]);

  const openFullscreen = useCallback(() => {
    setIsFullscreen(true);
    setTranslate({ x: 0, y: 0 });
    // Defer scale calc to next tick so we read correct viewport
    requestAnimationFrame(() => {
      setScale(calcFitScale());
    });
  }, [calcFitScale]);

  const closeFullscreen = useCallback(() => {
    setIsFullscreen(false);
    setScale(1);
    setTranslate({ x: 0, y: 0 });
  }, []);

  // Escape key
  useEffect(() => {
    if (!isFullscreen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeFullscreen();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isFullscreen, closeFullscreen]);

  // Lock body scroll when fullscreen
  useEffect(() => {
    if (!isFullscreen) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isFullscreen]);

  // Non-passive wheel listener to prevent page zoom on pinch and handle scroll-to-zoom
  useEffect(() => {
    const el = fullscreenAreaRef.current;
    if (!isFullscreen || !el) return;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      // ctrlKey is true for pinch gestures on trackpads
      const isPinch = e.ctrlKey;
      const factor = isPinch
        ? e.deltaY > 0
          ? 0.95
          : 1.05
        : e.deltaY > 0
          ? 0.9
          : 1.1;
      setScale((prev) => Math.min(Math.max(prev * factor, 0.1), 15));
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [isFullscreen]);

  // Pointer handlers for panning
  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      isPanning.current = true;
      panStart.current = { x: e.clientX, y: e.clientY };
      translateStart.current = { ...translate };
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    },
    [translate]
  );

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isPanning.current) return;
    setTranslate({
      x: translateStart.current.x + (e.clientX - panStart.current.x),
      y: translateStart.current.y + (e.clientY - panStart.current.y),
    });
  }, []);

  const handlePointerUp = useCallback(() => {
    isPanning.current = false;
  }, []);

  if (isLoading) {
    return (
      <div className="my-6">
        <div className="bg-muted rounded-lg animate-pulse h-48" />
      </div>
    );
  }

  if (!svgContent) {
    return (
      <div className="my-6 text-sm text-muted-foreground">
        Failed to render diagram
      </div>
    );
  }

  return (
    <>
      {/* Inline view */}
      <div className="my-6 relative group rounded-lg border border-border overflow-hidden">
        <div className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={openFullscreen}
            className="p-1.5 rounded-md bg-muted/80 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
            aria-label="View fullscreen"
          >
            <Maximize2 className="h-4 w-4" />
          </button>
        </div>
        <div className="p-4 overflow-x-auto" ref={containerRef}>
          <div dangerouslySetInnerHTML={{ __html: svgContent }} />
        </div>
      </div>

      {/* Fullscreen overlay */}
      {isFullscreen && (
        <div className="fixed inset-0 z-[200] bg-background/95 backdrop-blur-sm flex flex-col">
          <div className="flex items-center justify-end gap-2 p-4">
            <button
              onClick={resetView}
              className="p-2 rounded-md bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Reset view"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
            <button
              onClick={closeFullscreen}
              className="p-2 rounded-md bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Exit fullscreen"
            >
              <Minimize2 className="h-4 w-4" />
            </button>
          </div>
          <div
            ref={fullscreenAreaRef}
            className="flex-1 overflow-hidden flex items-center justify-center select-none"
            style={{ touchAction: "none", cursor: isPanning.current ? "grabbing" : "grab" }}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
          >
            <div
              style={{
                transform: `translate(${translate.x}px, ${translate.y}px) scale(${scale})`,
                transformOrigin: "center center",
                transition: isPanning.current
                  ? "none"
                  : "transform 0.1s ease-out",
              }}
              dangerouslySetInnerHTML={{ __html: svgContent }}
            />
          </div>
          <div className="p-3 text-center text-xs text-muted-foreground select-none">
            Scroll to zoom &middot; Drag to pan &middot; Esc to close
          </div>
        </div>
      )}
    </>
  );
}
