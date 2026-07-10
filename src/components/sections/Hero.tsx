"use client";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ChevronDown, Download, ArrowRight } from "lucide-react";
import { SceneCanvas } from "@/components/3d/SceneCanvas";
import { Typewriter } from "@/components/ui/Typewriter";
import { CountUpStat } from "@/components/ui/CountUpStat";
import { resume } from "@/data/resume";

// ── Smooth Glowing CTA button (without pointer tracking hover) ─────────────────
interface SmoothCTAProps {
  children: React.ReactNode;
  href: string;
  download?: boolean | string;
  variant?: "primary" | "secondary";
  className?: string;
}

function SmoothCTA({ children, href, download, variant = "primary", className = "" }: SmoothCTAProps) {
  const shouldReduce = useReducedMotion();

  const base =
    "relative inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric focus-visible:ring-offset-2 focus-visible:ring-offset-void overflow-hidden";
  const primary =
    "bg-gradient-to-r from-electric to-violet text-void shadow-[0_0_25px_oklch(75%_0.18_230/40%)]";
  const secondary =
    "border border-white/20 bg-white/5 backdrop-blur-sm text-text hover:border-electric/60 hover:bg-electric/15";

  return (
    <motion.a
      href={href}
      download={download}
      className={`${base} ${variant === "primary" ? primary : secondary} ${className}`}
      whileHover={
        shouldReduce
          ? {}
          : {
              y: -4,
              scale: 1.04,
              boxShadow:
                variant === "primary"
                  ? "0 0 45px oklch(75% 0.18 230 / 65%)"
                  : "0 0 25px oklch(75% 0.18 230 / 30%)",
            }
      }
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      {/* Shimmer overlay for primary CTA */}
      {!shouldReduce && variant === "primary" && (
        <motion.span
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none"
          animate={{ x: ["-100%", "200%"] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", repeatDelay: 1 }}
          aria-hidden="true"
        />
      )}
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </motion.a>
  );
}

// ── Time-of-day greeting ───────────────────────────────────────────────────────
function TimeGreeting() {
  const [greeting, setGreeting] = useState("");
  useEffect(() => {
    const h = new Date().getHours();
    if (h < 12) setGreeting("Good morning");
    else if (h < 18) setGreeting("Good afternoon");
    else setGreeting("Good evening");
  }, []);
  if (!greeting) return null;
  return (
    <span className="text-xs font-mono text-muted/60 flex items-center gap-2">
      <span className="w-2 h-2 rounded-full bg-electric/60 animate-pulse inline-block" />
      {greeting} — welcome to my digital space.
    </span>
  );
}

// ── Hero section ──────────────────────────────────────────────────────────────
export function Hero() {
  const shouldReduce = useReducedMotion();

  return (
    <section
      id="home"
      aria-label="Hero"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-24 pb-16"
    >
      {/* 3D canvas — right half, full height */}
      <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
        <div className="absolute right-0 top-0 w-full md:w-[55%] h-full opacity-90">
          <SceneCanvas className="w-full h-full" />
        </div>
        {/* Left fade overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to right, var(--color-void) 30%, transparent 65%, var(--color-void) 100%)",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 pt-16 md:pt-24 pb-12">
        <div className="max-w-2xl">
          {/* Status badge with floating animation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={
              shouldReduce
                ? { opacity: 1, y: 0 }
                : { opacity: 1, y: [0, -4, 0] }
            }
            transition={
              shouldReduce
                ? { delay: 0.2, duration: 0.6 }
                : {
                    opacity: { delay: 0.2, duration: 0.6 },
                    y: { delay: 0.8, duration: 4, repeat: Infinity, ease: "easeInOut" },
                  }
            }
            className="mb-6 inline-block"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-electric/30 bg-electric/10 text-xs font-mono text-electric tracking-widest uppercase shadow-[0_0_15px_oklch(75%_0.18_230/20%)]">
              <span className="w-2 h-2 rounded-full bg-green-400 pulse-dot inline-block shadow-[0_0_8px_rgba(74,222,128,0.8)]" />
              Open to full-time ML/AI Engineer roles
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.7 }}
          >
            <span className="gradient-text">{resume.name}</span>
          </motion.h1>

          {/* Typewriter subtitle */}
          <motion.div
            className="text-lg md:text-xl font-mono text-muted mb-4 min-h-[1.75rem]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.55, duration: 0.6 }}
          >
            <Typewriter strings={resume.heroTypewriter} />
          </motion.div>

          {/* Description */}
          <motion.p
            className="text-base md:text-lg text-muted leading-relaxed mb-8 max-w-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            {resume.heroDescription}
          </motion.p>

          {/* Smooth CTAs */}
          <motion.div
            className="flex flex-wrap gap-4 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.6 }}
          >
            <SmoothCTA variant="primary" href="#projects">
              View My Work
              <ArrowRight size={16} />
            </SmoothCTA>
            <SmoothCTA variant="secondary" href="/resume.pdf" download>
              Download Resume
              <Download size={16} />
            </SmoothCTA>
          </motion.div>

          {/* Stat strip with glowing dividers */}
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-white/10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.05, duration: 0.6 }}
          >
            {resume.stats.map((stat, idx) => (
              <motion.div
                key={stat.label}
                className="relative p-3 rounded-xl border border-white/5 bg-surface/30 backdrop-blur-sm hover:border-electric/30 transition-colors"
                whileHover={shouldReduce ? {} : { y: -3 }}
                transition={{ duration: 0.2 }}
              >
                <CountUpStat
                  value={stat.value}
                  suffix={stat.suffix}
                  label={stat.label}
                  decimals={stat.decimals}
                />
              </motion.div>
            ))}
          </motion.div>

          {/* Time greeting */}
          <motion.div
            className="mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3, duration: 0.6 }}
          >
            <TimeGreeting />
          </motion.div>
        </div>
      </div>

      {/* Scroll chevron */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 text-muted"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        aria-hidden="true"
      >
        <span className="text-xs font-mono tracking-widest uppercase text-muted/60">Scroll</span>
        <ChevronDown size={18} className="bounce text-electric" />
      </motion.div>
    </section>
  );
}
