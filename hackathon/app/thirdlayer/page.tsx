"use client";

import { useState } from "react";
import ConfirmModal from "@/Components/ConfirmModal";

export default function ThirdLayer() {
    const [TOSopen, setTOSOpen] = useState(false);
    const [TOSisOpen, setTOSIsOpen] = useState(false);

    const handleTOSAnswer = (answer: boolean) => {
        setTOSOpen(answer);
        setTOSIsOpen(!answer);
    }
    
    return (
        <div className="bg-black w-screen h-screen flex items-center justify-center flex-col gap-4">
            <h1 className="text-4xl text-white">Välkommen till tredje lagret av Albins inferno!</h1>
            {!TOSopen && <button onClick={() => setTOSIsOpen(true)} className="bg-blue-500 text-white px-4 py-2 hover:bg-blue-600"> Läs våra användarvillkor</button>}
            {TOSisOpen && ConfirmModal({ open: TOSisOpen, onAnswer: handleTOSAnswer})}
            {TOSopen && <div className="text-white">TOS</div>}
        </div>
    );
}