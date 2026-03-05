'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface MotionPanelProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function MotionPanel({ children, className = '', delay = 0 }: MotionPanelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        type: 'spring',
        stiffness: 80,
        damping: 15,
        mass: 1,
        delay: delay,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}