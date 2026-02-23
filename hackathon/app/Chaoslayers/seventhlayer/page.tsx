"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import PopUpAd from "../../Components/PopUpAd";
import ConfirmModal from "@/app/Components/ConfirmModal";
import ToSModal from "@/app/Components/ToSModal";

type Ad = { x: number; y: number; w: number; src: string };
type Step = "privacy" | "tosQuestion";

export default function SeventhLayer() {
  const router = useRouter();

  const [ads, setAds] = useState<Ad[]>([]);
  const adChoises = useMemo(
    () => [
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
    ],
    []
  );

  const removeAd = (indexToRemove: number) => {
    setAds((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  useEffect(() => {
    let timer: any;

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
  }, [adChoises]);

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

  const [step, setStep] = useState<Step>("privacy");


  const [tosOpen, setTosOpen] = useState(false);
  const tosSrc = "/Dantes%20ToS.htm";

  const handleCloseTos = () => {
    askAreYouSure(() => setTosOpen(false));
  };

  const handleAcceptTos = () => {
    askAreYouSure(() => setTosOpen(false));
  };


  const [noPos, setNoPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const noBtnRef = useRef<HTMLButtonElement | null>(null);
  const yesBtnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const placeNearYes = () => {
      const yes = yesBtnRef.current;
      if (!yes) return;
      const r = yes.getBoundingClientRect();
      setNoPos({ x: Math.round(r.right + 16), y: Math.round(r.top) });
    };

    const t = setTimeout(placeNearYes, 0);
    window.addEventListener("resize", placeNearYes);
    return () => {
      clearTimeout(t);
      window.removeEventListener("resize", placeNearYes);
    };
  }, []);

  const moveNoButtonSomewhereAnnoying = () => {
    const w = window.innerWidth;
    const h = window.innerHeight;

    const btnW = 160;
    const btnH = 56;
    const margin = 40;

    const x = Math.floor(Math.random() * (w - btnW - margin * 2)) + margin;
    const y = Math.floor(Math.random() * (h - btnH - margin * 2)) + margin;

    setNoPos({ x, y });
  };

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const btn = noBtnRef.current;
      if (!btn) return;

      const invX = window.innerWidth - e.clientX;
      const invY = window.innerHeight - e.clientY;

      const r = btn.getBoundingClientRect();
      const hit = invX >= r.left && invX <= r.right && invY >= r.top && invY <= r.bottom;

      if (hit) moveNoButtonSomewhereAnnoying();
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  const onYesPrivacy = () => {
    askAreYouSure(() => {
      setStep("tosQuestion");
    });
  };

  const onNoPrivacy = () => {
    askAreYouSure(() => {
      setStep("tosQuestion");
    });
  };

 
  const TOS_QUESTION = "Vem skrev Dantes Inferno?";
  const OPTIONS = ["Shakespear", "J.R.R Tolkien", "John Inferno", "Dante Alighieri"];
  const correctIndex = 3;

  const [answeredCorrect, setAnsweredCorrect] = useState(false);

  const [danteMovesLeft, setDanteMovesLeft] = useState(5);
  const [dantePos, setDantePos] = useState<{ x: number; y: number } | null>(null);
  const danteRef = useRef<HTMLButtonElement | null>(null);

  const moveDanteButton = () => {
    const w = window.innerWidth;
    const h = window.innerHeight;

    const btnW = 260;
    const btnH = 46;
    const margin = 40;

    const x = Math.floor(Math.random() * (w - btnW - margin * 2)) + margin;
    const y = Math.floor(Math.random() * (h - btnH - margin * 2)) + margin;

    setDantePos({ x, y });
  };

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      if (step !== "tosQuestion") return;
      if (answeredCorrect) return;
      if (danteMovesLeft <= 0) return;

      const btn = danteRef.current;
      if (!btn) return;

      const invX = window.innerWidth - e.clientX;
      const invY = window.innerHeight - e.clientY;

      const r = btn.getBoundingClientRect();
      const hit = invX >= r.left && invX <= r.right && invY >= r.top && invY <= r.bottom;

      if (hit) {
        setDanteMovesLeft((prev) => {
          if (prev <= 0) return 0;
          moveDanteButton();
          return prev - 1;
        });
      }
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [step, answeredCorrect, danteMovesLeft]);

  const chooseOption = (idx: number) => {
    askAreYouSure(() => {
      // fel svar -> ToS öppnas
      if (idx !== correctIndex) {
        setTosOpen(true);
        return;
      }

      if (danteMovesLeft > 0) {
        moveDanteButton();
        setDanteMovesLeft((prev) => Math.max(0, prev - 1));
        return;
      }

      setAnsweredCorrect(true);
    });
  };

  return (
    <div className="relative bg-black w-screen h-screen flex items-center justify-center flex-col overflow-hidden">
      <h1 className="text-white text-3xl">Välkommen till det sjunde lagret av Albins inferno!</h1>

      {/* Ads */}
      {ads.map((ad, index) => (
        <PopUpAd key={index} x={ad.x} y={ad.y} w={ad.w} src={ad.src} onClose={() => removeAd(index)} />
      ))}

      {/* Privacy step */}
      {step === "privacy" && (
        <div className="mt-8 border border-zinc-700 rounded p-5 bg-zinc-900/60 w-full max-w-xl">
          <h2 className="text-xl text-white mb-2">Integritetsfråga</h2>
          <p className="text-white font-medium">
            Får vi sälja din personliga information till{" "}
            <span className="text-red-400">Ondskefulla fabriken</span>?
          </p>

          <div className="mt-5 flex gap-3">
            <button
              ref={yesBtnRef}
              onClick={onYesPrivacy}
              className="bg-green-700 hover:bg-green-600 text-white px-5 py-3 rounded font-semibold"
            >
              Ja
            </button>
          </div>

          <button
            ref={noBtnRef}
            onClick={onNoPrivacy}
            onMouseEnter={() => {
              localStorage.setItem("curse_mouse_inverted", "1");
              window.dispatchEvent(new StorageEvent("storage", { key: "curse_mouse_inverted" }));

              moveNoButtonSomewhereAnnoying();
            }}
            onMouseMove={() => moveNoButtonSomewhereAnnoying()}
            className="bg-red-700 hover:bg-red-600 text-white px-5 py-3 rounded font-semibold"
            style={{ position: "fixed", left: noPos.x, top: noPos.y, zIndex: 30 }}
          >
            Nej
          </button>

          <p className="text-xs text-zinc-400 mt-4 italic">
            Fabriken är helt galet ondskefull och elak, och kommer sälja all din information för att främja deras tillväxt.
          </p>
        </div>
      )}

      {/* ToS question step */}
      {step === "tosQuestion" && (
        <div className="mt-8 border border-zinc-700 rounded p-5 bg-zinc-900/60 w-full max-w-xl">
          <h2 className="text-xl text-white mb-2">Du läste väl ToS?</h2>
          <p className="text-white font-medium">{TOS_QUESTION}</p>

          <p className="text-xs text-zinc-400 mt-1 italic">
            (Du har {danteMovesLeft+1} försök på dig.)
          </p>

          <div className="mt-4 grid gap-2">
            {OPTIONS.map((opt, idx) => {
              const base = "w-full text-left px-3 py-2 rounded border transition text-white";
              const cls = answeredCorrect
                ? `${base} border-green-400 bg-green-500/20`
                : `${base} border-zinc-700 hover:border-zinc-400`;

              if (idx === correctIndex) {
                const style =
                  dantePos
                    ? { position: "fixed" as const, left: dantePos.x, top: dantePos.y, zIndex: 40, width: 260 }
                    : undefined;

                return (
                  <button
                    key={idx}
                    ref={danteRef}
                    onClick={() => chooseOption(idx)}
                    className={cls}
                    style={style}
                  >
                    {opt}
                  </button>
                );
              }

              return (
                <button key={idx} onClick={() => chooseOption(idx)} className={cls}>
                  {opt}
                </button>
              );
            })}
          </div>

          {answeredCorrect && (
            <div className="mt-6 flex justify-end">
              <button
                onClick={() =>
                  askAreYouSure(() => {
                    router.push("/eighthlayer");
                  })
                }
                className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded"
              >
                Nästa sida
              </button>
            </div>
          )}
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