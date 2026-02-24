"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import PopUpAd from "../../Components/PopUpAd";
import ConfirmModal from "@/app/Components/ConfirmModal";
import ToSModal from "@/app/Components/ToSModal";

type Step = "question" | "captcha";

export default function FifthLayer() {
    const router = useRouter();
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

    useEffect(() => {
        localStorage.setItem("curse_mouse_inverted", "0");
    }, []);

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

  const QUESTION = {
    question: "Vad heter det träsk eller den flod som utgör den femte kretsen?",
    options: ["Slit", "Mute", "Donau", "Styx"],
    correctIndex: 3,
  };

  const CAPTCHA_IMG = "/albin-logo.png"; 

  const [step, setStep] = useState<Step>("question");


  const [tosOpen, setTosOpen] = useState(false);
  const tosSrc = "/Dantes%20ToS.htm";

  
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


  const [captchaTiles, setCaptchaTiles] = useState<boolean[]>(Array(9).fill(false));
  const captchaDone = captchaTiles.every(Boolean);


  const chooseOption = (optionIndex: number) => {
    askAreYouSure(() => {
      if (optionIndex === QUESTION.correctIndex) {
        setCorrect(true);
        setStep("captcha");
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


  const clickCaptchaTile = (tileIndex: number) => {
    askAreYouSure(() => {
      setCaptchaTiles((prev) => {
        const copy = [...prev];
        copy[tileIndex] = !copy[tileIndex];
        return copy;
      });
    });
  };

  return (
    <div className="relative bg-black w-screen h-screen flex items-center justify-center flex-col overflow-hidden">
        <h1 className="text-white text-4xl">
            Välkommen till det femte lagret av Albins inferno, Vredens krets!
        </h1>
       
        <h3 className="text-lg text-zinc-300 text-center">
        Eftersom du har levt ett girigt liv på internetet så kommer du nu att plågas av oändliga pop-up annonser som du måste klicka bort innan du kan gå vidare! 
        <br />
        Dessutom så måste du svara rätt på vår fråga och klara vår captcha för att kunna gå vidare, lycka till!</h3>

      {/* Ads */}
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

      {step === "question" && (
        <div className="border border-zinc-700 rounded p-4 mt-6 bg-gray-900">
          <h2 className="text-xl text-white mb-1">Du läste välan ToS?</h2>
          <p className="font-medium text-white">{QUESTION.question}</p>

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
                <button key={oi} onClick={() => chooseOption(oi)} className={cls}>
                  {opt}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {step === "captcha" && (
        <div className="mt-6 w-full max-w-xl border border-zinc-700 rounded p-4 bg-zinc-900/60">
          <h2 className="text-white text-xl font-semibold">
            Verifiera att du är en människa. Klicka på alla rutor som innehåller Albin.
          </h2>

          <div className="mt-4 grid grid-cols-3 gap-2">
            {captchaTiles.map((clicked, i) => (
              <button
                key={i}
                onClick={() => clickCaptchaTile(i)}
                className="relative aspect-square rounded border border-zinc-600 overflow-hidden hover:border-zinc-300"
              >
                <img
                  src={CAPTCHA_IMG}
                  alt="captcha"
                  className="absolute inset-0 w-full h-full object-cover"
                />

                {clicked && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                    <span className="text-red-500 text-6xl font-black">
                      X
                    </span>
                  </div>
                )}
              </button>
            ))}
          </div>

          {captchaDone && (
            <div className="mt-6 flex justify-end">
              <button
                onClick={() =>
                  askAreYouSure(() => {
                    router.push("/Chaoslayers/sixthlayer");
                  })
                }
                className="bg-green-500 text-white px-4 py-2 hover:bg-green-600 rounded-xl m-6"
              >
                Gå vidare 
              </button>
            </div>
          )}
        </div>
      )}

      <ConfirmModal open={confirmOpen} onAnswer={handleConfirmAnswer} />

      <ToSModal
        open={tosOpen}
        onClose={handleCloseTos}
        onAccept={handleAcceptTos}
        src={tosSrc}
        variant={"wrong"}
      />
    </div>
  );
}