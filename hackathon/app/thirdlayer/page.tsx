"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import ConfirmModal from "../Components/ConfirmModal";
import ToSModal from "../Components/ToSModal";

type Step = "welcome" | "quiz";

type Question = {
  question: string;
  options: string[];
  correctIndex: number;
};

const QUESTIONS: Question[] = [
  {
    question: "När pulicerades Dantes Inferno?",
    options: ["1302", "1321", "1344", "1371"],
    correctIndex: 1,
  },
  {
    question: "Vem är det som agerar som Dantes vägledare genom helvetet?",
    options: ["Lucifer", "Beatrice", "Vergilius", "Charon"],
    correctIndex: 2,
  },
  {
    question: "Vem vaktar ingången till sjunde kretsen?",
    options: ["Cerberus", "Geryon", "Pluto", "Minotaur"],
    correctIndex: 3,
  },
];

const TOS_INITIAL_SRC = "/TERMS%20OF%20SERVICE%20SHORT.htm";
const TOS_WRONG_SRC = "/Dantes%20ToS.htm";

export default function ThirdLayer() {
  const router = useRouter();

  const [step, setStep] = useState<Step>("welcome");

  const [tosOpen, setTosOpen] = useState(false);
  const [tosSrc, setTosSrc] = useState<string>(TOS_INITIAL_SRC);

  const [tosVariant, setTosVariant] = useState<"initial" | "wrong">("initial");

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState<null | (() => void)>(null);

  const [answers, setAnswers] = useState<number[]>(
    Array(QUESTIONS.length).fill(-1)
  );

  const askAreYouSure = (action: () => void) => {
    setPendingAction(() => action);
    setConfirmOpen(true);
  };

  const handleConfirmAnswer = (answer: boolean) => {
    setConfirmOpen(false);

    if (answer && pendingAction) pendingAction();
    setPendingAction(null);
  };

  const openInitialTos = () => {
    setTosVariant("initial");
    setTosSrc(TOS_INITIAL_SRC);
    setTosOpen(true);
  };

  const handleAcceptTos = () => {
    askAreYouSure(() => {
      setTosOpen(false);

      if (tosVariant === "initial") {
        setStep("quiz");
      }
    });
  };

  const chooseOption = (qIndex: number, optionIndex: number) => {
    askAreYouSure(() => {
      setAnswers((prev) => {
        const copy = [...prev];
        copy[qIndex] = optionIndex;
        return copy;
      });

      const correct = QUESTIONS[qIndex].correctIndex;
      if (optionIndex !== correct) {
        
        setTosVariant("wrong");
        setTosSrc(TOS_WRONG_SRC);
        setTosOpen(true);
      }
    });
  };

  const allAnswered = answers.every((a) => a !== -1);
  const allCorrect =
    allAnswered && answers.every((a, i) => a === QUESTIONS[i].correctIndex);

  return (
    <div className="bg-black w-screen min-h-screen flex items-center justify-center flex-col gap-6 p-6">
      {step === "welcome" && (
        <>
          <h1 className="text-4xl text-white text-center">
            Välkommen till tredje cirkeln av Albins inferno!
          </h1>

          <button
            onClick={() => askAreYouSure(openInitialTos)}
            className="bg-blue-500 text-white px-4 py-2 hover:bg-blue-600 rounded"
          >
            Läs våra användarvillkor
          </button>
        </>
      )}

      {step === "quiz" && (
        <div className="w-full max-w-2xl bg-zinc-900 text-white rounded p-6">
          <h2 className="text-2xl font-semibold">Läste du faktiskt ToS?</h2>
          <p className="text-sm text-zinc-300 mt-1">Vi tror dig inte</p>

          <div className="mt-6 flex flex-col gap-6">
            {QUESTIONS.map((q, qi) => (
              <div key={qi} className="border border-zinc-700 rounded p-4">
                <p className="font-medium">
                  {qi + 1}. {q.question}
                </p>

                <div className="mt-3 grid gap-2">
                  {q.options.map((opt, oi) => {
                    const chosen = answers[qi] === oi;
                    const base =
                      "w-full text-left px-3 py-2 rounded border transition";
                    const cls = chosen
                      ? `${base} border-blue-400 bg-blue-500/20`
                      : `${base} border-zinc-700 hover:border-zinc-400`;

                    return (
                      <button
                        key={oi}
                        onClick={() => chooseOption(qi, oi)}
                        className={cls}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {allCorrect && (
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => router.push("/fourthlayer")}
                className="bg-green-600 hover:bg-green-500 px-4 py-2 rounded"
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
        onClose={() => setTosOpen(false)}
        onAccept={handleAcceptTos}
        src={tosSrc}
        variant={tosVariant}
      />
    </div>
  );
}