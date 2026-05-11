"use client";

import { useState } from "react";

export default function BrokerageCalculator() {

  const [buyPrice, setBuyPrice] =
    useState("");

  const [sellPrice, setSellPrice] =
    useState("");

  const [quantity, setQuantity] =
    useState("");

  const [brokeragePercent, setBrokeragePercent] =
    useState("");

  const calculateBrokerage = () => {

    const buy =
      Number(buyPrice);

    const sell =
      Number(sellPrice);

    const qty =
      Number(quantity);

    const brokerage =
      Number(brokeragePercent);

    const grossProfit =
      (sell - buy) * qty;

    const turnover =
      (buy + sell) * qty;

    const charges =
      (turnover * brokerage) / 100;

    const netProfit =
      grossProfit - charges;

    return {
      grossProfit,
      charges,
      netProfit,
    };
  };

  const result =
    calculateBrokerage();

  return (

    <div className="bg-zinc-800 rounded-2xl p-5 border border-zinc-700">

      <h2 className="text-2xl font-bold text-pink-400 mb-5">

        Brokerage Calculator

      </h2>

      {/* INPUTS */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        <input
          type="number"
          value={buyPrice}
          onChange={(e) =>
            setBuyPrice(
              e.target.value
            )
          }
          placeholder="Buy Price"
          className="bg-zinc-900 border border-zinc-700 text-white rounded-xl px-4 py-3"
        />

        <input
          type="number"
          value={sellPrice}
          onChange={(e) =>
            setSellPrice(
              e.target.value
            )
          }
          placeholder="Sell Price"
          className="bg-zinc-900 border border-zinc-700 text-white rounded-xl px-4 py-3"
        />

        <input
          type="number"
          value={quantity}
          onChange={(e) =>
            setQuantity(
              e.target.value
            )
          }
          placeholder="Quantity"
          className="bg-zinc-900 border border-zinc-700 text-white rounded-xl px-4 py-3"
        />

        <input
          type="number"
          value={brokeragePercent}
          onChange={(e) =>
            setBrokeragePercent(
              e.target.value
            )
          }
          placeholder="Brokerage %"
          className="bg-zinc-900 border border-zinc-700 text-white rounded-xl px-4 py-3"
        />

      </div>

      {/* RESULTS */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">

        <div className="bg-zinc-900 rounded-xl p-4">

          <p className="text-zinc-400 text-sm">

            Gross Profit

          </p>

          <h3 className="text-2xl font-bold text-green-400 mt-2">

            ₹{result.grossProfit.toFixed(2)}

          </h3>

        </div>

        <div className="bg-zinc-900 rounded-xl p-4">

          <p className="text-zinc-400 text-sm">

            Charges

          </p>

          <h3 className="text-2xl font-bold text-red-400 mt-2">

            ₹{result.charges.toFixed(2)}

          </h3>

        </div>

        <div className="bg-zinc-900 rounded-xl p-4">

          <p className="text-zinc-400 text-sm">

            Net Profit

          </p>

          <h3 className="text-2xl font-bold text-pink-400 mt-2">

            ₹{result.netProfit.toFixed(2)}

          </h3>

        </div>

      </div>

    </div>
  );
}