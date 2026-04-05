"use client";

import {
  useEffect,
  useRef,
  useState,
  useCallback,
  type PointerEvent as ReactPointerEvent,
  type WheelEvent as ReactWheelEvent,
} from "react";
import { useTheme } from "next-themes";
import { Maximize2, Minimize2, RotateCcw } from "lucide-react";

interface MermaidProps {
  chart: string;
}

export default function Mermaid({ chart }: MermaidProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [svgContent, setSvgContent] = useState("");
  const { resolvedTheme } = useTheme();

  // Fullscreen state
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Pan/zoom state
  const [scale, setScale] = useState(1);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const panStart = useRef({ x: 0, y: 0 });
  const translateStart = useRef({ x: 0, y: 0 });

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

  const resetView = useCallback(() => {
    setScale(1);
    setTranslate({ x: 0, y: 0 });
  }, []);

  const toggleFullscreen = useCallback(() => {
    setIsFullscreen((prev) => !prev);
    resetView();
  }, [resetView]);

  // Close on Escape
  useEffect(() => {
    if (!isFullscreen) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setIsFullscreen(false);
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isFullscreen]);

  // Lock body scroll when fullscreen
  useEffect(() => {
    if (isFullscreen) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [isFullscreen]);

  const handleWheel = useCallback((e: ReactWheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    setScale((prev) => Math.min(Math.max(prev * delta, 0.25), 5));
  }, []);

  const handlePointerDown = useCallback(
    (e: ReactPointerEvent) => {
      setIsPanning(true);
      panStart.current = { x: e.clientX, y: e.clientY };
      translateStart.current = { ...translate };
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
    },
    [translate]
  );

  const handlePointerMove = useCallback(
    (e: ReactPointerEvent) => {
      if (!isPanning) return;
      const dx = e.clientX - panStart.current.x;
      const dy = e.clientY - panStart.current.y;
      setTranslate({
        x: translateStart.current.x + dx,
        y: translateStart.current.y + dy,
      });
    },
    [isPanning]
  );

  const handlePointerUp = useCallback(() => {
    setIsPanning(false);
  }, []);

  const diagramContent = (
    <div
      className={isFullscreen ? "w-full h-full flex items-center justify-center" : ""}
      onWheel={handleWheel}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      style={{ cursor: isPanning ? "grabbing" : "grab", touchAction: "none" }}
    >
      <div
        style={{
          transform: `translate(${translate.x}px, ${translate.y}px) scale(${scale})`,
          transformOrigin: "center center",
          transition: isPanning ? "none" : "transform 0.1s ease-out",
        }}
        dangerouslySetInnerHTML={{ __html: svgContent }}
      />
    </div>
  );

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
            onClick={toggleFullscreen}
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
              onClick={toggleFullscreen}
              className="p-2 rounded-md bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Exit fullscreen"
            >
              <Minimize2 className="h-4 w-4" />
            </button>
          </div>
          <div className="flex-1 overflow-hidden">
            {diagramContent}
          </div>
          <div className="p-3 text-center text-xs text-muted-foreground">
            Scroll to zoom &middot; Drag to pan &middot; Esc to close
          </div>
        </div>
      )}
    </>
  );
}
