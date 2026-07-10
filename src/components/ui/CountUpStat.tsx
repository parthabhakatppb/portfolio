"use client";
import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";

interface CountUpStatProps {
  value: number;
  suffix?: string;
  label: string;
  decimals?: number;
  duration?: number;
  className?: string;
}

export function CountUpStat({
  value,
  suffix = "",
  label,
  decimals = 0,
  duration = 2000,
  className = "",
}: CountUpStatProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [display, setDisplay] = useState("0");
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
  }, []);

  useEffect(() => {
    if (!isInView) return;
    if (reduced) {
      setDisplay(value.toFixed(decimals));
      return;
    }

    const start = performance.now();
    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay((value * eased).toFixed(decimals));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [isInView, value, decimals, duration, reduced]);

  return (
    <div ref={ref} className={`flex flex-col items-center gap-1 ${className}`}>
      <div className="font-display font-bold text-3xl md:text-4xl gradient-text tabular-nums">
        {display}{suffix}
      </div>
      <div className="text-xs font-mono text-muted tracking-wide text-center">{label}</div>
    </div>
  );
}
