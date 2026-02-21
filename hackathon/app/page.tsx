"use client";

import { useState, useEffect, use } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [selectedInput, setSelectedInput] = useState("");

  const aplhabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz 1234567890!@#$%^&*()_+-=[]{}|;':,.<>/?`~";

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      event.preventDefault();
      if (event.key === " " || event.code === "Space") {
        const randomIndex = Math.floor(Math.random() * aplhabet.length);
        const randomLetter = aplhabet[randomIndex];
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
  }, [selectedInput]);

  const handleSelectedInput = (inputName: string) => {
    console.log("Selected input:", inputName);
    setSelectedInput(inputName);
  }

  return (
    <div className="bg-black w-screen h-screen flex items-center justify-center">
      <nav className="absolute top-0 left-0 w-full p-4 flex gap-4">
        <Image src="/Albin-logo.png" alt="Logo" width={40} height={40} className="" />
      </nav>
      <div className="relative z-10 text-black max-w-[90vw] py-[4em] px-[4.5em] text-center shadow-[0_0_20px_0_rgba(255,255,255,0.5),0_5px_5px_0_rgba(200,200,200,0.12)] bg-white">
  
  <h2 className="text-2xl mb-4 font-['Josefin_Sans',sans-serif]">Login</h2>
  
  <form method="post" className="block mt-0 ">
    <p className="block my-4 text-left">
      <label htmlFor="id_username" className="block mb-1 w-full text-center font-['Josefin_Sans',sans-serif]">Användarnamn:</label>
      <input 
        type="text" 
        name="username" 
        id="id_username"
        required
        className="w-full outline-0 bg-gray-200 border-0 mb-3.75 p-3.75 box-border"
      />
    </p>

    <p className="block my-4 text-left">
      <label htmlFor="id_password" className="block mb-1 w-full text-center font-['Josefin_Sans',sans-serif]">Lösenord:</label>
      <input 
        type="password" 
        name="password" 
        id="id_password"
        required
        className="w-full outline-0 bg-gray-200 border-0 mb-3.75 p-3.75 box-border"
      />
    </p>

<button 
  type="submit"
  className="
    font-['Josefin_Sans',sans-serif] 
    uppercase 
    outline-0 
    bg-[#4CAF50] 
    w-full 
    border-0 
    p-3.75 
    text-white
    text-[14px] 
    transition-all 
    duration-300 
    ease-in-out 
    cursor-pointer
    hover:opacity-90
  "
>
  Login
</button>
  </form>

  <div className="mt-4">
    <a href="#" className="inline-block no-underline cursor-pointer font-['Josefin_Sans',sans-serif]">
      <p className="m-0 mb-4">Glömt lösenordet?</p>
    </a>
    <br />
    <Link href="/secondlayer" className="inline-block no-underline cursor-pointer font-['Josefin_Sans',sans-serif]">
      <p className="m-0">Registrera dig</p>
    </Link>
  </div>
</div>
    </div>
  );
}
