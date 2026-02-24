"use client";

import { useState, useEffect } from "react";

export default function Tenthlayer() {
    const fullText = `Du har gått igenom alla lagren av Albins inferno och du har nått honom själv!\n\nDär borta kan du se honom göra den största synden av de alla, dricka donkero innan att sillizen ens har börjat!\n\nNu har alla dina tidigare synder och straff förts samman i ett och samma, att sitta här och titta på medan Albin utför en synd så illa att bara en gulis skulle kunna ens tänka sig tanken att göra det.`;

    const [displayText, setDisplayText] = useState("");
    const [index, setIndex] = useState(0);

    // Remove the mouse inversion curse on mount
    useEffect(() => {
        localStorage.removeItem("curse_mouse_inverted");
    }, []);

    // Typewriter effect
    useEffect(() => {
        if (index < fullText.length) {
            const timeout = setTimeout(() => {
                setDisplayText((prev) => prev + fullText[index]);
                setIndex((prev) => prev + 1);
            }, 40); // 40ms per character for that Undertale rhythm
            return () => clearTimeout(timeout);
        }
    }, [index]);

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-black p-4">
            {/* The Dialogue Window */}
            <div className="border-4 border-white bg-black p-8 max-w-3xl w-full shadow-2xl">
                <h3 className="text-white text-xl font-mono leading-relaxed whitespace-pre-wrap">
                    {displayText}
                    {index < fullText.length && (
                        <span className="inline-block w-3 h-6 bg-white ml-1 animate-pulse" />
                    )}
                </h3>
            </div>
        </div>
    );
}