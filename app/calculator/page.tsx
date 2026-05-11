"use client";

import { useState } from "react";

import Sidebar from "@/components/Sidebar";

import SimpleCalculator from "@/components/calculators/SimpleCalculator";
import PositionSizeCalculator from "@/components/calculators/PositionSizeCalculator";
import RiskRewardCalculator from "@/components/calculators/RiskRewardCalculator";
import BrokerageCalculator from "@/components/calculators/BrokerageCalculator";
import CompoundingCalculator from "@/components/calculators/CompoundingCalculator";
import SIPCalculator from "@/components/calculators/SIPCalculator";
import FuturesCalculator from "@/components/calculators/FuturesCalculator";

export default function CalculatorPage() {

  const [activeCalculator, setActiveCalculator] =
    useState("simple");

  return (

    <div className="flex min-h-screen bg-zinc-900">

      <Sidebar />

      <main className="flex-1 px-4 py-4 md:px-6 overflow-y-auto">

        {/* HEADER */}

        <div className="bg-orange-500 rounded-2xl px-8 py-5 shadow-xl mb-6">

          <h1 className="text-4xl font-extrabold text-white">

            Trading Calculator Suite

          </h1>

          <p className="text-white/90 mt-2">

            Professional trading & investment calculators

          </p>

        </div>

        {/* DROPDOWN */}

        <div className="mb-6">

          <select
            value={activeCalculator}
            onChange={(e) =>
              setActiveCalculator(
                e.target.value
              )
            }
            className="bg-zinc-800 border border-zinc-700 text-white rounded-xl px-5 py-3 w-full md:w-96 outline-none focus:border-pink-500"
          >

            <option value="simple">
              Simple Calculator
            </option>

            <option value="position">
              Position Size Calculator
            </option>

            <option value="riskreward">
              Risk Reward Calculator
            </option>

            <option value="brokerage">
              Brokerage Calculator
            </option>

            <option value="compounding">
              Compounding Calculator
            </option>

            <option value="sip">
              SIP Calculator
            </option>

            <option value="futures">
              Futures Lot Calculator
            </option>

          </select>

        </div>

        {/* SIMPLE */}

        {activeCalculator === "simple" && (

          <SimpleCalculator />

        )}

        {/* POSITION */}

        {activeCalculator === "position" && (

          <PositionSizeCalculator />

        )}

        {/* RISK REWARD */}

        {activeCalculator === "riskreward" && (

          <RiskRewardCalculator />

        )}

        {/* BROKERAGE */}

        {activeCalculator === "brokerage" && (

          <BrokerageCalculator />

        )}

        {/* COMPOUNDING */}

        {activeCalculator === "compounding" && (

          <CompoundingCalculator />

        )}

        {/* SIP */}

        {activeCalculator === "sip" && (

          <SIPCalculator />

        )}

        {/* FUTURES */}

        {activeCalculator === "futures" && (

          <FuturesCalculator />

        )}

      </main>

    </div>
  );
}