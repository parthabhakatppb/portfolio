"use client";
import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { GitBranch, Link, Mail, Send, CheckCircle, AlertCircle, Loader2, Sparkles } from "lucide-react";
import { MagneticIcon } from "@/components/ui/MagneticIcon";
import { GlowButton } from "@/components/ui/GlowButton";
import { resume } from "@/data/resume";
import { fadeUp, fadeUpDelay } from "@/lib/variants";

type FormState = "idle" | "loading" | "success" | "error";

export function Contact() {
  const { contact, name, tagline } = resume;
  const [formState, setFormState] = useState<FormState>("idle");
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const shouldReduce = useReducedMotion();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setFormState("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setFormState("error");
      }
    } catch {
      setFormState("error");
    }
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative py-28 px-6 md:px-12 overflow-hidden"
    >
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          className="section-label mb-4 inline-flex items-center gap-2"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-electric pulse-dot" />
          <span>06 / Contact</span>
        </motion.div>

        <motion.h2
          id="contact-heading"
          className="font-display text-3xl md:text-5xl font-bold mb-4"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
        >
          Let&apos;s Build Something{" "}
          <span className="gradient-text">Together</span>
        </motion.h2>

        <motion.p
          className="text-muted text-lg mb-12 max-w-xl mx-auto"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUpDelay(0.1)}
        >
          Open to full-time ML/AI Engineer roles. Reach out via any channel below.
        </motion.p>

        {/* Contact form */}
        <motion.div
          className="glass p-8 md:p-10 rounded-3xl mb-14 text-left relative overflow-hidden border border-white/10 hover:border-electric/40 transition-colors"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUpDelay(0.15)}
          whileHover={shouldReduce ? {} : { y: -5, boxShadow: "0 16px 48px oklch(75% 0.18 230 / 12%)" }}
          transition={{ duration: 0.3 }}
        >
          {/* Top glowing gradient line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-electric via-violet to-electric opacity-70" />

          <div className="flex items-center gap-2 text-xs font-mono text-electric mb-6 uppercase tracking-wider font-semibold">
            <Sparkles size={14} className="text-electric" />
            <span>Direct Transmission Channel</span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="contact-name" className="block text-xs font-mono text-muted mb-2.5 uppercase tracking-wider">
                  Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData((d) => ({ ...d, name: e.target.value }))}
                  placeholder="Your name"
                  className="w-full px-4.5 py-3.5 rounded-xl bg-white/5 border border-white/10 text-text placeholder:text-muted/40 text-sm focus:outline-none focus:border-electric focus:bg-white/8 focus:shadow-[0_0_0_3px_oklch(75%_0.18_230/20%)] transition-all duration-200"
                />
              </div>
              <div>
                <label htmlFor="contact-email" className="block text-xs font-mono text-muted mb-2.5 uppercase tracking-wider">
                  Email
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData((d) => ({ ...d, email: e.target.value }))}
                  placeholder="your@email.com"
                  className="w-full px-4.5 py-3.5 rounded-xl bg-white/5 border border-white/10 text-text placeholder:text-muted/40 text-sm focus:outline-none focus:border-electric focus:bg-white/8 focus:shadow-[0_0_0_3px_oklch(75%_0.18_230/20%)] transition-all duration-200"
                />
              </div>
            </div>
            <div>
              <label htmlFor="contact-message" className="block text-xs font-mono text-muted mb-2.5 uppercase tracking-wider">
                Message
              </label>
              <textarea
                id="contact-message"
                required
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData((d) => ({ ...d, message: e.target.value }))}
                placeholder="Tell me about the role, project, or machine learning problem..."
                className="w-full px-4.5 py-3.5 rounded-xl bg-white/5 border border-white/10 text-text placeholder:text-muted/40 text-sm focus:outline-none focus:border-electric focus:bg-white/8 focus:shadow-[0_0_0_3px_oklch(75%_0.18_230/20%)] transition-all duration-200 resize-none"
              />
            </div>

            {formState === "success" && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 text-sm text-green-400 font-mono bg-green-400/10 border border-green-400/30 p-3.5 rounded-xl"
              >
                <CheckCircle size={18} className="shrink-0" />
                <span>Message sent! I&apos;ll get back to you as soon as possible.</span>
              </motion.div>
            )}
            {formState === "error" && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 text-sm text-red-400 font-mono bg-red-400/10 border border-red-400/30 p-3.5 rounded-xl"
              >
                <AlertCircle size={18} className="shrink-0" />
                <span>Something went wrong sending via API. Please email me directly at {contact.email}.</span>
              </motion.div>
            )}

            <GlowButton
              type="submit"
              variant="primary"
              disabled={formState === "loading" || formState === "success"}
              className="w-full sm:w-auto justify-center disabled:opacity-60 disabled:cursor-not-allowed text-base py-3.5 px-8"
            >
              {formState === "loading" ? (
                <><Loader2 size={18} className="animate-spin" /> Transmitting...</>
              ) : (
                <><Send size={18} /> Send Message</>
              )}
            </GlowButton>
          </form>
        </motion.div>

        {/* Social links */}
        <motion.div
          className="flex items-center justify-center gap-6 mb-14"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUpDelay(0.2)}
        >
          <MagneticIcon href={contact.github.url} label="GitHub profile (opens in new tab)">
            <GitBranch size={22} />
          </MagneticIcon>
          <MagneticIcon href={contact.linkedin.url} label="LinkedIn profile (opens in new tab)">
            <Link size={22} />
          </MagneticIcon>
          <MagneticIcon href={`mailto:${contact.email}`} label="Send email">
            <Mail size={22} />
          </MagneticIcon>
        </motion.div>

        {/* Footer */}
        <motion.div
          className="border-t border-white/10 pt-10 space-y-3"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUpDelay(0.3)}
        >
          <div className="font-display font-bold text-text text-lg">{name}</div>
          <div className="text-sm text-muted font-mono">{tagline}</div>
          <div className="flex items-center justify-center gap-2.5 mt-4">
            <span className="w-2 h-2 rounded-full bg-green-400 pulse-dot inline-block shadow-[0_0_8px_rgba(74,222,128,0.8)]" />
            <span className="text-xs font-mono text-electric tracking-wide">Open to full-time ML/AI Engineer roles</span>
          </div>
          <div className="text-xs text-muted/50 mt-5 font-mono">
            © {new Date().getFullYear()} {name}. Built with Next.js, React Three Fiber &amp; Tailwind CSS.
          </div>
        </motion.div>
      </div>
    </section>
  );
}
