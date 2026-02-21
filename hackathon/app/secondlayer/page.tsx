"use client";

import ConfirmModal from "@/Components/ConfirmModal";
import { use, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SecondLayer() {
    const router = useRouter();
    const [isOpenNo, setIsOpenNo] = useState(false);
    const [isOpenAccount, setIsOpenAccount] = useState(false);
    const [isOpenDate, setIsOpenDate] = useState(false);
    const [isOpenOver18, setIsOpenOver18] = useState(false);
    const [isOpenEnd, setIsOpenEnd] = useState(false);

    const handleAnswer = (answer: boolean, question: string) => {
        console.log(`User answered ${answer ? "YES" : "NO"} to ${question}`);
        console.log("Current answers state:", answers);
        if (answer) {
            console.log(`User answered YES to ${question}`);
            setIsOpenNo(false);
            setIsOpenAccount(false);
            setIsOpenDate(false);
            setIsOpenOver18(false);
            if (question === "createAccount" || question === "dateMember" || question === "over18") {
                setAnswers((prev) => ({ ...prev, [question]: answer }));
            }
        }
    }

    const handleEndingAnswer = (answer: boolean) => {
        console.log(`User answered ${answer ? "YES" : "NO"} to ending question`);
        if (answer) {
            router.push("/thirdlayer");
        }
    }

    const [answers, setAnswers] = useState({
        createAccount: null,
        dateMember: null,
        over18: null,
    });

    const [allTrue, setAllTrue] = useState(false);

    useEffect(() => {
        if (answers.createAccount === true && answers.dateMember === true && answers.over18 === true) {
            setAllTrue(true);
            console.log("All answers are true!");
        } else {
            setAllTrue(false);
        }
    }, [answers]);
    
    return (
        <div className="bg-black w-screen h-screen flex items-center justify-center flex-col gap-4">
            <h1 className="text-white text-3xl">Välkommen till andra lagret av Albins inferno!</h1>
            < br />
            <div className="flex gap-2">
                <div className="text-white">Vill du skapa ett konto?</div>
                <button 
                    onClick={() => setIsOpenAccount(!isOpenAccount)}
                    className="bg-blue-500 text-white px-4 py-2 hover:bg-blue-600"
                >Ja</button>
                {isOpenAccount && ConfirmModal({ open: isOpenAccount, onAnswer: (answer) => handleAnswer(answer, "createAccount") })}
                <button
                    onClick={() => setIsOpenNo(!isOpenNo)}
                    className="bg-red-500 text-white px-4 py-2 hover:bg-red-600"
                >Nej</button>
                {isOpenNo && ConfirmModal({ open: isOpenNo, onAnswer: (answer) => handleAnswer(answer, "createAccount") })}
            </div>
            <div className="flex gap-2">
                <div className="text-white">Är du DaTe medlem?</div>
                <button 
                    onClick={() => setIsOpenDate(!isOpenDate)}
                    className="bg-blue-500 text-white px-4 py-2 hover:bg-blue-600"
                >Ja</button>
                {isOpenDate && ConfirmModal({ open: isOpenDate, onAnswer: (answer) => handleAnswer(answer, "dateMember") })}
                <button
                    onClick={() => setIsOpenNo(!isOpenNo)}
                    className="bg-red-500 text-white px-4 py-2 hover:bg-red-600"
                >Nej</button>
                {isOpenNo && ConfirmModal({ open: isOpenNo, onAnswer: (answer) => handleAnswer(answer, "dateMember") })}
            </div>
            <div className="flex gap-2">
                <div className="text-white">Är du över 18?</div>
                <button 
                        onClick={() => setIsOpenOver18(!isOpenOver18)}
                    className="bg-blue-500 text-white px-4 py-2 hover:bg-blue-600"
                >Ja</button>
                {isOpenOver18 && ConfirmModal({ open: isOpenOver18, onAnswer: (answer) => handleAnswer(answer, "over18") })}
                <button
                    onClick={() => setIsOpenNo(!isOpenNo)}
                        className="bg-red-500 text-white px-4 py-2 hover:bg-red-600"
                >Nej</button>
                {isOpenNo && ConfirmModal({ open: isOpenNo, onAnswer: (answer) => handleAnswer(answer, "over18") })}
            </div>
            {allTrue && <button className="bg-green-500 text-white px-4 py-2 hover:bg-green-600" onClick={() => setIsOpenEnd(true)}>Gå vidare</button>}
            {isOpenEnd && ConfirmModal({ open: isOpenEnd, onAnswer: (answer) => handleEndingAnswer(answer) })}

        </div>
    );
}