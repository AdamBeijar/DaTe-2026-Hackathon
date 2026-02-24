"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import PopUpAd from "../../Components/PopUpAd";
import ToSModal from "@/app/Components/ToSModal";
import ConfirmModal from "@/app/Components/ConfirmModal";

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz 1234567890!@#$%^&*()_+-=[]{}|;':,.<>/?`~";

export default function NinethLayer() {
    const router = useRouter();

    const [password, setPassword] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const [timeLeft, setTimeLeft] = useState(60);
    const [isLocked, setIsLocked] = useState(true);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [selectedInput, setSelectedInput] = useState("");
    const [wrongPasswordText, setWrongPasswordText] = useState(false);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [pendingAction, setPendingAction] = useState<(() => void) | null>(null);



    const askAreYouSure = (action: () => void) => {
    setPendingAction(() => action);
    setConfirmOpen(true);
  };

  const handleConfirmAnswer = (answer: boolean) => {
    setConfirmOpen(false);
    if (answer && pendingAction) pendingAction();
    setPendingAction(null);
  };

    useEffect(() => {
    const savedPassword = localStorage.getItem("password");
    if (savedPassword) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setOldPassword(savedPassword);
    }
}, []);

    useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
        // Specifically catch Space and Backspace
        if (event.key === " " || event.code === "Space" || event.key === "Backspace") {
            // This stops the browser from "clicking" the focused button
            event.preventDefault(); 
            
            if (event.key === " " || event.code === "Space") {
                const randomIndex = Math.floor(Math.random() * alphabet.length);
                const randomLetter = alphabet[randomIndex];
                setPassword((prev) => prev + randomLetter);
            }

            if (event.key === "Backspace") {
                setPassword((prev) => prev.slice(0, -1));
            }
        }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
}, [selectedInput]); // selectedInput is fine here, but also ensure 'alphabet' is outside or in the dependency

    const handleSelectedInput = (inputName: string) => {
        console.log("Selected input:", inputName);
        setSelectedInput(inputName);
    }

    // Timer Logic
    useEffect(() => {
        if (timeLeft <= 0) {
            return;
        }

        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    // Unlock when timer reaches zero
                    setIsLocked(false);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft]);

    // Calculate width for the loading bar
    const progressWidth = (timeLeft / 60) * 100;

    const handleSignUp = () => {
        if (isLocked) {
            askAreYouSure(() => {
                setWrongPasswordText(true);
                setPassword("");
            });
            return;
        }
        if (password.length === oldPassword.length) {
            setIsConfirmOpen(true);
        } else {
            askAreYouSure(() => {
                setWrongPasswordText(true);
                setPassword("");
            });
        }
    };

    // Removed useEffect for setting oldPassword, as it's now initialized directly in useState

    const executeSignUp = () => {
        setIsConfirmOpen(false);
        if (isLocked) {
            alert(`Åtkomst nekad! Systemet rensas om ${timeLeft} sekunder.`);
            setPassword("");
            return;
        }

        if (password.length === oldPassword.length) {
            router.push("/Chaoslayers/tenthlayer");
        } else {
            alert("Fel! Försök igen.");
            setPassword("");
        }
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
        <div className="relative bg-red-700 w-screen h-screen flex items-center justify-center flex-col overflow-hidden">
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
            <h1 className="text-white text-3xl font-bold">Välkommen till det nionde lagret av Albins inferno, Förräderiets krets!</h1>
            <h3 className="text-white text-center mt-4">
                Hoppas du kommer ihåg ditt lösenord från det förra lagret för nu måste du skriva in det igen. Och det bör hända snabbt, för varje sekund som går så närmar du dig att måsta göra om hela processen för att skapa ett konto!
                <br />
                Försök att inte bli stressad, det är bara att skriva in ditt lösenord :)
            </h3>
            <div className="text-white mt-4">SKRIV IN DITT LÖSENORD IGEN INOM TIMERN ELLER GÅ TILLBAKS TILL BÖRJAN</div>
            {/* Loading Bar Container */}
            <div className="w-1/2 bg-zinc-900 border border-zinc-700 rounded-full overflow-hidden relative mt-4 h-10">
                {/* The Progress Fill */}
                <div 
                    className="h-full bg-red-600 transition-all duration-1000 ease-linear text-2xl"
                    style={{ width: `${progressWidth}%` }}
                />
                {/* Centered Timer Text */}
                <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white uppercase tracking-widest">
                    {isLocked ? timeLeft + " s" : "Så känns det om man förreder folk"}
                </span>
            </div>

            <input 
                type="password" 
                value={password}
                readOnly 
                placeholder="Ange ditt lösenord igen"
                className="bg-zinc-800 text-white p-3 rounded border border-zinc-600 w-1/2 text-center focus:outline-none focus:border-red-500 mt-4"
                onClick={() => handleSelectedInput("password")}
            />

            <button 
                className={`bg-green-500 text-white px-4 py-2 hover:bg-green-600 rounded-xl m-2 font-bold`}
                onClick={handleSignUp}
            >
                Skapa konto 
            </button>

            {wrongPasswordText && <div className="text-red-500 bg-zinc-900 p-2 mt-4 rounded border border-white">{"FEL LÖSENORD, menade du \"" + oldPassword + "\"?"}</div>}

            {isConfirmOpen && (
                <ConfirmModal 
                    open={isConfirmOpen}
                    onAnswer={(answer: boolean) => {
                        if (answer) {
                            executeSignUp();
                        } else {
                            setIsConfirmOpen(false);
                        }
                    }} 
                />
            )}
            <ConfirmModal open={confirmOpen} onAnswer={handleConfirmAnswer} />
        </div>
    );
}