"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface ExploringTickerProps {
  items: readonly string[];
  intervalMs?: number;
  className?: string;
}

export function ExploringTicker({
  items,
  intervalMs = 3500,
  className = "",
}: ExploringTickerProps) {
  const [index, setIndex] = useState(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const h = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", h);
    return () => mq.removeEventListener("change", h);
  }, []);

  useEffect(() => {
    if (reduced || items.length <= 1) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % items.length), intervalMs);
    return () => clearInterval(id);
  }, [items, intervalMs, reduced]);

  return (
    <div className={`flex items-center gap-2 text-xs font-mono text-muted ${className}`}>
      <span className="text-electric shrink-0">Currently exploring:</span>
      <div className="relative overflow-hidden h-4 flex-1 min-w-0">
        <AnimatePresence mode="wait">
          <motion.span
            key={index}
            className="absolute inset-0 truncate"
            initial={reduced ? {} : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? {} : { opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {items[index]}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
}
