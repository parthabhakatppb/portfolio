"use client";
import { useEffect, useState, useCallback } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Experience } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/Projects";
import { Achievements } from "@/components/sections/Achievements";
import { Contact } from "@/components/sections/Contact";
import { ScrollProgressBar } from "@/components/ui/ScrollProgressBar";
import { ConstellationBg } from "@/components/ui/ConstellationBg";
import { resume } from "@/data/resume";

const BootSequence = dynamic(
  () => import("@/components/ui/BootSequence").then((m) => ({ default: m.BootSequence })),
  { ssr: false }
);

const NAV_LINKS = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#achievements", label: "Achievements" },
  { href: "#contact", label: "Contact" },
];

function Navbar({ visible }: { visible: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "py-3" : "py-4"
      }`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: visible ? 0 : -80, opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      role="banner"
    >
      <div
        className={`mx-auto max-w-7xl px-6 md:px-12 transition-all duration-500 ${
          scrolled ? "glass rounded-2xl" : ""
        }`}
      >
        <nav
          className="flex items-center justify-between h-12 md:h-14"
          aria-label="Main navigation"
        >
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            className="font-display font-bold text-sm tracking-widest gradient-text uppercase focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric rounded"
          >
            PPB
          </a>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-8" role="list">
            {NAV_LINKS.map(({ href, label }) => (
              <li key={href}>
                <a
                  href={href}
                  onClick={(e) => { e.preventDefault(); handleNavClick(href); }}
                  className="text-sm text-muted hover:text-text font-mono tracking-wide transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric rounded-sm"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>

          {/* Resume CTA */}
          <a
            href="/resume.pdf"
            download
            className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono tracking-wide border border-electric/30 text-electric bg-electric/8 hover:bg-electric/15 hover:border-electric/60 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric"
          >
            Resume PDF
          </a>

          {/* Mobile menu button */}
          <button
            className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg border border-white/10 text-muted hover:text-text hover:border-white/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </nav>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="md:hidden mx-6 mt-2 glass rounded-2xl p-6"
            initial={{ opacity: 0, y: -10, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.97 }}
            transition={{ duration: 0.2 }}
          >
            <ul className="space-y-4" role="list">
              {NAV_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <a
                    href={href}
                    onClick={(e) => { e.preventDefault(); handleNavClick(href); }}
                    className="block text-sm text-muted hover:text-electric font-mono tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric rounded"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
            <a
              href="/resume.pdf"
              download
              className="mt-5 flex items-center justify-center px-4 py-2.5 rounded-full text-xs font-mono tracking-wide border border-electric/30 text-electric bg-electric/8 hover:bg-electric/15 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric"
              onClick={() => setMenuOpen(false)}
            >
              Download Resume
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

export default function Page() {
  const [booted, setBooted] = useState(false);

  const handleBootComplete = useCallback(() => setBooted(true), []);

  return (
    <>
      <ScrollProgressBar />
      <ConstellationBg className="fixed inset-0 z-0 pointer-events-none" particleCount={35} connectDist={130} opacity={0.25} />
      <BootSequence onComplete={handleBootComplete} />

      <AnimatePresence>
        {booted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Navbar visible={booted} />
            <main id="main-content">
              <Hero />
              <About />
              <Skills />
              <Experience />
              <Projects />
              <Achievements />
              <Contact />
            </main>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
