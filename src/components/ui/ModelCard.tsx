"use client";
import { motion } from "motion/react";
import { Cpu, Database, BarChart2, Layers } from "lucide-react";
import { fadeUpDelay } from "@/lib/variants";

interface ModelCardData {
  framework: string;
  dataset: string;
  metric: string;
  detail: string;
}

interface ModelCardProps {
  data: ModelCardData;
  delay?: number;
}

const ROWS: { key: keyof ModelCardData; label: string; icon: React.ReactNode }[] = [
  { key: "framework", label: "Framework", icon: <Cpu size={12} className="text-electric shrink-0" /> },
  { key: "dataset", label: "Dataset", icon: <Database size={12} className="text-electric shrink-0" /> },
  { key: "metric", label: "Metric", icon: <BarChart2 size={12} className="text-electric shrink-0" /> },
  { key: "detail", label: "Training detail", icon: <Layers size={12} className="text-electric shrink-0" /> },
];

export function ModelCard({ data, delay = 0 }: ModelCardProps) {
  return (
    <motion.div
      className="mt-4 rounded-xl border border-electric/15 bg-electric/4 overflow-hidden"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-40px" }}
      variants={fadeUpDelay(delay)}
    >
      {/* Header bar */}
      <div className="flex items-center gap-2 px-4 py-2 border-b border-electric/10 bg-electric/6">
        <span
          className="inline-block w-2 h-2 rounded-full bg-electric"
          style={{ boxShadow: "0 0 6px oklch(75% 0.18 230 / 60%)" }}
        />
        <span className="text-xs font-mono text-electric tracking-widest uppercase">Model Card</span>
      </div>

      {/* Spec rows */}
      <div className="divide-y divide-white/5">
        {ROWS.map(({ key, label, icon }) => (
          <div key={key} className="flex items-start gap-3 px-4 py-2.5">
            <span className="mt-0.5">{icon}</span>
            <span className="text-xs font-mono text-muted w-24 shrink-0">{label}</span>
            <span className="text-xs font-mono text-text/80 flex-1 leading-relaxed">{data[key]}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
