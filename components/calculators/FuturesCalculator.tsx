"use client";

import { useState } from "react";

export default function FuturesCalculator() {

  const [selectedIndex, setSelectedIndex] =
    useState("NIFTY");

  const [lots, setLots] =
    useState("");

  const [entryPrice, setEntryPrice] =
    useState("");

  const lotSizes: {
    [key: string]: number;
  } = {
    NIFTY: 75,
    BANKNIFTY: 35,
    FINNIFTY: 40,
  };

  const calculateFutures = () => {

    const lotQty =
      lotSizes[selectedIndex];

    const totalLots =
      Number(lots);

    const price =
      Number(entryPrice);

    const totalQuantity =
      lotQty * totalLots;

    const contractValue =
      totalQuantity * price;

    return {
      totalQuantity,
      contractValue,
    };
  };

  const result =
    calculateFutures();

  return (

    <div className="bg-zinc-800 rounded-2xl p-5 border border-zinc-700">

      <h2 className="text-2xl font-bold text-pink-400 mb-5">

        Futures Lot Calculator

      </h2>

      {/* INPUTS */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        <select
          value={selectedIndex}
          onChange={(e) =>
            setSelectedIndex(
              e.target.value
            )
          }
          className="bg-zinc-900 border border-zinc-700 text-white rounded-xl px-4 py-3"
        >

          <option value="NIFTY">
            NIFTY
          </option>

          <option value="BANKNIFTY">
            BANKNIFTY
          </option>

          <option value="FINNIFTY">
            FINNIFTY
          </option>

        </select>

        <input
          type="number"
          value={lots}
          onChange={(e) =>
            setLots(
              e.target.value
            )
          }
          placeholder="Number of Lots"
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

      </div>

      {/* RESULTS */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">

        <div className="bg-zinc-900 rounded-xl p-4">

          <p className="text-zinc-400 text-sm">

            Total Quantity

          </p>

          <h3 className="text-2xl font-bold text-green-400 mt-2">

            {result.totalQuantity}

          </h3>

        </div>

        <div className="bg-zinc-900 rounded-xl p-4">

          <p className="text-zinc-400 text-sm">

            Contract Value

          </p>

          <h3 className="text-2xl font-bold text-pink-400 mt-2">

            ₹{result.contractValue.toFixed(2)}

          </h3>

        </div>

      </div>

    </div>
  );
}