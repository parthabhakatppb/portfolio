"use client";
import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { ExternalLink, ChevronDown, Layers } from "lucide-react";
import { TiltCard } from "@/components/ui/TiltCard";
import { ModelCard } from "@/components/ui/ModelCard";
import { ArchitectureDiagram } from "@/components/ui/ArchitectureDiagram";
import { LiveGithubRepos } from "@/components/ui/LiveGithubRepos";
import { resume } from "@/data/resume";
import { fadeUp, fadeUpDelay } from "@/lib/variants";

function ProjectCard({
  project,
  index,
}: {
  project: (typeof resume.projects)[number];
  index: number;
}) {
  const [expanded, setExpanded] = useState(false);
  const accentColor = index % 2 === 0 ? "electric" : "violet";
  const shouldReduce = useReducedMotion();

  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      variants={fadeUpDelay(index * 0.15)}
      className="h-full"
    >
      <TiltCard className="h-full p-8 flex flex-col justify-between">
        <div>
          {/* Header */}
          <div className="flex items-start justify-between mb-4 gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-mono text-muted">{project.period}</span>
              </div>
              <h3 className="font-display text-xl md:text-2xl font-bold text-text group-hover:text-electric transition-colors">
                {project.title}
              </h3>
            </div>
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View ${project.title} on GitHub`}
                className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center border border-white/10 text-muted hover:text-electric hover:border-electric/60 hover:shadow-[0_0_15px_oklch(75%_0.18_230/30%)] transition-all duration-300"
              >
                <ExternalLink size={16} />
              </a>
            )}
          </div>

          {/* Description */}
          <p className="text-muted text-sm leading-relaxed mb-6">{project.description}</p>

          {/* Bullets */}
          <ul className="space-y-3 mb-6">
            {project.bullets.slice(0, 3).map((bullet, bi) => (
              <li key={bi} className="flex gap-2.5 text-sm text-muted/90 leading-relaxed">
                <span className="text-electric mt-1 shrink-0 text-xs font-mono">▸</span>
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6 pt-4 border-t border-white/8">
            {project.tags.map((tag) => (
              <span key={tag} className="tag-chip">{tag}</span>
            ))}
          </div>

          {/* Toggle: Model Card + Architecture Diagram */}
          <button
            onClick={() => setExpanded((e) => !e)}
            className="w-full py-2.5 px-4 rounded-xl border border-electric/25 bg-electric/8 hover:bg-electric/15 text-xs font-mono text-electric transition-all duration-200 flex items-center justify-between focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric"
            aria-expanded={expanded}
            aria-controls={`project-detail-${index}`}
          >
            <span className="flex items-center gap-2 font-semibold">
              <Layers size={14} className="text-electric" />
              {expanded ? "Hide Architecture & Model Card" : "Show Architecture & Model Card"}
            </span>
            <motion.span
              animate={shouldReduce ? {} : { rotate: expanded ? 180 : 0 }}
              transition={{ duration: 0.2 }}
              style={{ display: "flex" }}
            >
              <ChevronDown size={14} />
            </motion.span>
          </button>

          <AnimatePresence>
            {expanded && (
              <motion.div
                id={`project-detail-${index}`}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden pt-4 space-y-4"
              >
                {/* Model Card */}
                {"modelCard" in project && project.modelCard && (
                  <ModelCard
                    data={project.modelCard as { framework: string; dataset: string; metric: string; detail: string }}
                    delay={0}
                  />
                )}
                {/* Architecture Diagram */}
                {"architecture" in project && project.architecture && (
                  <ArchitectureDiagram
                    stages={project.architecture as readonly string[]}
                    color={accentColor}
                  />
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </TiltCard>
    </motion.div>
  );
}

export function Projects() {
  const { projects } = resume;

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="relative py-28 px-6 md:px-12"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="section-label mb-4"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
        >
          04 / Projects
        </motion.div>

        <motion.h2
          id="projects-heading"
          className="font-display text-3xl md:text-4xl font-bold mb-4"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
        >
          Featured AI / ML Systems
        </motion.h2>

        <motion.p
          className="text-muted mb-16 max-w-xl"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUpDelay(0.1)}
        >
          Detailed production pipelines with expandable model architecture cards and live metrics.
        </motion.p>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>

        {/* Live GitHub Repositories Grid */}
        <LiveGithubRepos />
      </div>
    </section>
  );
}
