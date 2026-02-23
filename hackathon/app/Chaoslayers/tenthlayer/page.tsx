"use client";

export default function Tenthlayer() {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
            <h1 className="text-4xl font-bold mb-4">Grattis!</h1>
            <p className="text-lg mb-8">Du har klarat alla lager av kaoset. Välkommen till det sista lagret!</p>
            <button
                onClick={() => alert("Du har avslutat spelet!")}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
            >
                 Avsluta spelet
            </button>
        </div>
    );
}