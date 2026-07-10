"use client";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Star, GitFork, ExternalLink, Code2 } from "lucide-react";
import { TiltCard } from "@/components/ui/TiltCard";
import { resume } from "@/data/resume";
import { fadeUp, fadeUpDelay } from "@/lib/variants";

interface GithubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
}

const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  Python: "#3572A5",
  JavaScript: "#f1e05a",
  Java: "#b07219",
  "Jupyter Notebook": "#DA5B0B",
  HTML: "#e34c26",
  CSS: "#563d7c",
};

// Fallback data in case GitHub API rate limit is reached or during offline dev
const FALLBACK_REPOS: GithubRepo[] = [
  {
    id: 1,
    name: "KUMBH-CORTEX",
    description: "Omni-Flow AI system built for Mahakumbh MP 2028 Innovation Hackathon (2nd Place Winner).",
    html_url: "https://github.com/parthabhakatppb/KUMBH-CORTEX",
    stargazers_count: 2,
    forks_count: 1,
    language: "TypeScript",
    updated_at: new Date().toISOString(),
  },
  {
    id: 2,
    name: "Sign-language-detection",
    description: "Real-time ASL detection classifying 24 alphabet gestures via webcam using custom CNN.",
    html_url: "https://github.com/parthabhakatppb/Sign-language-detection",
    stargazers_count: 3,
    forks_count: 1,
    language: "Jupyter Notebook",
    updated_at: new Date().toISOString(),
  },
  {
    id: 3,
    name: "CodeAlpha_VisionTrack_AI",
    description: "High-accuracy real-time object detection model powered by deep neural networks.",
    html_url: "https://github.com/parthabhakatppb/CodeAlpha_VisionTrack_AI",
    stargazers_count: 1,
    forks_count: 0,
    language: "Python",
    updated_at: new Date().toISOString(),
  },
  {
    id: 4,
    name: "CodeAlpha_Universal-AI-Translation-Engine",
    description: "Multilingual AI translation engine built with transformer architectures.",
    html_url: "https://github.com/parthabhakatppb/CodeAlpha_Universal-AI-Translation-Engine",
    stargazers_count: 1,
    forks_count: 0,
    language: "Python",
    updated_at: new Date().toISOString(),
  },
  {
    id: 5,
    name: "ChemViz_Project",
    description: "Interactive chemical structure visualization tool and molecular modeling application.",
    html_url: "https://github.com/parthabhakatppb/ChemViz_Project",
    stargazers_count: 1,
    forks_count: 0,
    language: "Python",
    updated_at: new Date().toISOString(),
  },
  {
    id: 6,
    name: "buildmedic-platform",
    description: "Production-ready web platform with automated CI/CD and AI-powered healthcare diagnostics.",
    html_url: "https://github.com/parthabhakatppb/buildmedic-platform",
    stargazers_count: 1,
    forks_count: 0,
    language: "TypeScript",
    updated_at: new Date().toISOString(),
  },
];

export function LiveGithubRepos() {
  const [repos, setRepos] = useState<GithubRepo[]>(FALLBACK_REPOS);
  const [isLive, setIsLive] = useState(false);
  const shouldReduce = useReducedMotion();

  const { username, highlightedRepos } = resume.githubSection;

  useEffect(() => {
    let active = true;

    async function fetchGithub() {
      try {
        const res = await fetch(
          `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`,
          { next: { revalidate: 3600 } }
        );
        if (!res.ok) throw new Error("Rate limit or API error");
        const data: GithubRepo[] = await res.json();

        if (!active || !Array.isArray(data)) return;

        // Filter & order based on highlightedRepos
        let filtered: GithubRepo[] = [];
        if (highlightedRepos && highlightedRepos.length > 0) {
          filtered = highlightedRepos
            .map((name) => data.find((r) => r.name.toLowerCase() === name.toLowerCase()))
            .filter((r): r is GithubRepo => r !== undefined);

          // If some highlighted repos weren't found in top 100 or API didn't return them, merge from fallback
          for (const name of highlightedRepos) {
            if (!filtered.some((r) => r.name.toLowerCase() === name.toLowerCase())) {
              const fb = FALLBACK_REPOS.find((r) => r.name.toLowerCase() === name.toLowerCase());
              if (fb) filtered.push(fb);
            }
          }
        } else {
          filtered = data.filter((r) => !r.description?.toLowerCase().includes("fork")).slice(0, 6);
        }

        if (filtered.length > 0) {
          setRepos(filtered);
          setIsLive(true);
        }
      } catch {
        // Silently use FALLBACK_REPOS if rate-limited or offline
        if (active) setRepos(FALLBACK_REPOS);
      }
    }

    fetchGithub();
    return () => { active = false; };
  }, [username, highlightedRepos]);

  return (
    <div className="mt-24 pt-16 border-t border-white/10">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
        <div>
          <motion.div
            className="flex items-center gap-2 text-xs font-mono text-electric tracking-widest uppercase mb-2"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <span className="w-2 h-2 rounded-full bg-electric pulse-dot inline-block shadow-[0_0_8px_oklch(75%_0.18_230)]" />
            <span>{isLive ? "Live Sync from GitHub API" : "Verified GitHub Repositories"}</span>
          </motion.div>
          <motion.h3
            className="font-display text-2xl md:text-3xl font-bold text-text"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUpDelay(0.1)}
          >
            Open Source & Live Repos
          </motion.h3>
        </div>

        <motion.a
          href={`https://github.com/${username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-xs font-mono text-muted hover:text-electric transition-colors px-4 py-2 rounded-full border border-white/10 bg-white/5 hover:border-electric/40 self-start md:self-auto"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeUpDelay(0.15)}
        >
          <span>View all on @{username}</span>
          <ExternalLink size={13} />
        </motion.a>
      </div>

      {/* Grid of repositories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {repos.map((repo, i) => {
          const langColor = repo.language ? LANGUAGE_COLORS[repo.language] || "#a855f7" : "#a855f7";

          return (
            <motion.div
              key={repo.name}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-40px" }}
              variants={fadeUpDelay(i * 0.1)}
              className="h-full"
            >
              <TiltCard className="h-full p-6 flex flex-col justify-between group">
                <div>
                  {/* Top row: Name + External Link icon */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-display font-semibold text-lg text-text group-hover:text-electric transition-colors line-clamp-1 flex items-center gap-2"
                    >
                      <Code2 size={16} className="text-electric shrink-0" />
                      <span>{repo.name}</span>
                    </a>
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Open ${repo.name}`}
                      className="text-muted/60 group-hover:text-electric transition-colors shrink-0"
                    >
                      <ExternalLink size={15} />
                    </a>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-muted leading-relaxed line-clamp-3 mb-6">
                    {repo.description || "Experimental ML and software development repository on GitHub."}
                  </p>
                </div>

                {/* Bottom row: Language + Stars/Forks */}
                <div className="flex items-center justify-between pt-4 border-t border-white/6 text-xs font-mono text-muted/80">
                  <div className="flex items-center gap-2">
                    {repo.language && (
                      <span className="flex items-center gap-1.5">
                        <span
                          className="w-2.5 h-2.5 rounded-full shrink-0"
                          style={{ backgroundColor: langColor, boxShadow: `0 0 6px ${langColor}80` }}
                        />
                        <span>{repo.language}</span>
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Star size={13} className="text-amber-400" />
                      <span>{repo.stargazers_count}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <GitFork size={13} className="text-muted" />
                      <span>{repo.forks_count}</span>
                    </span>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
