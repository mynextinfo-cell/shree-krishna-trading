"use client";

import { useState } from "react";

export default function SimpleCalculator() {

  const [display, setDisplay] =
    useState("0");

  const handleClick = (value: string) => {

    if (display === "0") {

      setDisplay(value);

    } else {

      setDisplay(display + value);
    }
  };

  const clearDisplay = () => {

    setDisplay("0");
  };

  const calculateResult = () => {

    try {

      // eslint-disable-next-line
      const result = eval(display);

      setDisplay(result.toString());

    } catch {

      setDisplay("Error");
    }
  };

  return (

    <div className="bg-zinc-800 rounded-2xl p-5 border border-zinc-700">

      <h2 className="text-2xl font-bold text-pink-400 mb-5">

        Simple Calculator

      </h2>

      <div className="bg-black rounded-2xl p-5 max-w-md">

        {/* DISPLAY */}

        <div className="bg-zinc-950 text-right text-white text-3xl font-bold rounded-xl p-4 mb-4 overflow-x-auto">

          {display}

        </div>

        {/* BUTTONS */}

        <div className="grid grid-cols-4 gap-3">

          {[
            "7","8","9","/",
            "4","5","6","*",
            "1","2","3","-",
            "0",".","=","+",
          ].map((btn) => (

            <button
              key={btn}
              onClick={() => {

                if (btn === "=") {

                  calculateResult();

                } else {

                  handleClick(btn);
                }
              }}
              className={`p-4 rounded-xl text-lg font-bold transition ${
                ["+","-","*","/","="].includes(btn)
                  ? "bg-orange-500 hover:bg-orange-600 text-white"
                  : "bg-zinc-800 hover:bg-zinc-700 text-white"
              }`}
            >

              {btn}

            </button>
          ))}

          {/* CLEAR */}

          <button
            onClick={clearDisplay}
            className="col-span-4 bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-bold transition"
          >

            Clear

          </button>

        </div>

      </div>

    </div>
  );
}