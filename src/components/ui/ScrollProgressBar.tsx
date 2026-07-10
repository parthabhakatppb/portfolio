"use client";
import { useScroll, useSpring, motion } from "motion/react";

export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[9999] h-[2px] origin-left"
      style={{
        scaleX,
        background: "linear-gradient(90deg, oklch(75% 0.18 230), oklch(65% 0.22 300))",
      }}
      aria-hidden="true"
    />
  );
}
