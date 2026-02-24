"use client";

import { useState, useEffect } from "react";

import Image from "next/image";

export default function Tenthlayer() {
    const fullText = `Du har gått igenom alla lagren av Albins inferno och du har nått honom själv!\n\nDär borta kan du se honom göra den största synden av de alla, dricka donkero innan att sillizen ens har börjat!\n\nNu har alla dina tidigare synder och straff förts samman i ett och samma, att sitta här och titta på medan Albin utför en synd så illa att bara en gulis skulle kunna ens tänka sig tanken att göra det.`;

    const [displayText, setDisplayText] = useState("");
    const [index, setIndex] = useState(0);
    const [correctPassword, setCorrectPassword] = useState(false);

    // Remove the mouse inversion curse on mount
    useEffect(() => {
        localStorage.removeItem("curse_mouse_inverted");
        if (localStorage.getItem("correctPassword") === "true") {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setCorrectPassword(true);
        }
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
            <div className="border-4 border-white bg-black p-8 max-w-3xl w-full shadow-2xl z-10 relative">
                <h3 className="text-white text-xl font-mono leading-relaxed whitespace-pre-wrap">
                    {displayText}
                    {index < fullText.length && (
                        <span className="inline-block w-3 h-6 bg-white ml-1 animate-pulse" />
                    )}
                </h3>
            </div>
            <div className="absolute top-4 right-1/12 text-sm text-gray-500 w-96">
            <Image
                src="/AlbinLucifer.png"
                width={900}
                height={900}
                alt="Albin Lucifer"
                className="mb-8"
            />
            </div>
            {!correctPassword && (
                <div className="w-full flex items-center justify-center flex-col">
                <div className="absolute top-4 text-xl text-gray-500">
                    TRUE ENDING
                </div>
                <div className="absolute bottom-4 text-sm text-gray-500">
                    Eftersom du av ren tur eller skicklighet lyckades gissa rätt på lösenordet så har du brutit den sista förbannelsen och kan nu njuta av Albins inferno utan att behöva oroa dig för att råka ut för några fler hemskheter! Grattis!
                </div>
                </div>
            )}
        </div>
    );
}