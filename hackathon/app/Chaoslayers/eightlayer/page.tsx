"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import PopUpAd from "../../Components/PopUpAd";
import ToSModal from "@/app/Components/ToSModal";
import ConfirmModal from "@/Components/ConfirmModal";

export default function EighthLayer() {

    const router = useRouter();

    const [showPassword, setShowPassword] = useState(false);
    const [selectedInput, setSelectedInput] = useState<"username" | "password" | null>(null);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSelectedInput = (inputName: "username" | "password") => {
        console.log("Selected input:", inputName);
        setSelectedInput(inputName);
    }

    const handleMovePage = () => {
        localStorage.setItem("password", password);
        router.push("/Chaoslayers/ninethlayer");
    };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {

    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz 1234567890!@#$%^&*()_+-=[]{}|;':,.<>/?`~";
      // If no input is selected, don't do anything
      if (!selectedInput) return;

      event.preventDefault();
      
      if (event.key === " " || event.code === "Space") {
        const randomIndex = Math.floor(Math.random() * alphabet.length);
        const randomLetter = alphabet[randomIndex];
        
        if (selectedInput === "username") {
          setUsername((prev) => prev + randomLetter);
        } else if (selectedInput === "password") {
          setPassword((prev) => prev + randomLetter);
        }
      }

      if (event.key === "Backspace") {
        if (selectedInput === "username") {
          setUsername((prev) => prev.slice(0, -1));
        } else if (selectedInput === "password") {
          setPassword((prev) => prev.slice(0, -1));
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // CLEANUP: This removes the old listener so they don't stack up
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedInput]); // Re-runs correctly when selection changes

    //TOS
    const [tosOpen, setTosOpen] = useState(false);
  const tosSrc = "/Dantes%20ToS.htm";

  const QUESTION = {
    question: "Hur många diken består den åttonde kretsen av totalt?",
    options: ["12", "9", "11", "10"],
    correctIndex: 3,
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
    setTosOpen(false);
  };

  const handleCloseTos = () => {
    askAreYouSure(() => setTosOpen(false));
  };

    //ADS

    const [ads, setAds] = useState([]);
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
            <h1 className="text-white text-3xl">Välkommen till det åttonde lagret av Albins inferno!</h1>
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
            <div className="flex items-center justify-center mt-6 flex-col w-1/2">
                <input type="text" id="username" className="bg-zinc-800 text-white p-2 rounded border border-zinc-700 w-1/2" placeholder="Ange ditt användarnamn" onClick={() => handleSelectedInput("username")} readOnly={true} value={username}/>
                <input type={showPassword ? "text" : "password"} id="password" className="bg-zinc-800 text-white p-2 rounded border border-zinc-700 mt-2 w-1/2" placeholder="Ange ditt lösenord" onClick={() => handleSelectedInput("password")} value={password} readOnly={true}/>
                <button className="ml-2 text-sm text-blue-500 mt-2" onClick={() => setShowPassword((prev) => !prev)}>{showPassword ? "Dölj lösenord" : "Visa lösenord"}</button>
            </div>
        <div className="border border-zinc-700 rounded p-4 mt-6 bg-zinc-900/60">
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
        {username && password && (<button
            onClick={() => askAreYouSure(() => handleMovePage())}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded mt-4"
          >
            Logga in
          </button>
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