"use client";

import { useState } from "react";

export default function PositionSizeCalculator() {

  const [capital, setCapital] =
    useState("");

  const [riskPercent, setRiskPercent] =
    useState("");

  const [entryPrice, setEntryPrice] =
    useState("");

  const [stoploss, setStoploss] =
    useState("");

  const calculatePosition = () => {

    const capitalNum =
      Number(capital);

    const riskNum =
      Number(riskPercent);

    const entryNum =
      Number(entryPrice);

    const slNum =
      Number(stoploss);

    const riskAmount =
      (capitalNum * riskNum) / 100;

    const riskPerShare =
      entryNum - slNum;

    const quantity =
      riskPerShare > 0
        ? Math.floor(
            riskAmount / riskPerShare
          )
        : 0;

    const positionValue =
      quantity * entryNum;

    return {
      riskAmount,
      quantity,
      positionValue,
    };
  };

  const result =
    calculatePosition();

  return (

    <div className="bg-zinc-800 rounded-2xl p-5 border border-zinc-700">

      <h2 className="text-2xl font-bold text-pink-400 mb-5">

        Position Size Calculator

      </h2>

      {/* INPUTS */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        <input
          type="number"
          value={capital}
          onChange={(e) =>
            setCapital(e.target.value)
          }
          placeholder="Trading Capital"
          className="bg-zinc-900 border border-zinc-700 text-white rounded-xl px-4 py-3"
        />

        <input
          type="number"
          value={riskPercent}
          onChange={(e) =>
            setRiskPercent(
              e.target.value
            )
          }
          placeholder="Risk %"
          className="bg-zinc-900 border border-zinc-700 text-white rounded-xl px-4 py-3"
        />

        <input
          type="number"
          value={entryPrice}
          onChange={(e) =>
            setEntryPrice(
              e.target.value
            )
          }
          placeholder="Entry Price"
          className="bg-zinc-900 border border-zinc-700 text-white rounded-xl px-4 py-3"
        />

        <input
          type="number"
          value={stoploss}
          onChange={(e) =>
            setStoploss(
              e.target.value
            )
          }
          placeholder="Stoploss"
          className="bg-zinc-900 border border-zinc-700 text-white rounded-xl px-4 py-3"
        />

      </div>

      {/* RESULTS */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">

        <div className="bg-zinc-900 rounded-xl p-4">

          <p className="text-zinc-400 text-sm">

            Max Risk

          </p>

          <h3 className="text-2xl font-bold text-red-400 mt-2">

            ₹{result.riskAmount.toFixed(2)}

          </h3>

        </div>

        <div className="bg-zinc-900 rounded-xl p-4">

          <p className="text-zinc-400 text-sm">

            Quantity

          </p>

          <h3 className="text-2xl font-bold text-green-400 mt-2">

            {result.quantity}

          </h3>

        </div>

        <div className="bg-zinc-900 rounded-xl p-4">

          <p className="text-zinc-400 text-sm">

            Position Value

          </p>

          <h3 className="text-2xl font-bold text-pink-400 mt-2">

            ₹{result.positionValue.toFixed(2)}

          </h3>

        </div>

      </div>

    </div>
  );
}