'use client';

import { useEffect, useRef, useState } from 'react';

import { ReactNode } from 'react';

export default function ChaosLayout({ children }: { children: ReactNode }) {
  // ----------------------------
  // Persistent mouse curse (global)
  // ----------------------------
  const [cursed, setCursed] = useState(false);
  const cursedRef = useRef(false);
  const ghostRef = useRef(null);

  // Läs curse-flagga vid start + lyssna på ändringar
  useEffect(() => {
    const read = () => setCursed(localStorage.getItem("curse_mouse_inverted") === "1");
    read();

    interface StorageEventWithKey extends StorageEvent {
      key: string | null;
    }

    const onStorage = (e: StorageEventWithKey) => {
      if (e.key === "curse_mouse_inverted") read();
    };
    window.addEventListener("storage", onStorage);

    return () => window.removeEventListener("storage", onStorage);
  }, []);

  // Håll en ref uppdaterad så click-handlern ser latest cursed utan att re-binda listener
  useEffect(() => {
    cursedRef.current = cursed;
  }, [cursed]);

  // Göm systemcursor globalt när förbannelsen är aktiv
  useEffect(() => {
    if (!cursed) {
      document.body.style.cursor = "";
      return;
    }
    document.body.style.cursor = "none";
    return () => {
      document.body.style.cursor = "";
    };
  }, [cursed]);

  // Ghost-cursor som rör sig spegelvänt (hela appen)
  useEffect(() => {
    if (!cursed) return;

    const handleMove = (e: MouseEvent) => {
      const ghost = ghostRef.current as HTMLElement | null;
      if (!ghost) return;

      const w = window.innerWidth;
      const h = window.innerHeight;

      const invX = w - e.clientX;
      const invY = h - e.clientY;

      // centrera 24x24
      ghost.style.transform = `translate(${invX - 12}px, ${invY - 12}px)`;
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [cursed]);

  // ----------------------------
  // Coinflip + delayed click (NOW with inverted click when cursed)
  // ----------------------------
  const spawnCoin = (x: number, y: number, isHeads: boolean) => {
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
          ${!isHeads ? '✔️' : '❌'}
        </div>
      </div>
    `;

    document.body.appendChild(coin);
    setTimeout(() => coin.remove(), 800);
  };

  useEffect(() => {
    const handleGlobalClick = (event: MouseEvent) => {
      // 1) Allow our own synthetic delayed click through
      if (event.isTrusted === false || event.detail === 0.123) return;

      // 2) Kill original click immediately
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();

      const isHeads = Math.random() > 0.5;

      // 3) Choose target: normal or inverted position
      let target = event.target;

      if (cursedRef.current) {
        const invX = window.innerWidth - event.clientX;
        const invY = window.innerHeight - event.clientY;

        const invTarget = document.elementFromPoint(invX, invY);
        if (invTarget) target = invTarget;
      }

      // 4) Spawn the coin (at original click point)
      let coinX = event.clientX;
      let coinY = event.clientY;

      if (cursedRef.current) {
        coinX = window.innerWidth - event.clientX;
        coinY = window.innerHeight - event.clientY;
      }

      spawnCoin(coinX, coinY, isHeads);

      // 5) Wait for the animation before doing anything
      setTimeout(() => {
        if (isHeads) {
          console.log("🪙 Heads! Executing delayed click...");

          const delayedClick = new MouseEvent('click', {
            view: window,
            bubbles: true,
            cancelable: true,
            detail: 0.123 // secret "pass-through" code
          });

          // Dispatch on chosen target
          if (target && typeof target.dispatchEvent === "function") {
            target.dispatchEvent(delayedClick);
          }
        } else {
          console.log("❌ Tails. Action swallowed by the void.");
        }
      }, 600);
    };

    window.addEventListener('click', handleGlobalClick, true);
    return () => window.removeEventListener('click', handleGlobalClick, true);
  }, []);

  return (
    <>
      {children}

      {/* Overlay för "inverterad känsla" */}
      {cursed && (
        <div className="fixed inset-0 pointer-events-none z-[9997] mix-blend-difference" />
      )}

      {/* Ghost cursor */}
      {cursed && (
        <div
          ref={ghostRef}
          className="fixed left-0 top-0 z-[9999] pointer-events-none"
          style={{ transform: "translate(-9999px, -9999px)" }}
        >
          <div className="w-6 h-6 border-2 border-white rotate-45 bg-black/40" />
        </div>
      )}
    </>
  );
}