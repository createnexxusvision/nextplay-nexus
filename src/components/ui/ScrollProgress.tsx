'use client';
// NextPlay Nexus — Scroll Progress Bar

import { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  const spring = useSpring(progress, { stiffness: 200, damping: 40 });

  useEffect(() => {
    const onScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      const total = scrollHeight - clientHeight;
      setProgress(total > 0 ? scrollTop / total : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Keep spring in sync
  useEffect(() => {
    spring.set(progress);
  }, [progress, spring]);

  return (
    <motion.div
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '3px',
        background: 'linear-gradient(90deg, #FDB927 0%, #FFD166 60%, #FDB927 100%)',
        transformOrigin: '0%',
        scaleX: spring,
        zIndex: 401,
        boxShadow: '0 0 8px rgba(253,185,39,0.6)',
        pointerEvents: 'none',
      }}
    />
  );
}
