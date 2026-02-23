"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";

import PopUpAd from "../../Components/PopUpAd";
import ConfirmModal from "@/app/Components/ConfirmModal";
import ToSModal from "@/app/Components/ToSModal";


export default function SixthLayer() {
    const router = useRouter();

    const [progress, setProgress] = useState(0);
    const [statusText, setStatusText] = useState("Förbereder tortyr...");

    const [skipTimerButtonVisible, setSkipTimerButtonVisible] = useState(false);
    const [skipTimerClickedOnce, setSkipTimerClickedOnce] = useState(false);

    const [completed, setCompleted] = useState(false);

    const onComplete = () => {
        setStatusText("Captcha klar! Förbereder nästa lager...");
        setCompleted(true);
    }

    const handleSkipLoading = () => {
        // This will trigger the global 'Are you sure' if ChaosWrapper is active
        setProgress(0);
        setStatusText("You thought you could skip the loading? Think again!");
        setSkipTimerButtonVisible(false);
        setSkipTimerClickedOnce(true); 
    };

    // Remove this effect, as setState should not be called synchronously inside effects
    // The completion logic will be handled in the progress update callback below



    useEffect(() => {
    const interval = setInterval(() => {
        setProgress((prev) => {
            // 1. THE CAP: If they haven't clicked skip, they can't pass 98%
            if (!skipTimerClickedOnce && prev >= 98) {
                setStatusText("Väntar på bekräftelse av användarlicens...");
                return 98; 
            }

            // 2. THE FINAL STOP: Only reachable after skipTimerClickedOnce is true
            if (prev >= 100) {
                clearInterval(interval);
                // Completion logic here instead of useEffect
                setStatusText("Captcha klar! Förbereder nästa lager...");
                setCompleted(true);
                return 100;
            }

            // 3. The "99% Trap" (Now only possible after they've reset once)
            if (prev >= 99) {
                if (Math.random() > 0.98) return 100;
                return 99; 
            }

            const rng = Math.random();

            // 4. Regression Logic
            if (rng < 0.025 && prev > 20) {
                setStatusText("Ett oväntat fel uppstod. Återställer...");
                return Math.max(0, prev - 15);
            }

            // Show skip button after 50% if not already clicked
            if (prev > 50 && !skipTimerClickedOnce) {
                setSkipTimerButtonVisible(true);
                setStatusText("Snabbval tillgängligt: Hoppa över väntetid?");
            }

            // 5. Stall/Progress Logic
            if (rng < 0.25) return prev;

            return prev + 1;
        });
    }, 150);

    return () => clearInterval(interval);
}, [skipTimerClickedOnce]);





    //TOS

    const [ToSDone, setToSDone] = useState(false);
    const [tosOpen, setTosOpen] = useState(false);
  const tosSrc = "/Dantes%20ToS.htm";

  const QUESTION = {
    question: "Vad heter staden som skiljer de övre kretsarna och de djupare kretsarna?",
    options: ["Duh", "Diss", "Dis", "Diz"],
    correctIndex: 2,
  };
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState<null | (() => void)>(null);

  const askAreYouSure = (action: () => void) => {
    setPendingAction(() => action);
    setConfirmOpen(true);
  };

  const handleConfirmAnswer = (answer: boolean) => {
    setConfirmOpen(false);
    if (answer && pendingAction) pendingAction();
    setPendingAction(null);
  };

  const [correct, setCorrect] = useState<boolean | null>(null);

  const chooseOption = (optionIndex: number) => {
    askAreYouSure(() => {
      if (optionIndex === QUESTION.correctIndex) {
        setCorrect(true);
      } else {
        setCorrect(false);
        setTosOpen(true);
      }
    });
  };

  const handleAcceptTos = () => {
    askAreYouSure(() => setTosOpen(false));
  };

  const handleCloseTos = () => {
    askAreYouSure(() => setTosOpen(false));
  };


    //ADS

    const [ads, setAds] = useState<Array<{  x: number; y: number; w: number; src: string }>>([]);
    const [adChoises, setAdChoises] = useState([
        { name: "Ad 1", src: "/PopUpAds/AffirmYes.png" },
        { name: "Ad 2", src: "/PopUpAds/SigBeGuru.png" },
        { name: "Ad 3", src: "/PopUpAds/spelkväll5.png" },
        { name: "Ad 4", src: "/PopUpAds/StartDatingRichMenNOW.mp4" },
        { name: "Ad 5", src: "/PopUpAds/VirusDetected.png" },
        { name: "Ad 6", src: "/PopUpAds/DaTebola.png" },
        { name: "Ad 7", src: "/PopUpAds/candy.png" },
        { name: "Ad 8", src: "/PopUpAds/FORGET_YOUR_OLD_BORING_LIFE.mp4" },
        { name: "Ad 9", src: "/PopUpAds/DownloadACar.png" },
        { name: "Ad 10", src: "/PopUpAds/Want_fast_computer_1.gif" },
        { name: "Ad 11", src: "/PopUpAds/Best_Anti-Virus_found_HERE.gif" },
        { name: "Ad 12", src: "/PopUpAds/hehasbecomethelongboy.png" },
        { name: "Ad 13", src: "/PopUpAds/You_will_not_belive_what_this_goober_is_accused_of.gif" },
    ]);

    const removeAd = (indexToRemove: number) => {
    setAds((prev) => prev.filter((_, index) => index !== indexToRemove));
    };

    useEffect(() => {
    let timer: NodeJS.Timeout | undefined;

    const spawnAd = () => {
        const randomDelay = Math.floor(Math.random() * 8000) + 2000;

        timer = setTimeout(() => {
        const randomAdIndex = Math.floor(Math.random() * adChoises.length);
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;

        const w = Math.floor(Math.random() * 200) + 300;

        let y = Math.floor(Math.random() * screenHeight);
        if (screenHeight - y < 250) y = y - 250;

        setAds((prev) => [
            ...prev,
            {
            x: Math.floor(Math.random() * (screenWidth - w)),
            y,
            w,
            src: adChoises[randomAdIndex].src,
            },
        ]);

        spawnAd();
        }, randomDelay);
    };

    spawnAd();
    return () => clearTimeout(timer);
    }, []);

    
    return (
        <div className="relative bg-black w-screen h-screen flex items-center justify-center flex-col overflow-hidden">
            <h1 className="text-white text-3xl">Välkommen till det sjätte lagret av Albins inferno!</h1>
            {ads.map((ad, index) => (
                <PopUpAd
                    key={index}
                    x={ad.x}
                    y={ad.y}
                    w={ad.w}
                    src={ad.src}
                    onClose={() => removeAd(index)}
                />
            ))}
            {!completed && ( <div className="w-full flex items-center justify-center flex-col">
            <h2 className="text-white text-xl mt-2">The Captcha is loading please wait...</h2>
            <p className="text-xs text-zinc-500 italic animate-pulse">{statusText}</p>
            <div className="w-1/2 h-8 bg-gray-900 border-2 border-zinc-700 relative overflow-hidden">
                {/* The Actual Bar */}
                <div 
                className="h-full bg-red-600 transition-all duration-500 ease-in-out"
                style={{ width: `${progress}%` }}
                />
                
                {/* Subtle "Glitch" overlay */}
                <div className="absolute inset-0 bg-white/5 mix-blend-overlay animate-pulse pointer-events-none" />
            </div>
            {skipTimerButtonVisible && (
                <button className="mt-4 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={handleSkipLoading}>Skip Loading</button>
            )}
            <p className="text-white font-mono">{progress}%</p>
            
            </div>)}
            {completed && (
                <div className="flex flex-col items-center gap-4 mt-6">
                    <h2 className="text-green-500 text-2xl">Captcha Completed!</h2>
                    {completed && (
                        <div className="border border-zinc-700 rounded p-4 mt-6 bg-zinc-900/60 w-full max-w-md">
                            <h2 className="text-xl text-white mb-1">Du läste välan ToS?</h2>
                            <p className="font-medium text-white">{QUESTION.question}</p>
                            {}
                            <div className="mt-3 grid gap-2">
                                {QUESTION.options.map((opt, oi) => {
                                    const base =
                                        "w-full text-left px-3 py-2 rounded border transition text-white";
                                    const cls =
                                    correct === true
                                        ? `${base} border-green-400 bg-green-500/20`
                                        : correct === false
                                        ? `${base} border-red-400 bg-red-500/20`
                                        : `${base} border-zinc-700 hover:border-zinc-400`;
                            return (
                                    <button 
                                        key={oi} 
                                        onClick={() => chooseOption(oi)} 
                                        className={cls}
                                    >
                                        {opt}
                                    </button>
                                )})}
                            </div>
                        </div>
                    )}
                </div>
            )}

        {correct && (
            <div className="mt-6 flex justify-end">
              <button
                onClick={() =>
                  askAreYouSure(() => {
                    router.push("/Chaoslayers/seventhlayer");
                  })
                }
                className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded"
              >
                Nästa sida
              </button>
            </div>
          )}
            <ToSModal
                open={tosOpen}
                onClose={handleCloseTos}
                onAccept={handleAcceptTos}
                src={tosSrc}
                variant="wrong"
            />
            <ConfirmModal open={confirmOpen} onAnswer={handleConfirmAnswer} />
        </div>
    );
}   