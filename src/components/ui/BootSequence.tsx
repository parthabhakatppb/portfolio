"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const LINES = [
  "> initializing_model...",
  "> loading_weights...",
  "> calibrating_vision_core...",
  "> ready.",
];

const STORAGE_KEY = "boot_shown";

export function BootSequence({ onComplete }: { onComplete: () => void }) {
  const [visible, setVisible] = useState(false);
  const [lines, setLines] = useState<string[]>([]);
  const [done, setDone] = useState(false);

  useEffect(() => {
    // Skip on reduced motion
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) {
      onComplete();
      return;
    }
    // Only show once per session
    if (sessionStorage.getItem(STORAGE_KEY)) {
      onComplete();
      return;
    }
    sessionStorage.setItem(STORAGE_KEY, "1");
    setVisible(true);

    let idx = 0;
    const showNextLine = () => {
      if (idx < LINES.length) {
        setLines((prev) => [...prev, LINES[idx]]);
        idx++;
        if (idx < LINES.length) {
          setTimeout(showNextLine, idx === LINES.length - 1 ? 500 : 380);
        } else {
          setTimeout(() => {
            setDone(true);
            setTimeout(onComplete, 600);
          }, 700);
        }
      }
    };
    const startDelay = setTimeout(showNextLine, 300);
    return () => clearTimeout(startDelay);
  }, [onComplete]);

  if (!visible) return null;

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="boot-overlay"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="boot-terminal">
            <div className="mb-4 text-xs text-muted font-mono tracking-widest uppercase">
              PARTHA PRATIM BHAKAT // PORTFOLIO v1.0
            </div>
            {lines.map((line, i) => (
              <motion.span
                key={i}
                className="boot-line block mb-2"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                style={{ color: i === lines.length - 1 && lines.length === LINES.length ? "oklch(70% 0.18 150)" : undefined }}
              >
                {line}
                {i === lines.length - 1 && <span className="blink ml-1">█</span>}
              </motion.span>
            ))}
          </div>
          <button
            className="absolute bottom-8 right-8 text-xs text-muted font-mono tracking-wider hover:text-electric transition-colors"
            onClick={() => { setDone(true); setTimeout(onComplete, 300); }}
          >
            [ skip ]
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
