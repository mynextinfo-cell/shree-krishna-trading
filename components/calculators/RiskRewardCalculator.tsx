"use client";

import { useState } from "react";

export default function RiskRewardCalculator() {

  const [entryPrice, setEntryPrice] =
    useState("");

  const [stoploss, setStoploss] =
    useState("");

  const [targetPrice, setTargetPrice] =
    useState("");

  const calculateRiskReward = () => {

    const entry =
      Number(entryPrice);

    const sl =
      Number(stoploss);

    const target =
      Number(targetPrice);

    const risk =
      entry - sl;

    const reward =
      target - entry;

    const ratio =
      risk > 0
        ? (reward / risk).toFixed(2)
        : "0";

    return {
      risk,
      reward,
      ratio,
    };
  };

  const result =
    calculateRiskReward();

  return (

    <div className="bg-zinc-800 rounded-2xl p-5 border border-zinc-700">

      <h2 className="text-2xl font-bold text-pink-400 mb-5">

        Risk Reward Calculator

      </h2>

      {/* INPUTS */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

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

        <input
          type="number"
          value={targetPrice}
          onChange={(e) =>
            setTargetPrice(
              e.target.value
            )
          }
          placeholder="Target Price"
          className="bg-zinc-900 border border-zinc-700 text-white rounded-xl px-4 py-3"
        />

      </div>

      {/* RESULTS */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">

        <div className="bg-zinc-900 rounded-xl p-4">

          <p className="text-zinc-400 text-sm">

            Risk

          </p>

          <h3 className="text-2xl font-bold text-red-400 mt-2">

            ₹{result.risk.toFixed(2)}

          </h3>

        </div>

        <div className="bg-zinc-900 rounded-xl p-4">

          <p className="text-zinc-400 text-sm">

            Reward

          </p>

          <h3 className="text-2xl font-bold text-green-400 mt-2">

            ₹{result.reward.toFixed(2)}

          </h3>

        </div>

        <div className="bg-zinc-900 rounded-xl p-4">

          <p className="text-zinc-400 text-sm">

            Risk Reward Ratio

          </p>

          <h3 className="text-2xl font-bold text-pink-400 mt-2">

            1 : {result.ratio}

          </h3>

        </div>

      </div>

    </div>
  );
}