"use client";

import { motion, type MotionValue } from "framer-motion";

const GEAR_POINTS =
  "200.0,100.0 198.8,115.6 176.1,124.7 171.3,136.3 180.9,158.8 170.7,170.7 147.0,164.7 136.3,171.3 130.9,195.1 115.6,198.8 100.0,180.0 87.5,179.0 69.1,195.1 54.6,189.1 53.0,164.7 43.4,156.6 19.1,158.8 10.9,145.4 23.9,124.7 21.0,112.5 0.0,100.0 1.2,84.4 23.9,75.3 28.7,63.7 19.1,41.2 29.3,29.3 53.0,35.3 63.7,28.7 69.1,4.9 84.4,1.2 100.0,20.0 112.5,21.0 130.9,4.9 145.4,10.9 147.0,35.3 156.6,43.4 180.9,41.2 189.1,54.6 176.1,75.3 179.0,87.5";

export function Gear({
  rotate,
  className,
}: {
  rotate: MotionValue<number>;
  className?: string;
}) {
  return (
    <motion.svg
      viewBox="0 0 200 200"
      style={{ rotate }}
      className={className}
      aria-hidden
    >
      <polygon points={GEAR_POINTS} fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="100" cy="100" r="58" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="100" cy="100" r="14" fill="none" stroke="currentColor" strokeWidth="2" />
    </motion.svg>
  );
}
