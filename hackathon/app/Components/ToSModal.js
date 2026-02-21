"use client";

import { useEffect, useRef } from "react";

export default function ToSModal({ open, onClose, onAccept, src, variant = "initial" }) {
  if (!open) return null;

  const iframeRef = useRef(null);

  const acceptInHeader = variant === "initial";
  const injectAcceptIntoDoc = variant === "wrong";

  useEffect(() => {
    if (!open || !injectAcceptIntoDoc) return;

    const iframe = iframeRef.current;
    if (!iframe) return;

    const handleLoad = () => {
      try {
        const doc = iframe.contentDocument;
        if (!doc) return;

        const old = doc.getElementById("tos-accept-btn");
        if (old) old.remove();

        const container = doc.createElement("div");
        container.id = "tos-accept-btn";
        container.style.margin = "24px 0";
        container.style.padding = "16px";
        container.style.display = "flex";
        container.style.justifyContent = "flex-end";

        const btn = doc.createElement("button");
        btn.type = "button";
        btn.textContent = "Godkänn villkoren";

        btn.style.background = "#16a34a";
        btn.style.color = "white";
        btn.style.border = "none";
        btn.style.padding = "10px 14px";
        btn.style.borderRadius = "8px";
        btn.style.cursor = "pointer";
        btn.style.fontSize = "14px";
        btn.style.fontWeight = "600";

        btn.addEventListener("click", () => {
          onAccept();
        });

        container.appendChild(btn);

        doc.body.appendChild(container);
      } catch (e) {
        console.error("Could not inject accept button into iframe:", e);
      }
    };

    iframe.addEventListener("load", handleLoad);
    return () => iframe.removeEventListener("load", handleLoad);
  }, [open, injectAcceptIntoDoc, src, onAccept]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white w-[90%] max-w-4xl h-[85%] rounded shadow-lg flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b flex justify-between items-center bg-gray-100">
          <h2 className="font-semibold">Villkor</h2>

          <div className="flex gap-3">
            {acceptInHeader && (
              <button
                onClick={onAccept}
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                Godkänn villkoren
              </button>
            )}
          </div>
        </div>

        {/* Innehåll */}
        <div className="flex-1 overflow-hidden">
          <iframe ref={iframeRef} src={src} className="w-full h-full" title="Villkor" />
        </div>

        {/* För andra ToS: vi visar INTE godkänn här nere – den injiceras i dokumentet */}
      </div>
    </div>
  );
}