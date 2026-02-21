"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import PopUpAd from "../../Components/PopUpAd";
import ConfirmModal from "@/app/Components/ConfirmModal";
import ToSModal from "@/app/Components/ToSModal";

export default function FifthLayer() {
    // Ads
    const [ads, setAds] = useState([]);
    const [adChoises, setAdChoises] = useState([
        { name: "Ad 1", src: "/PopUpAds/AffirmYes.png" },
        { name: "Ad 2", src: "/PopUpAds/SigBeGuru.png" },
        { name: "Ad 3", src: "/PopUpAds/spelkväll5.png" },
        { name: "Ad 4", src: "/PopUpAds/StartDatingRichMenNOW.mp4" },
        { name: "Ad 5", src: "/PopUpAds/VirusDetected.png" },
        { name: "Ad 6", src: "/PopUpAds/DaTebola.png" },
    ]);

    const removeAd = (indexToRemove: number) => {
        setAds((prev) => prev.filter((_, index) => index !== indexToRemove));
    }

    useEffect(() => {
    let timer: string | number | NodeJS.Timeout | undefined;

    const spawnAd = () => {
        // 1. Calculate the next random delay (2000ms to 10000ms)
        const randomDelay = Math.floor(Math.random() * 8000) + 2000;

        timer = setTimeout(() => {
            // 2. Add the new ad
            const randomAdIndex = Math.floor(Math.random() * adChoises.length);
            const screenWidth = window.innerWidth;
            const screenHeight = window.innerHeight;
            const w = Math.floor(Math.random() * 200) + 300;
            let y = Math.floor(Math.random() * (screenHeight));
            if (screenHeight - y < 250) {
                y = y - 250;
            }


            console.log("ad length: ", ads.length);
            console.log(ads);
            setAds((prev) => [...prev, {
                x: Math.floor(Math.random() * (screenWidth - w)),
                y,
                w,
                src: adChoises[randomAdIndex].src,
            }]);

            // 3. RECURSION: Start the process again for the next ad
            spawnAd();
        }, randomDelay);
    };
    
    // Start the ad spawning process when the component mounts
    spawnAd();
    return () => clearTimeout(timer);
    }, []);


    //TOS
    const QUESTION = {
        question: "Vad heter det träsk eller den flod som utgör den femte kretsen?",
        options: ["Slit", "Mute", "Donau", "Styx"],
        correctIndex: 3 
    };

    const [correct, setCorrect] = useState<boolean | null>(null);
    const [TOSopen, setTosOpen] = useState(false);
    const [pendingAction, setPendingAction] = useState<null | (() => void)>(null);
    const [tosSrc, setTosSrc] = useState<string>("/Dantes ToS.htm");
    const [answer, setAnswer] = useState<number | null>(null);
    const [confirmOpen, setConfirmOpen] = useState(false);

    const chooseOption = (optionIndex: number) => {
        if (optionIndex === QUESTION.correctIndex) {
            setCorrect(true);
        } else {
            setCorrect(false);
            setTosOpen(true);
        }
    };
    const askAreYouSure = (action: () => void) => {
        setPendingAction(() => action);
        setConfirmOpen(true);
    };

    const handleAcceptTos = () => {
        askAreYouSure(() => {
        setTosOpen(false);
        });
    };

    const handleConfirmAnswer = (answer: boolean) => {
        setConfirmOpen(false);

        if (answer && pendingAction) pendingAction();
        setPendingAction(null);
    };

    return (
        <div className="relative bg-black w-screen h-screen flex items-center justify-center flex-col overflow-hidden">
            <h1 className="text-white text-3xl">Välkommen till det femte lagret av Albins inferno!</h1>
            {ads.map((ad, index) => (
            <PopUpAd 
                key={index} 
                index={index} // Pass the index so the ad knows who it is
                x={ad.x} 
                y={ad.y} 
                w={ad.w} 
                src={ad.src} 
                onClose={() => removeAd(index)} // Pass the delete function
            />
            ))}
            <div className="border border-zinc-700 rounded p-4 mt-6">
                <h1 className="text-xl text-white mb-1">Du läste välan ToS?</h1>
                <p className="font-medium text-white">
                  {QUESTION.question}
                </p>

                <div className="mt-3 grid gap-2">
                  {QUESTION.options.map((opt, oi) => {
                    const base = "w-full text-left px-3 py-2 rounded border transition text-white";
                    const cls = correct 
                        ? `${base} border-blue-400 bg-blue-500/20`
                        : `${base} border-zinc-700 hover:border-zinc-400`;

                    return (
                      <button
                        key={oi}
                        onClick={() => chooseOption(oi)}
                        className={cls}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>
              <ConfirmModal open={confirmOpen} onAnswer={handleConfirmAnswer} />
            <ToSModal
                open={TOSopen}
                onClose={() => setTosOpen(false)}
                onAccept={handleAcceptTos}
                src={tosSrc}
                variant={"wrong"}
            />
        </div>
    );
}