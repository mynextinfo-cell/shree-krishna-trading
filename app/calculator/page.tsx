"use client";

import { useEffect, useState } from "react";

import Sidebar from "@/components/Sidebar";

import SimpleCalculator from "@/components/calculators/SimpleCalculator";

import BrokerageCalculator from "@/components/calculators/BrokerageCalculator";

import SIPCalculator from "@/components/calculators/SIPCalculator";

import RiskRewardCalculator from "@/components/calculators/RiskRewardCalculator";

import PositionSizeCalculator from "@/components/calculators/PositionSizeCalculator";

import FuturesCalculator from "@/components/calculators/FuturesCalculator";

import CompoundingCalculator from "@/components/calculators/CompoundingCalculator";

export default function CalculatorPage() {

  // LIVE CLOCK

  const [currentTime, setCurrentTime] =
    useState("");

  const [currentDate, setCurrentDate] =
    useState("");

  useEffect(() => {

    const updateClock = () => {

      const now =
        new Date();

      setCurrentTime(

        now.toLocaleTimeString(
          "en-IN",
          {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          }
        )
      );

      setCurrentDate(

        now.toLocaleDateString(
          "en-IN",
          {
            weekday: "short",
            day: "numeric",
            month: "short",
            year: "numeric",
          }
        )
      );
    };

    updateClock();

    const interval =
      setInterval(
        updateClock,
        1000
      );

    return () =>
      clearInterval(
        interval
      );

  }, []);

  return (

    <div className="flex min-h-screen bg-[#fff1f7]">

      {/* SIDEBAR */}

      <Sidebar />

      {/* MAIN CONTENT */}

      <main className="flex-1 p-6 overflow-y-auto">

        {/* HEADER */}

        <div className="bg-gradient-to-r from-orange-500 to-amber-400 rounded-3xl p-8 shadow-xl mb-8">

          <div className="flex items-start justify-between gap-6">

            {/* LEFT */}

            <div>

              <h1 className="text-4xl font-bold text-white">

                Trading Calculators

              </h1>

              <p className="text-white/90 text-lg mt-3">

                Professional tools for trading and investing.

              </p>

            </div>

            {/* RIGHT CLOCK */}

            <div className="bg-white/20 backdrop-blur-md rounded-2xl px-5 py-3 border border-white/20 shadow-lg">

              <h2 className="text-lg font-bold text-black text-right">

                {currentTime}

              </h2>

              <p className="text-xs text-black text-right mt-1">

                {currentDate}

              </p>

            </div>

          </div>

        </div>

        {/* CALCULATORS */}

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

          <SimpleCalculator />

          <BrokerageCalculator />

          <SIPCalculator />

          <RiskRewardCalculator />

          <PositionSizeCalculator />

          <FuturesCalculator />

          <CompoundingCalculator />

        </div>

      </main>

    </div>
  );
}