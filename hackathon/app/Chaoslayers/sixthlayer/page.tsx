"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import PopUpAd from "../../Components/PopUpAd";
import ConfirmModal from "@/app/Components/ConfirmModal";
import ToSModal from "@/app/Components/ToSModal";


export default function SixthLayer() {
    const router = useRouter();




    //TOS

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
            <h2 className="text-white text-xl mt-2">The Captcha is loading please wait...</h2>
            <div className="w-1/2 h-8 bg-gray-700 mt-4">
                <div className="h-full bg-green-500 animate-loading" style={{ animationDuration: "10s" }}></div>
            </div>
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
        </div>
    );
}   