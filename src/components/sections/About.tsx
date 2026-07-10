"use client";
import { motion, useReducedMotion } from "motion/react";
import { GraduationCap, MapPin, Calendar, Sparkles } from "lucide-react";
import { resume } from "@/data/resume";
import { fadeUp, fadeUpDelay } from "@/lib/variants";
import { ExploringTicker } from "@/components/ui/ExploringTicker";

export function About() {
  const { education, summary, location, currentlyExploring } = resume;
  const shouldReduce = useReducedMotion();

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="relative py-28 px-6 md:px-12 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section label */}
        <motion.div
          className="section-label mb-4 flex items-center gap-2"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-violet pulse-dot" />
          <span>01 / About</span>
        </motion.div>

        <motion.h2
          id="about-heading"
          className="font-display text-3xl md:text-4xl font-bold mb-12"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
        >
          Who I Am
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Summary glass panel */}
          <motion.div
            className="glass p-8 relative overflow-hidden transition-colors border border-white/10 hover:border-electric/40 group"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            whileHover={shouldReduce ? {} : { y: -5, boxShadow: "0 12px 36px oklch(75% 0.18 230 / 12%)" }}
            transition={{ duration: 0.3 }}
          >
            {/* Ambient shimmer sweep */}
            {!shouldReduce && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-electric/8 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"
                animate={{ x: ["-100%", "200%"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                aria-hidden="true"
              />
            )}

            <div className="flex items-center gap-2 text-xs font-mono text-electric mb-3 uppercase tracking-wider font-semibold">
              <Sparkles size={14} className="text-electric" />
              <span>Executive Profile</span>
            </div>

            <p className="text-text/90 leading-relaxed text-base md:text-lg relative z-10">
              {summary}
            </p>

            {/* Location */}
            <div className="mt-6 flex items-center gap-2 text-sm text-muted font-mono relative z-10">
              <MapPin size={15} className="text-violet shrink-0" />
              <span>{location}</span>
            </div>

            {/* Currently exploring ticker */}
            <div className="mt-6 pt-5 border-t border-white/10 relative z-10">
              <ExploringTicker items={currentlyExploring} />
            </div>
          </motion.div>

          {/* Education + accent visual */}
          <motion.div
            className="space-y-6"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUpDelay(0.15)}
          >
            {/* Education card */}
            <motion.div
              className="glass p-6 border border-white/10 hover:border-violet/40 transition-colors"
              whileHover={shouldReduce ? {} : { y: -4, scale: 1.01 }}
              transition={{ duration: 0.25 }}
            >
              <div className="flex items-start gap-4">
                <motion.div
                  className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border border-violet/30"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(75% 0.18 230 / 20%), oklch(65% 0.22 300 / 25%))",
                  }}
                  animate={shouldReduce ? {} : { rotate: [0, 8, -8, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <GraduationCap size={22} className="text-electric" />
                </motion.div>
                <div>
                  <div className="font-display font-semibold text-text text-lg">{education.institution}</div>
                  <div className="text-sm text-muted mt-0.5">{education.degree}</div>
                  <div className="flex flex-wrap gap-4 mt-3 pt-3 border-t border-white/6">
                    <span className="flex items-center gap-1.5 text-xs font-mono text-muted">
                      <Calendar size={13} className="text-electric" />
                      {education.period}
                    </span>
                    <span className="flex items-center gap-1.5 text-xs font-mono">
                      <span className="text-electric font-semibold">CGPA</span>
                      <span className="text-text font-bold">{education.cgpa}</span>
                    </span>
                    <span className="flex items-center gap-1.5 text-xs font-mono text-muted">
                      <MapPin size={13} className="text-violet" />
                      {education.location}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Decorative holographic AI/ML card */}
            <motion.div
              className="rounded-2xl overflow-hidden relative border border-electric/20 group"
              style={{
                height: 190,
                background:
                  "linear-gradient(135deg, oklch(75% 0.18 230 / 12%) 0%, oklch(65% 0.22 300 / 16%) 100%)",
              }}
              whileHover={shouldReduce ? {} : { scale: 1.02 }}
              animate={shouldReduce ? {} : { y: [-4, 4, -4] }}
              transition={{
                y: { duration: 4.5, repeat: Infinity, ease: "easeInOut" },
                scale: { duration: 0.25 },
              }}
            >
              <div className="w-full h-full flex items-center justify-center relative overflow-hidden">
                {/* Decorative moving grid */}
                <motion.div
                  className="absolute inset-0 opacity-40"
                  style={{
                    backgroundImage:
                      "linear-gradient(oklch(75% 0.18 230 / 25%) 1px, transparent 1px), linear-gradient(90deg, oklch(75% 0.18 230 / 25%) 1px, transparent 1px)",
                    backgroundSize: "28px 28px",
                  }}
                  animate={shouldReduce ? {} : { backgroundPosition: ["0px 0px", "28px 28px"] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                />
                <div className="relative z-10 text-center space-y-1.5">
                  <motion.div
                    className="text-5xl font-display font-bold gradient-text tracking-tight"
                    animate={shouldReduce ? {} : { scale: [1, 1.05, 1] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  >
                    ML / AI
                  </motion.div>
                  <div className="text-xs font-mono text-electric tracking-[0.25em] uppercase font-semibold">
                    Machine Learning Systems
                  </div>
                  <div className="text-xs font-mono text-muted/80 tracking-widest">
                    Deep Neural Architectures
                  </div>
                </div>
                {/* Glow orbs */}
                <motion.div
                  className="absolute w-28 h-28 rounded-full top-2 left-4 opacity-40 pointer-events-none"
                  style={{
                    background: "radial-gradient(circle, oklch(75% 0.18 230) 0%, transparent 70%)",
                    filter: "blur(20px)",
                  }}
                  animate={shouldReduce ? {} : { scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                  className="absolute w-24 h-24 rounded-full bottom-2 right-6 opacity-30 pointer-events-none"
                  style={{
                    background: "radial-gradient(circle, oklch(65% 0.22 300) 0%, transparent 70%)",
                    filter: "blur(16px)",
                  }}
                  animate={shouldReduce ? {} : { scale: [1, 1.4, 1], opacity: [0.2, 0.5, 0.2] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
