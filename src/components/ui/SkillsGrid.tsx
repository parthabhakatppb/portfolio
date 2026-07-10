"use client";
import { motion, useReducedMotion } from "motion/react";
import { fadeUpDelay } from "@/lib/variants";

interface SkillsGridProps {
  aiMl: readonly string[];
  development: readonly string[];
  dataAndTools: readonly string[];
}

interface CategoryPanelProps {
  title: string;
  skills: readonly string[];
  accentColor: "electric" | "violet" | "neutral";
  panelDelay: number;
}

const DOT_COLORS = {
  electric: "oklch(75% 0.18 230)",
  violet: "oklch(65% 0.22 300)",
  neutral: "oklch(60% 0.08 230)",
} as const;

const PILL_STYLES = {
  electric: {
    base: "border-electric/25 bg-electric/8 text-muted",
    hoverColor: "oklch(75% 0.18 230)",
    hoverBg: "oklch(75% 0.18 230 / 18%)",
  },
  violet: {
    base: "border-violet/25 bg-violet/8 text-muted",
    hoverColor: "oklch(65% 0.22 300)",
    hoverBg: "oklch(65% 0.22 300 / 18%)",
  },
  neutral: {
    base: "border-white/15 bg-white/5 text-muted",
    hoverColor: "oklch(95% 0.01 280)",
    hoverBg: "oklch(100% 0 0 / 12%)",
  },
} as const;

function CategoryPanel({ title, skills, accentColor, panelDelay }: CategoryPanelProps) {
  const dot = DOT_COLORS[accentColor];
  const pillStyle = PILL_STYLES[accentColor];
  const shouldReduce = useReducedMotion();

  return (
    <motion.div
      className="glass p-6 flex flex-col gap-5 relative overflow-hidden transition-colors border border-white/10 hover:border-electric/40"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      variants={fadeUpDelay(panelDelay)}
      whileHover={shouldReduce ? {} : { y: -6, boxShadow: `0 12px 40px ${dot}20` }}
      transition={{ duration: 0.3 }}
    >
      {/* Top ambient glow */}
      <div
        className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl opacity-60 transition-opacity"
        style={{ background: `linear-gradient(90deg, ${dot}, transparent)` }}
      />

      {/* Panel header */}
      <div className="flex items-center gap-3">
        <span
          className="w-3 h-3 rounded-full shrink-0 pulse-dot"
          style={{ background: dot, boxShadow: `0 0 10px ${dot}` }}
        />
        <h3 className="font-display font-semibold text-text text-lg tracking-tight">{title}</h3>
        <span
          className="ml-auto font-mono text-xs text-muted border border-white/10 rounded-full px-2.5 py-0.5 bg-white/5 font-semibold"
          style={{ color: dot }}
        >
          {skills.length}
        </span>
      </div>

      {/* Separator */}
      <div className="h-px w-full" style={{ background: `linear-gradient(90deg, ${dot}40, transparent)` }} />

      {/* Pills — plain flex-wrap with elastic bounce hover */}
      <div className="flex flex-wrap gap-2.5">
        {skills.map((skill, i) => (
          <motion.span
            key={skill}
            className={`inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wide border cursor-default select-none ${pillStyle.base}`}
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: panelDelay + i * 0.035, duration: 0.35, type: "spring", stiffness: 180 }}
            whileHover={
              shouldReduce
                ? {}
                : {
                    y: -3,
                    scale: 1.06,
                    borderColor: pillStyle.hoverColor,
                    backgroundColor: pillStyle.hoverBg,
                    color: pillStyle.hoverColor,
                    boxShadow: `0 0 14px ${dot}40`,
                  }
            }
          >
            {skill}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}

export function SkillsGrid({ aiMl, development, dataAndTools }: SkillsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <CategoryPanel title="AI / ML" skills={aiMl} accentColor="electric" panelDelay={0} />
      <CategoryPanel title="Development" skills={development} accentColor="violet" panelDelay={0.12} />
      <CategoryPanel title="Data & Tools" skills={dataAndTools} accentColor="neutral" panelDelay={0.24} />
    </div>
  );
}
