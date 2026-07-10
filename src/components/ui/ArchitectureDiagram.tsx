"use client";
import { useEffect, useRef } from "react";
import { useInView } from "motion/react";

interface ArchitectureDiagramProps {
  stages: readonly string[];
  color?: "electric" | "violet";
}

export function ArchitectureDiagram({ stages, color = "electric" }: ArchitectureDiagramProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const activeRef = useRef(0);
  const rafRef = useRef<ReturnType<typeof setTimeout>>(null!);

  useEffect(() => {
    if (!isInView) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      // Show all at once
      const divs = ref.current?.querySelectorAll<HTMLElement>(".arch-node");
      divs?.forEach((d) => {
        d.style.opacity = "1";
        d.style.boxShadow = d.dataset.glow ?? "";
      });
      return;
    }

    const divs = ref.current?.querySelectorAll<HTMLElement>(".arch-node");
    if (!divs) return;

    const highlightNext = () => {
      divs.forEach((d, i) => {
        const isActive = i === activeRef.current;
        d.style.opacity = isActive ? "1" : "0.35";
        d.style.borderColor = isActive ? d.dataset.active! : d.dataset.inactive!;
        d.style.color = isActive ? d.dataset.textActive! : "";
        d.style.boxShadow = isActive ? d.dataset.glow! : "none";
      });
      activeRef.current = (activeRef.current + 1) % divs.length;
      rafRef.current = setTimeout(highlightNext, 900);
    };
    highlightNext();
    return () => clearTimeout(rafRef.current);
  }, [isInView]);

  const elecGlow = "0 0 14px oklch(75% 0.18 230 / 40%)";
  const violGlow = "0 0 14px oklch(65% 0.22 300 / 40%)";
  const glow = color === "electric" ? elecGlow : violGlow;
  const activeColor = color === "electric" ? "oklch(75% 0.18 230)" : "oklch(65% 0.22 300)";
  const inactiveColor = "oklch(30% 0.03 280 / 40%)";
  const textActive = color === "electric" ? "oklch(75% 0.18 230)" : "oklch(65% 0.22 300)";

  return (
    <div ref={ref} className="mt-5">
      <div className="text-xs font-mono text-muted mb-3 tracking-widest uppercase">Pipeline</div>
      <div className="flex items-center gap-1 flex-wrap">
        {stages.map((stage, i) => (
          <div key={stage} className="flex items-center gap-1">
            <span
              className="arch-node inline-flex items-center px-2.5 py-1 rounded-full text-xs font-mono border text-muted transition-all duration-300"
              style={{
                opacity: 0.35,
                borderColor: inactiveColor,
              }}
              data-active={activeColor}
              data-inactive={inactiveColor}
              data-glow={glow}
              data-text-active={textActive}
            >
              {stage}
            </span>
            {i < stages.length - 1 && (
              <span className="text-muted/30 text-xs font-mono mx-0.5">→</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
