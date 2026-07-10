"use client";
import { useEffect, useRef, useState } from "react";

interface TypewriterProps {
  strings: readonly string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
  className?: string;
}

export function Typewriter({
  strings,
  typingSpeed = 60,
  deletingSpeed = 35,
  pauseDuration = 1800,
  className = "",
}: TypewriterProps) {
  const [displayText, setDisplayText] = useState("");
  const [phase, setPhase] = useState<"typing" | "pausing" | "deleting">("typing");
  const [stringIndex, setStringIndex] = useState(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (reduced) {
      setDisplayText(strings[0]);
      return;
    }

    const current = strings[stringIndex];

    if (phase === "typing") {
      if (displayText.length < current.length) {
        const t = setTimeout(
          () => setDisplayText(current.slice(0, displayText.length + 1)),
          typingSpeed
        );
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setPhase("pausing"), pauseDuration);
        return () => clearTimeout(t);
      }
    }

    if (phase === "pausing") {
      const t = setTimeout(() => setPhase("deleting"), 300);
      return () => clearTimeout(t);
    }

    if (phase === "deleting") {
      if (displayText.length > 0) {
        const t = setTimeout(
          () => setDisplayText(displayText.slice(0, -1)),
          deletingSpeed
        );
        return () => clearTimeout(t);
      } else {
        setStringIndex((i) => (i + 1) % strings.length);
        setPhase("typing");
      }
    }
  }, [displayText, phase, stringIndex, strings, typingSpeed, deletingSpeed, pauseDuration, reduced]);

  return (
    <span className={className} aria-live="polite" aria-atomic="true">
      {displayText}
      <span className="blink ml-0.5 text-electric" aria-hidden="true">|</span>
    </span>
  );
}
