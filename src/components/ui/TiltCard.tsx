"use client";
import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
}

export function TiltCard({ children, className }: TiltCardProps) {
  const shouldReduce = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={cn("relative overflow-hidden glass transition-all duration-500", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={
        shouldReduce
          ? {}
          : {
              y: -8,
              scale: 1.02,
              boxShadow:
                "0 0 0 1px oklch(75% 0.18 230 / 50%), 0 12px 40px oklch(75% 0.18 230 / 25%)",
            }
      }
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Ambient gradient glow on hover */}
      {!shouldReduce && (
        <motion.div
          className="pointer-events-none absolute inset-0 z-0 rounded-2xl transition-opacity duration-500"
          style={{
            opacity: isHovered ? 1 : 0,
            background:
              "radial-gradient(800px circle at 50% 0%, oklch(75% 0.18 230 / 12%) 0%, transparent 70%)",
          }}
          aria-hidden="true"
        />
      )}

      {/* Shimmer sweep border effect */}
      {!shouldReduce && isHovered && (
        <motion.div
          className="pointer-events-none absolute -inset-[1px] rounded-2xl opacity-40 z-0"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, oklch(75% 0.18 230 / 80%) 50%, transparent 100%)",
            backgroundSize: "200% 100%",
          }}
          animate={{ backgroundPosition: ["200% 0", "-200% 0"] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
          aria-hidden="true"
        />
      )}

      <div className="relative z-10 flex flex-col h-full w-full">{children}</div>
    </motion.div>
  );
}
