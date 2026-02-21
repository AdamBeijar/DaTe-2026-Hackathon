"use client";

import Image from "next/image";

import { useState } from "react";
import ConfirmModal from "@/Components/ConfirmModal";

export default function PopUpAd({ x, y, w, src, onClose }) {
    const [ConfirmIsOpen, setConfirmIsOpen] = useState(false);

    const handleFinalClose = () => {
        setConfirmIsOpen(false);
        onClose(); // This calls the removeAd function in the parent
    };

    return (
        <div className="absolute z-50" style={{ left: `${x}px`, top: `${y}px`, width: `${w}px` }}>
            <div className="bg-white p-4 rounded shadow-lg">
                <div className="flex justify-between items-start">
                    <h2 className="text-lg font-bold">Special Offer!</h2>
                    
                    {/* Trigger the modal first */}
                    <button 
                        className="bg-red-500 text-white px-2 py-1 text-xs rounded" 
                        onClick={() => setConfirmIsOpen(true)}
                    >
                        X
                    </button>

                    {/* If they confirm in the modal, close the whole ad */}
                    {ConfirmIsOpen && (
                        <ConfirmModal 
                            open={ConfirmIsOpen} 
                            onAnswer={(confirmed) => {
                                if (confirmed) {
                                    handleFinalClose();
                                } else {
                                    setConfirmIsOpen(false);
                                }
                            }} 
                        />
                    )}
                </div>
        <div className="relative flex-1 w-full mt-2 h-fit">
            { src.endsWith(".mp4") ? (
                <video 
                    src={src}
                    autoPlay
                    loop
                    muted
                    className="w-full h-fit object-contain"
                />
            ) : (
                <Image 
                    src={src} 
                    alt="Ad Image" 
                    width={w} 
                    height={400} // Give it a base height
                    className="w-full h-auto object-contain" 
                />
            )}
        </div>
    </div>
</div>
    );
}
