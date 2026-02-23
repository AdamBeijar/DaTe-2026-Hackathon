"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import PopUpAd from "../../Components/PopUpAd";
import ToSModal from "@/app/Components/ToSModal";
import ConfirmModal from "@/app/Components/ConfirmModal";



export default function NinethLayer() {
    const router = useRouter();

    const [password, setPassword] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const [timeLeft, setTimeLeft] = useState(60);
    const [isLocked, setIsLocked] = useState(true);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [selectedInput, setSelectedInput] = useState("");
    const [wrongPasswordText, setWrongPasswordText] = useState(false);

    const aplhabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz 1234567890!@#$%^&*()_+-=[]{}|;':,.<>/?`~";

    useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
        // Specifically catch Space and Backspace
        if (event.key === " " || event.code === "Space" || event.key === "Backspace") {
            // This stops the browser from "clicking" the focused button
            event.preventDefault(); 
            
            if (event.key === " " || event.code === "Space") {
                const randomIndex = Math.floor(Math.random() * aplhabet.length);
                const randomLetter = aplhabet[randomIndex];
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
            setIsLocked(false);
            return;
        }

        const timer = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft]);

    // Calculate width for the loading bar
    const progressWidth = (timeLeft / 60) * 100;

    const handleSignUp = () => {
        if (isLocked) {
            setWrongPasswordText(true);
            return;
        }
        if (password.length === oldPassword.length) {
            setIsConfirmOpen(true);
        } else {
            setWrongPasswordText(true);
        }
    };

    useEffect(() => {
        const storedPassword = localStorage.getItem("password") || "";
        setOldPassword(storedPassword);
    }, []);

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

    return (
        <div className="bg-black w-screen h-screen flex flex-col items-center justify-center gap-6">
            <h1 className="text-white text-3xl font-bold italic">Nionde Lagret</h1>
            <div className="text-white">SKRIV IN DITT LÖSENORD IGEN INOM TIMERN ELLER GÅ TILLBAKS TILL BÖRJAN</div>
            {/* Loading Bar Container */}
            <div className="w-1/2 h-6 bg-zinc-900 border border-zinc-700 rounded-full overflow-hidden relative">
                {/* The Progress Fill */}
                <div 
                    className="h-full bg-red-600 transition-all duration-1000 ease-linear"
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
                className="bg-zinc-800 text-white p-3 rounded border border-zinc-600 w-1/2 text-center focus:outline-none focus:border-red-500"
                onClick={() => handleSelectedInput("password")}
            />

            <button 
                className={`font-bold py-3 px-8 rounded transition-colors ${
                    'bg-red-600 hover:bg-red-700 text-white'
                }`}
                onClick={handleSignUp}
            >
                Skapa konto 
            </button>

            {wrongPasswordText && <div className="text-red-500">{"FEL LÖSENORD, menade du \"" + oldPassword + "\"?"}</div>}

            {isConfirmOpen && (
                <ConfirmModal 
                    open={isConfirmOpen}
                    onAnswer={(answer) => {
                        if (answer) {
                            executeSignUp();
                        } else {
                            setIsConfirmOpen(false);
                        }
                    }} 
                />
            )}
        </div>
    );
}