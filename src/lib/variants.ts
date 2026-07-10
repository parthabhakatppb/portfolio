import type { Variants } from "motion/react";
import type { Easing } from "motion/react";

// Typed ease value compatible with Motion's Easing type
const easeOut: Easing = "easeOut";

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeOut },
  },
};

export function fadeUpDelay(delay: number): Variants {
  return {
    hidden: { opacity: 0, y: 32 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay, ease: easeOut },
    },
  };
}
