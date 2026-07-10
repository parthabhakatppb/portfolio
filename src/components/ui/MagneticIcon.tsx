"use client";
import { motion, useReducedMotion } from "motion/react";

interface MagneticIconProps {
  children: React.ReactNode;
  href: string;
  label: string;
  radius?: number;
}

export function MagneticIcon({
  children,
  href,
  label,
}: MagneticIconProps) {
  const shouldReduce = useReducedMotion();

  return (
    <motion.a
      href={href}
      target={href.startsWith("mailto") ? undefined : "_blank"}
      rel="noopener noreferrer"
      aria-label={label}
      className="relative flex items-center justify-center w-13 h-13 rounded-full glass text-muted hover:text-electric border border-white/10 hover:border-electric/60 transition-colors duration-300"
      whileHover={
        shouldReduce
          ? {}
          : {
              y: -5,
              scale: 1.15,
              boxShadow:
                "0 0 25px oklch(75% 0.18 230 / 60%), 0 10px 20px rgba(0,0,0,0.5)",
            }
      }
      whileTap={{ scale: 0.93 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <span className="relative z-10 flex items-center justify-center">{children}</span>
    </motion.a>
  );
}
