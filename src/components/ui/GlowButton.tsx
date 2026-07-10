"use client";
import { forwardRef } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface GlowButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  href?: string;
  download?: string | boolean;
  children: React.ReactNode;
}

export const GlowButton = forwardRef<HTMLButtonElement, GlowButtonProps>(
  ({ variant = "primary", href, download, children, className, ...props }, ref) => {
    const base =
      "relative inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric focus-visible:ring-offset-2 focus-visible:ring-offset-void";

    const primary =
      "bg-gradient-to-r from-electric to-violet text-void shadow-[0_0_20px_oklch(75%_0.18_230/30%)] hover:shadow-[0_0_40px_oklch(75%_0.18_230/50%)] hover:scale-[1.03]";
    const secondary =
      "border border-white/15 bg-white/5 backdrop-blur-sm text-text hover:border-electric/50 hover:bg-electric/10 hover:shadow-[0_0_20px_oklch(75%_0.18_230/20%)] hover:scale-[1.03]";

    const classes = cn(base, variant === "primary" ? primary : secondary, className);

    if (href) {
      return (
        <motion.a
          href={href}
          download={download}
          className={classes}
          whileTap={{ scale: 0.97 }}
        >
          {children}
        </motion.a>
      );
    }

    return (
      <motion.button
        ref={ref}
        className={classes}
        whileTap={{ scale: 0.97 }}
        {...(props as React.ComponentProps<typeof motion.button>)}
      >
        {children}
      </motion.button>
    );
  }
);

GlowButton.displayName = "GlowButton";
