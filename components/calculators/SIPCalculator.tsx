"use client";

import { useState } from "react";

export default function SIPCalculator() {

  const [monthlyInvestment, setMonthlyInvestment] =
    useState("");

  const [annualReturn, setAnnualReturn] =
    useState("");

  const [years, setYears] =
    useState("");

  const calculateSIP = () => {

    const sip =
      Number(monthlyInvestment);

    const rate =
      Number(annualReturn) /
      12 /
      100;

    const totalMonths =
      Number(years) * 12;

    const futureValue =
      sip *
      (
        (
          Math.pow(
            1 + rate,
            totalMonths
          ) - 1
        ) / rate
      ) *
      (1 + rate);

    const investedAmount =
      sip * totalMonths;

    const estimatedReturns =
      futureValue - investedAmount;

    return {
      investedAmount,
      estimatedReturns,
      futureValue,
    };
  };

  const result =
    calculateSIP();

  return (

    <div className="bg-zinc-800 rounded-2xl p-5 border border-zinc-700">

      <h2 className="text-2xl font-bold text-pink-400 mb-5">

        SIP Calculator

      </h2>

      {/* INPUTS */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        <input
          type="number"
          value={monthlyInvestment}
          onChange={(e) =>
            setMonthlyInvestment(
              e.target.value
            )
          }
          placeholder="Monthly Investment"
          className="bg-zinc-900 border border-zinc-700 text-white rounded-xl px-4 py-3"
        />

        <input
          type="number"
          value={annualReturn}
          onChange={(e) =>
            setAnnualReturn(
              e.target.value
            )
          }
          placeholder="Annual Return %"
          className="bg-zinc-900 border border-zinc-700 text-white rounded-xl px-4 py-3"
        />

        <input
          type="number"
          value={years}
          onChange={(e) =>
            setYears(
              e.target.value
            )
          }
          placeholder="Duration (Years)"
          className="bg-zinc-900 border border-zinc-700 text-white rounded-xl px-4 py-3"
        />

      </div>

      {/* RESULTS */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">

        <div className="bg-zinc-900 rounded-xl p-4">

          <p className="text-zinc-400 text-sm">

            Total Invested

          </p>

          <h3 className="text-2xl font-bold text-blue-400 mt-2">

            ₹{result.investedAmount.toFixed(2)}

          </h3>

        </div>

        <div className="bg-zinc-900 rounded-xl p-4">

          <p className="text-zinc-400 text-sm">

            Estimated Returns

          </p>

          <h3 className="text-2xl font-bold text-green-400 mt-2">

            ₹{result.estimatedReturns.toFixed(2)}

          </h3>

        </div>

        <div className="bg-zinc-900 rounded-xl p-4">

          <p className="text-zinc-400 text-sm">

            Final Value

          </p>

          <h3 className="text-2xl font-bold text-pink-400 mt-2">

            ₹{result.futureValue.toFixed(2)}

          </h3>

        </div>

      </div>

    </div>
  );
}