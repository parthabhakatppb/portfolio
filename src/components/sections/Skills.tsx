"use client";
import { motion } from "motion/react";
import { ConstellationBg } from "@/components/ui/ConstellationBg";
import { SkillsGrid } from "@/components/ui/SkillsGrid";
import { resume } from "@/data/resume";
import { fadeUp } from "@/lib/variants";

export function Skills() {
  const { skills } = resume;

  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="relative py-28 px-6 md:px-12 overflow-hidden"
    >
      {/* Layer 1 — ambient constellation canvas (decorative, pointer-events: none) */}
      <ConstellationBg particleCount={30} connectDist={130} opacity={0.22} />

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          className="section-label mb-4"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
        >
          02 / Skills
        </motion.div>

        <motion.h2
          id="skills-heading"
          className="font-display text-3xl md:text-4xl font-bold mb-3"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
        >
          Technical Arsenal
        </motion.h2>

        <motion.p
          className="text-muted mb-12 max-w-xl"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
        >
          The tools and frameworks I work with day-to-day across machine learning, development, and data engineering.
        </motion.p>

        {/* Layer 2 — legible category panels */}
        <SkillsGrid
          aiMl={skills.aiMl}
          development={skills.development}
          dataAndTools={skills.dataAndTools}
        />
      </div>
    </section>
  );
}
