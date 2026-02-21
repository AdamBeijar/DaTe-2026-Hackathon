"use client";

import { useEffect, useState } from "react";
import PopUpAd from "../Components/PopUpAd";
import ConfirmModal from "../Components/ConfirmModal";
import ToSModal from "../Components/ToSModal";
import { Are_You_Serious, Cossette_Texte } from "next/font/google";
import { useRouter } from "next/navigation";

export default function FourthLayer() {
    const router = useRouter();
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [ads, setAds] = useState([]);
    const [adChoises, setAdChoises] = useState([
        { name: "Ad 1", src: "/PopUpAds/AffirmYes.png" },
        { name: "Ad 2", src: "/PopUpAds/SigBeGuru.png" },
        { name: "Ad 3", src: "/PopUpAds/spelkväll5.png" },
        { name: "Ad 4", src: "/PopUpAds/StartDatingRichMenNOW.mp4" },
        { name: "Ad 5", src: "/PopUpAds/VirusDetected.png" },
        { name: "Ad 6", src: "/PopUpAds/DaTebola.png" },
    ]);
    const [answer, setAnswer] = useState<number | null>(null);
    const [correct, setCorrect] = useState<boolean | null>(null);
    const [TOSopen, setTosOpen] = useState(false);
    const [pendingAction, setPendingAction] = useState<null | (() => void)>(null);
    const [tosSrc, setTosSrc] = useState<string>("/Dantes ToS.htm");
    const [correctDropdown, setCorrectDropdown] = useState(false);

    const handleAcceptTos = () => {
    askAreYouSure(() => {
      setTosOpen(false);
    });
  };

    const QUESTION = {
        question: "Under vilken högtid utspelar sig Dantes Inferno?",
        options: ["Pinst", "Jul", "Påsk", "Alla helgons dag"],
        correctIndex: 2 
    };
    const removeAd = (indexToRemove: number) => {
        setAds((prevAds) => prevAds.filter((_, index) => index !== indexToRemove));
    };

    useEffect(() => {
    let timer: string | number | NodeJS.Timeout | undefined;

    const spawnAd = () => {
        // 1. Calculate the next random delay (2000ms to 10000ms)
        const randomDelay = Math.floor(Math.random() * 8000) + 2000;

        timer = setTimeout(() => {
            // 2. Add the new ad
            const randomAdIndex = Math.floor(Math.random() * adChoises.length);
            const screenWidth = window.innerWidth;
            const screenHeight = window.innerHeight;
            const w = Math.floor(Math.random() * 200) + 300;
            let y = Math.floor(Math.random() * (screenHeight));
            if (screenHeight - y < 250) {
                y = y - 250;
            }


            if (ads.length < 11) {
                console.log("ad length: ", ads.length);
                console.log(ads);
                setAds((prev) => [...prev, {
                    x: Math.floor(Math.random() * (screenWidth - w)),
                    y,
                    w,
                    src: adChoises[randomAdIndex].src,
                }]);
            }

            // 3. RECURSION: Start the process again for the next ad
            spawnAd();
        }, randomDelay);
    };

    // Kick off the first timer
    spawnAd();

    // Cleanup: Stop the chain reaction if user navigates away
    return () => clearTimeout(timer);
}, []);

     const handleConfirmAnswer = (answer: boolean) => {
        setConfirmOpen(false);

        if (answer && pendingAction) pendingAction();
        setPendingAction(null);
    };

    const askAreYouSure = (action: () => void) => {
        setPendingAction(() => action);
        setConfirmOpen(true);
    };

    const chooseOption = (optionIndex: number) => {
    // Wrap EVERYTHING that should happen after confirmation inside the callback
    askAreYouSure(() => {
        setAnswer(optionIndex);
        
        const correct = QUESTION.correctIndex;
        if (optionIndex !== correct) {
            setTosOpen(true); // Now this only triggers after "Yes" is clicked
        } else {
            setCorrect(true);
        }
    });
};
   
    // DROPDOWN MENU
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const dropdownOptions= [
  // The First 15 (Untouched)
  "Afghanistan", "Albania", "Algeria", "American Samoa", "Andorra", 
  "Angola", "Anguilla", "Antarctica", "Antigua and Barbuda", "Argentina", 
  "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan",

  // Scrambled Chaos starts here...
  "Heard Island and McDonald Islands", "Eritrea", "Thailand", "Germany", 
  "Zambia", "Korea (the Republic of)", "Curaçao", "Cayman Islands (the)", 
  "Malta", "French Southern Territories (the)", "Gibraltar", "Norway", 
  "Taiwan", "Paraguay", "British Indian Ocean Territory (the)", "Senegal", 
  "Slovenia", "Equatorial Guinea", "Saint Pierre and Miquelon", "Italy", 
  "Gabon", "Benin", "Palestine, State of", "Isle of Man", "South Sudan", 
  "Bhutan", "Mozambique", "Saint Kitts and Nevis", "Mexico", "Cabo Verde", 
  "Bulgaria", "Cook Islands (the)", "Mayotte", "Kiribati", "Oman", 
  "Christmas Island", "Poland", "Syrian Arab Republic", "Guadeloupe", 
  "Central African Republic (the)", "Guam", "Samoa", "Spain", "Estonia", 
  "Eswatini", "Maldives", "New Caledonia", "Seychelles", "Togo", 
  "Dominican Republic (the)", "Kuwait", "Bermuda", "United Kingdom of Great Britain and Northern Ireland (the)", 
  "Uruguay", "Mauritania", "Cameroon", "Canada", "Wallis and Futuna", 
  "Malawi", "Jordan", "Kenya", "Georgia", "Viet Nam", "Puerto Rico", 
  "Russian Federation (the)", "Botswana", "Sudan (the)", "Somalia", 
  "Saint Barthélemy", "Cocos (Keeling) Islands (the)", "Fiji", "Pakistan", 
  "Ecuador", "French Polynesia", "Montserrat", "Dominica", "Mali", 
  "Saudi Arabia", "Nauru", "Burkina Faso", "Monaco", "Gambia (the)", 
  "Jersey", "Belize", "Colombia", "Guernsey", "Turks and Caicos Islands (the)", 
  "Saint Helena, Ascension and Tristan da Cunha", "Kyrgyzstan", "Comoros (the)", 
  "Niger (the)", "Tokelau", "Ghana", "Réunion", "Vanuatu", "Sierra Leone", 
  "Iraq", "Bolivia (Plurinational State of)", "Sint Maarten (Dutch part)", 
  "Portugal", "San Marino", "Chad", "Namibia", "Sweden", "Iceland", 
  "Solomon Islands", "Bonaire, Sint Eustatius and Saba", "Singapore", 
  "Svalbard and Jan Mayen", "Japan", "Grenada", "Tunisia", "Congo (the)", 
  "Guinea", "Brunei Darussalam", "Turkmenistan", "United States of America (the)", 
  "Guyana", "Tanzania, United Republic of", "Lao People's Democratic Republic (the)", 
  "Yemen", "Mauritius", "Greece", "Panama", "Hong Kong", "Madagascar", 
  "Libya", "Honduras", "French Guiana", "Croatia", "Jamaica", "Bahamas (the)", 
  "Brazil", "Costa Rica", "Barbados", "Slovakia", "Hungary", "Niue", 
  "Korea (the Democratic People's Republic of)", "New Zealand", "Malaysian", 
  "Palau", "United Arab Emirates (the)", "Nicaragua", "Haiti", "Qatar", 
  "Timor-Leste", "Saint Vincent and the Grenadines", "Lithuania", "Romania", 
  "Montenegro", "Martinique", "Moldova (the Republic of)", "Burundi", 
  "Macao", "Peru", "Uzbekistan", "El Salvador", "Indonesia", "Luxembourg", 
  "Congo (the Democratic Republic of the)", "Rwanda", "Western Sahara", 
  "Lesotho", "Bahrain", "Turkey", "Finland", "Sri Lanka", "Chile", 
  "Saint Lucia", "South Georgia and the South Sandwich Islands", "Lebanon", 
  "Guatemala", "Nepal", "India", "Bangladesh", "Greenland", "Saint Martin (French part)", 
  "Suriname", "Micronesia (Federated States of)", "Belize", "Nigeria", 
  "Mali", "Egypt", "Virgin Islands (U.S.)", "Virgin Islands (British)", 
  "Congo (the Democratic Republic of the)", "Belgium", "Ethiopia", "China", 
  "Trinidad and Tobago", "Israel", "Cyprus", "Bouvet Island", "Kazakhstan", 
  "Marshall Islands (the)", "Djibouti", "South Africa", "Iran (Islamic Republic of)", 
  "Mali", "Netherlands (the)", "Guyana", "Liberia", "Falkland Islands (the) [Malvinas]", 
  "Faroe Islands (the)", "Switzerland", "Czechia", "Philippines (the)", 
  "Northern Mariana Islands (the)", "Norfolk Island", "Morocco", "Mauritius", 
  "Maldives", "Mali", "Malaysia", "Saint Barthélemy", "Sint Maarten (Dutch part)", 
  "Solomon Islands", "Somalia", "South Africa", "South Georgia and the South Sandwich Islands", 
  "South Sudan", "Spain", "Sri Lanka", "Sudan (the)", "Suriname", 
  "Svalbard and Jan Mayen", "Sweden", "Switzerland", "Syrian Arab Republic", 
  "Taiwan", "Tajikistan", "Tanzania, United Republic of", "Thailand", 
  "Timor-Leste", "Togo", "Tokelau", "Tonga", "Trinidad and Tobago", 
  "Tunisia", "Turkey", "Turkmenistan", "Turks and Caicos Islands (the)", 
  "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates (the)", 
  "United Kingdom of Great Britain and Northern Ireland (the)", 
  "United States Minor Outlying Islands (the)", "United States of America (the)", 
  "Uruguay", "Uzbekistan", "Vanuatu", "Venezuela (Bolivarian Republic of)", 
  "Viet Nam", "Virgin Islands (British)", "Virgin Islands (U.S.)", 
  "Wallis and Futuna", "Western Sahara", "Yemen", "Zambia", "Zimbabwe", 
  "Åland Islands"
];

    const handleDropdownOpen = () => {
        askAreYouSure(() => {
            setDropdownOpen(true);
        });
    }

    const handleDropdownSelect = (option: string) => {
        askAreYouSure(() => {
            setSelectedOption(option);
            setDropdownOpen(false);
        });
    }

    useEffect(() => {
        if (selectedOption === "Finland") {
            setCorrectDropdown(true);
        } else  {
            setCorrectDropdown(false);
        }
    }, [selectedOption]);

    const handleNextLayer = () => {
        askAreYouSure(() => {
            router.push("/fifthlayer");
        });
    }

    return (
        <div className="relative bg-black w-screen h-screen flex items-center justify-center flex-col overflow-hidden">
            <h1 className="text-4xl text-white">Fourth Layer</h1>
            {ads.map((ad, index) => (
            <PopUpAd 
                key={index} 
                index={index} // Pass the index so the ad knows who it is
                x={ad.x} 
                y={ad.y} 
                w={ad.w} 
                src={ad.src} 
                onClose={() => removeAd(index)} // Pass the delete function
            />
            ))}
            <div className="border border-zinc-700 rounded p-4 mt-6">
                <h1 className="text-xl text-white mb-1">Du läste välan ToS?</h1>
                <p className="font-medium text-white">
                  {QUESTION.question}
                </p>

                <div className="mt-3 grid gap-2">
                  {QUESTION.options.map((opt, oi) => {
                    const base = "w-full text-left px-3 py-2 rounded border transition text-white";
                    const cls = correct 
                        ? `${base} border-blue-400 bg-blue-500/20`
                        : `${base} border-zinc-700 hover:border-zinc-400`;

                    return (
                      <button
                        key={oi}
                        onClick={() => chooseOption(oi)}
                        className={cls}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>
              <div className="">
                  <h2 className="text-2xl text-white mt-6">Från vilket land är du?</h2>
                  <div className="relative inline-block text-left mt-2">
                    <button
                        onClick={() => handleDropdownOpen()}
                        className="bg-gray-700 text-white px-4 py-2 rounded"
                        >
                        {selectedOption || "Välj ett alternativ"}
                        </button>
                        {dropdownOpen && (
                        <div className="origin-top-right absolute right-0 mt-2 w-56 h-48 overflow-auto rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                            <div className="py-1">
                            {dropdownOptions.map((option) => (
                                <button
                                key={option}
                                onClick={() => handleDropdownSelect(option)}
                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                {option}
                                </button>
                            ))}
                            </div>
                        </div>
                        )}
                    {selectedOption && selectedOption !== "Finland" && (
                        <p className="text-red-500 mt-2">Är du helt säker på det?</p>
                    )}
                </div>
              </div>
            <ConfirmModal open={confirmOpen} onAnswer={handleConfirmAnswer} />
            <ToSModal
                open={TOSopen}
                onClose={() => setTosOpen(false)}
                onAccept={handleAcceptTos}
                src={tosSrc}
                variant={"wrong"}
            />
            {correctDropdown && correct &&
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4" onClick={() => handleNextLayer()}>
                    Gå vidare
                </button>
            }
        </div>
    );
}