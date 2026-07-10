"use client";
import { motion, useReducedMotion } from "motion/react";
import { Trophy, FileText, BookOpen, Users } from "lucide-react";
import { resume } from "@/data/resume";
import { fadeUp, fadeUpDelay } from "@/lib/variants";

const iconMap: Record<string, React.ReactNode> = {
  Hackathon: <Trophy size={24} className="text-yellow-400" />,
  Patent: <FileText size={24} className="text-electric" />,
  Publication: <BookOpen size={24} className="text-violet" />,
};

const gradientMap: Record<string, string> = {
  Hackathon: "from-yellow-400/15 via-orange-400/5 to-transparent",
  Patent: "from-electric/15 via-electric/5 to-transparent",
  Publication: "from-violet/15 via-violet/5 to-transparent",
};

const borderMap: Record<string, string> = {
  Hackathon: "border-yellow-400/25 hover:border-yellow-400/60 shadow-[0_0_20px_rgba(250,204,21,0.1)] hover:shadow-[0_0_35px_rgba(250,204,21,0.25)]",
  Patent: "border-electric/25 hover:border-electric/60 shadow-[0_0_20px_oklch(75%_0.18_230/10%)] hover:shadow-[0_0_35px_oklch(75%_0.18_230/25%)]",
  Publication: "border-violet/25 hover:border-violet/60 shadow-[0_0_20px_oklch(65%_0.22_300/10%)] hover:shadow-[0_0_35px_oklch(65%_0.22_300/25%)]",
};

export function Achievements() {
  const { achievements, leadership } = resume;
  const shouldReduce = useReducedMotion();

  return (
    <section
      id="achievements"
      aria-labelledby="achievements-heading"
      className="relative py-28 px-6 md:px-12 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="section-label mb-4 flex items-center gap-2"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 pulse-dot" />
          <span>05 / Achievements</span>
        </motion.div>

        <motion.h2
          id="achievements-heading"
          className="font-display text-3xl md:text-4xl font-bold mb-16"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
        >
          Recognition & Research
        </motion.h2>

        {/* Bento grid: hackathon large, patent + publication smaller */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Hackathon — large card */}
          {achievements.filter((a) => a.type === "Hackathon").map((item, i) => (
            <motion.div
              key={i}
              className={`glass p-8 rounded-2xl border bg-gradient-to-br ${gradientMap[item.type]} ${borderMap[item.type]} transition-all duration-300 md:row-span-1 relative overflow-hidden group`}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeUp}
              whileHover={shouldReduce ? {} : { y: -6, scale: 1.01 }}
            >
              {/* Shimmer sweep */}
              {!shouldReduce && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-400/10 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  aria-hidden="true"
                />
              )}

              <div className="flex items-start gap-4 mb-4 relative z-10">
                <motion.div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 border border-yellow-400/30"
                  style={{ background: "oklch(70% 0.18 60 / 18%)" }}
                  animate={shouldReduce ? {} : { rotate: [0, 6, -6, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  {iconMap[item.type]}
                </motion.div>
                <div>
                  <span className="text-xs font-mono tracking-widest uppercase text-yellow-400 font-semibold mb-1 block">
                    {item.type} · {item.date}
                  </span>
                  <h3 className="font-display text-xl md:text-2xl font-bold text-text leading-snug group-hover:text-yellow-400 transition-colors">
                    {item.title}
                  </h3>
                </div>
              </div>
              <p className="text-muted text-sm font-mono pl-18 relative z-10 leading-relaxed">{item.detail}</p>
              <div className="mt-6 pl-18 relative z-10">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-yellow-400/40 bg-yellow-400/15 text-xs font-mono font-bold text-yellow-400 shadow-[0_0_12px_rgba(250,204,21,0.2)]">
                  <Trophy size={13} className="text-yellow-400 animate-bounce" />
                  2nd Place Winner
                </span>
              </div>
            </motion.div>
          ))}

          {/* Patent + Publication stacked */}
          <div className="flex flex-col gap-6">
            {achievements.filter((a) => a.type !== "Hackathon").map((item, i) => (
              <motion.div
                key={i}
                className={`glass p-6 rounded-2xl border bg-gradient-to-br ${gradientMap[item.type]} ${borderMap[item.type]} transition-all duration-300 flex-1 relative overflow-hidden group`}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-80px" }}
                variants={fadeUpDelay((i + 1) * 0.12)}
                whileHover={shouldReduce ? {} : { y: -5, scale: 1.01 }}
              >
                <div className="flex items-start gap-3.5 mb-3 relative z-10">
                  <motion.div
                    className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border border-white/10"
                    style={{ background: item.type === "Patent" ? "oklch(75% 0.18 230 / 15%)" : "oklch(65% 0.22 300 / 15%)" }}
                    animate={shouldReduce ? {} : { scale: [1, 1.08, 1] }}
                    transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
                  >
                    {iconMap[item.type]}
                  </motion.div>
                  <div>
                    <span
                      className="text-xs font-mono tracking-widest uppercase mb-1 block font-semibold"
                      style={{ color: item.type === "Patent" ? "oklch(75% 0.18 230)" : "oklch(65% 0.22 300)" }}
                    >
                      {item.type} · {item.date}
                    </span>
                    <h3 className="font-display text-base md:text-lg font-bold text-text leading-snug group-hover:text-electric transition-colors">
                      {item.title}
                    </h3>
                  </div>
                </div>
                <p className="text-muted text-sm font-mono relative z-10">{item.detail}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Leadership card */}
        <motion.div
          className="glass p-8 rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 via-white/2 to-transparent hover:border-electric/40 transition-colors group"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUpDelay(0.3)}
          whileHover={shouldReduce ? {} : { y: -4 }}
        >
          <div className="flex items-start gap-4 mb-6">
            <motion.div
              className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 bg-electric/15 border border-electric/30"
              animate={shouldReduce ? {} : { rotate: [0, 10, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
              <Users size={20} className="text-electric" />
            </motion.div>
            <div>
              <span className="text-xs font-mono tracking-widest uppercase text-electric mb-1 block font-semibold">
                Leadership & Community
              </span>
              <h3 className="font-display text-xl font-bold text-text group-hover:text-electric transition-colors">
                Campus Involvement
              </h3>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            {leadership.map((l, i) => (
              <motion.div
                key={i}
                className="p-4 rounded-xl border border-white/6 bg-surface/40 hover:border-white/20 transition-colors"
                whileHover={shouldReduce ? {} : { scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="font-semibold text-base text-text">{l.role}</div>
                <div className="text-xs text-electric mt-1 font-mono font-medium">{l.org}</div>
                <div className="text-xs text-muted mt-1 font-mono">{l.period}</div>
                <div className="text-xs text-muted/80 mt-2 leading-relaxed">{l.detail}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
