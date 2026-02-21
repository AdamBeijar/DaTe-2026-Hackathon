// app/(chaos-layers)/layout.js
'use client';

import { useEffect } from 'react';

export default function ChaosLayout({ children }) {
  useEffect(() => {
    const handleGlobalClick = (event) => {
      // 1. 50/50 Coinflip
      const clickPermitted = Math.random() > 0.5;

      if (!clickPermitted) {
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();
        console.log("🪙 Coinflip failed. Action blocked.");
        return;
      }
        console.log("🪙 Coinflip succeeded. Action allowed.");
    };

    window.addEventListener('click', handleGlobalClick, true);
    return () => window.removeEventListener('click', handleGlobalClick, true);
  }, []);

  return <>{children}</>;
}