"use client";
import { motion, useReducedMotion } from "motion/react";
import { MapPin, Calendar, Building2 } from "lucide-react";
import { resume } from "@/data/resume";
import { fadeUp, fadeUpDelay } from "@/lib/variants";

export function Experience() {
  const { experience } = resume;
  const shouldReduce = useReducedMotion();

  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
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
          <span className="w-1.5 h-1.5 rounded-full bg-electric pulse-dot" />
          <span>03 / Experience</span>
        </motion.div>

        <motion.h2
          id="experience-heading"
          className="font-display text-3xl md:text-4xl font-bold mb-16"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
        >
          Work History
        </motion.h2>

        <div className="relative">
          {/* Vertical timeline base line */}
          <motion.div
            className="absolute left-5 md:left-8 top-0 w-[2px] h-full bg-white/10 rounded-full"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            style={{ transformOrigin: "top" }}
            aria-hidden="true"
          />

          {/* Traveling energy pulse along timeline line */}
          {!shouldReduce && (
            <motion.div
              className="absolute left-5 md:left-8 w-[2px] h-32 rounded-full pointer-events-none z-10"
              style={{
                background:
                  "linear-gradient(180deg, transparent 0%, oklch(75% 0.18 230) 50%, oklch(65% 0.22 300) 100%, transparent 100%)",
                boxShadow: "0 0 12px oklch(75% 0.18 230)",
              }}
              animate={{ top: ["-10%", "100%"] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.5 }}
              aria-hidden="true"
            />
          )}

          <div className="space-y-12">
            {experience.map((job, i) => (
              <motion.div
                key={`${job.company}-${i}`}
                className="relative pl-16 md:pl-24 group"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-80px" }}
                variants={fadeUpDelay(i * 0.12)}
              >
                {/* Node dot with radar ring */}
                <div className="absolute left-3.5 md:left-6 top-6 -translate-x-1/2 flex items-center justify-center">
                  <motion.div
                    className="w-4 h-4 rounded-full border-2 border-electric bg-void z-10 shadow-[0_0_12px_oklch(75%_0.18_230/80%)]"
                    animate={
                      shouldReduce
                        ? {}
                        : { scale: [1, 1.25, 1], borderColor: ["#38bdf8", "#c084fc", "#38bdf8"] }
                    }
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    aria-hidden="true"
                  />
                  {!shouldReduce && (
                    <motion.div
                      className="absolute w-8 h-8 rounded-full bg-electric/20 pointer-events-none"
                      animate={{ scale: [1, 2.2], opacity: [0.7, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                      aria-hidden="true"
                    />
                  )}
                </div>

                {/* Card with smooth hover elevation */}
                <motion.div
                  className="glass p-6 md:p-8 relative overflow-hidden transition-colors border border-white/10 group-hover:border-electric/40"
                  whileHover={shouldReduce ? {} : { y: -5, boxShadow: "0 12px 36px oklch(75% 0.18 230 / 15%)" }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Top glowing accent bar */}
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-electric via-violet to-transparent opacity-60 group-hover:opacity-100 transition-opacity" />

                  {/* Header */}
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-5">
                    <div>
                      <h3 className="font-display text-xl md:text-2xl font-bold text-text group-hover:text-electric transition-colors">
                        {job.role}
                      </h3>
                      <div className="flex flex-wrap items-center gap-3 mt-2">
                        <span className="flex items-center gap-1.5 text-sm font-semibold text-electric">
                          <Building2 size={14} />
                          {job.company}
                        </span>
                        <span className="flex items-center gap-1.5 text-sm text-muted font-mono">
                          <MapPin size={13} className="text-violet" />
                          {job.location}
                        </span>
                      </div>
                    </div>
                    <span className="flex items-center gap-1.5 text-xs font-mono text-electric border border-electric/30 rounded-full px-3.5 py-1.5 bg-electric/8 whitespace-nowrap shadow-sm">
                      <Calendar size={12} className="text-electric" />
                      {job.period}
                    </span>
                  </div>

                  {/* Bullets */}
                  <ul className="space-y-3.5 mt-4 pt-4 border-t border-white/6">
                    {job.bullets.map((bullet, bi) => (
                      <motion.li
                        key={bi}
                        className="flex gap-3 text-sm md:text-base text-muted/90 leading-relaxed"
                        initial={shouldReduce ? {} : { opacity: 0, x: -10 }}
                        whileInView={shouldReduce ? {} : { opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.12 + bi * 0.08, duration: 0.4 }}
                      >
                        <span className="text-electric mt-1.5 shrink-0 text-xs font-mono">▸</span>
                        <span>{bullet}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
