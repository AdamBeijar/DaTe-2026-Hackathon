'use client';

import { useEffect } from 'react';

export default function ChaosLayout({ children }) {
  useEffect(() => {
    const handleGlobalClick = (event) => {
      // 1. If this is a 'fake' click we generated ourselves, let it happen!
      if (event.isTrusted === false || event.detail === 0.123) return;

      // 2. Kill the original click immediately
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();

      const isHeads = Math.random() > 0.5;
      const target = event.target;

      // 3. Spawn the coin
      spawnCoin(event.clientX, event.clientY, isHeads);

      // 4. Wait for the animation (600ms) before doing anything
      setTimeout(() => {
        if (isHeads) {
          console.log("🪙 Heads! Executing delayed click...");
          
          // Re-trigger the click manually on the element the user intended to hit
          // We use a custom detail value so our listener knows to ignore this specific click
          const delayedClick = new MouseEvent('click', {
            view: window,
            bubbles: true,
            cancelable: true,
            detail: 0.123 // Our secret "pass-through" code
          });
          target.dispatchEvent(delayedClick);
        } else {
          console.log("❌ Tails. Action swallowed by the void.");
        }
      }, 600); // This matches your CSS animation duration
    };

    window.addEventListener('click', handleGlobalClick, true);
    return () => window.removeEventListener('click', handleGlobalClick, true);
  }, []);

  const spawnCoin = (x, y, isHeads) => {
    const coin = document.createElement('div');
    coin.className = `fixed z-[99999] pointer-events-none coin-flip-animation`;
    coin.style.left = `${x}px`;
    coin.style.top = `${y}px`;

    coin.innerHTML = `
      <div class="coin-inner">
        <div class="coin-front bg-yellow-500 border-2 border-yellow-700 rounded-full flex items-center justify-center text-white text-2xl shadow-lg">
          ${isHeads ? '✔️' : '❌'}
        </div>
        <div class="coin-back bg-yellow-600 border-2 border-yellow-800 rounded-full flex items-center justify-center text-white text-2xl shadow-lg">
          ?
        </div>
      </div>
    `;

    document.body.appendChild(coin);
    setTimeout(() => coin.remove(), 800);
  };

  return <>{children}</>;
}