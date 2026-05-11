"use client";

import { useState } from "react";

export default function CompoundingCalculator() {

  const [initialCapital, setInitialCapital] =
    useState("");

  const [monthlyReturn, setMonthlyReturn] =
    useState("");

  const [months, setMonths] =
    useState("");

  const calculateCompounding = () => {

    const capital =
      Number(initialCapital);

    const monthly =
      Number(monthlyReturn);

    const duration =
      Number(months);

    const finalCapital =
      capital *
      Math.pow(
        1 + monthly / 100,
        duration
      );

    const totalProfit =
      finalCapital - capital;

    const growthPercent =
      capital > 0
        ? (
            (totalProfit / capital) *
            100
          ).toFixed(2)
        : "0";

    return {
      finalCapital,
      totalProfit,
      growthPercent,
    };
  };

  const result =
    calculateCompounding();

  return (

    <div className="bg-zinc-800 rounded-2xl p-5 border border-zinc-700">

      <h2 className="text-2xl font-bold text-pink-400 mb-5">

        Compounding Calculator

      </h2>

      {/* INPUTS */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        <input
          type="number"
          value={initialCapital}
          onChange={(e) =>
            setInitialCapital(
              e.target.value
            )
          }
          placeholder="Initial Capital"
          className="bg-zinc-900 border border-zinc-700 text-white rounded-xl px-4 py-3"
        />

        <input
          type="number"
          value={monthlyReturn}
          onChange={(e) =>
            setMonthlyReturn(
              e.target.value
            )
          }
          placeholder="Monthly Return %"
          className="bg-zinc-900 border border-zinc-700 text-white rounded-xl px-4 py-3"
        />

        <input
          type="number"
          value={months}
          onChange={(e) =>
            setMonths(
              e.target.value
            )
          }
          placeholder="Duration (Months)"
          className="bg-zinc-900 border border-zinc-700 text-white rounded-xl px-4 py-3"
        />

      </div>

      {/* RESULTS */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">

        <div className="bg-zinc-900 rounded-xl p-4">

          <p className="text-zinc-400 text-sm">

            Final Capital

          </p>

          <h3 className="text-2xl font-bold text-green-400 mt-2">

            ₹{result.finalCapital.toFixed(2)}

          </h3>

        </div>

        <div className="bg-zinc-900 rounded-xl p-4">

          <p className="text-zinc-400 text-sm">

            Total Profit

          </p>

          <h3 className="text-2xl font-bold text-pink-400 mt-2">

            ₹{result.totalProfit.toFixed(2)}

          </h3>

        </div>

        <div className="bg-zinc-900 rounded-xl p-4">

          <p className="text-zinc-400 text-sm">

            Growth %

          </p>

          <h3 className="text-2xl font-bold text-orange-400 mt-2">

            {result.growthPercent}%

          </h3>

        </div>

      </div>

    </div>
  );
}