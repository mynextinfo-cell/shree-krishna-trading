"use client";

import { useState } from "react";

import { supabase } from "@/lib/supabase";

interface Props {

  trade: any;

  onClose: () => void;

  onSuccess: () => void;
}

export default function CloseTradeModal({

  trade,

  onClose,

  onSuccess,

}: Props) {

  const [exitPrice, setExitPrice] =
    useState("");

  const [exitDate, setExitDate] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  // CLOSE TRADE

  const handleCloseTrade = async () => {

    if (
      !exitPrice ||
      !exitDate
    ) {

      alert(
        "Please fill all fields ❌"
      );

      return;
    }

    setLoading(true);

    // GROSS PNL

    const grossPnl =

      (
        Number(exitPrice) -
        Number(trade.entry_price)
      ) *

      Number(trade.quantity);

    // NET PNL

    const netPnl =

      grossPnl -

      Number(
        trade.brokerage || 0
      ) -

      Number(
        trade.taxes || 0
      );

    // UPDATE TRADE

    const { error } =
      await supabase
        .from("trades")
        .update({

          exit_price:
            Number(
              exitPrice
            ),

          exit_date:
            exitDate,

          pnl:
            grossPnl,

          net_pnl:
            netPnl,

          status:
            "closed",
        })

        .eq(
          "id",
          trade.id
        );

    if (error) {

      console.error(
        error
      );

      alert(
        "Failed to close trade ❌"
      );

      setLoading(false);

      return;
    }

    alert(
      "Trade Closed Successfully 🚀"
    );

    setLoading(false);

    onSuccess();

    onClose();
  };

  return (

    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">

      <div className="bg-white rounded-3xl w-full max-w-lg p-8 shadow-2xl">

        {/* HEADER */}

        <div className="mb-6">

          <h2 className="text-3xl font-bold text-zinc-800">

            Close Trade

          </h2>

          <p className="text-zinc-500 mt-2">

            {trade.stock_name}

          </p>

        </div>

        {/* EXIT PRICE */}

        <div className="mb-5">

          <label className="block text-sm font-semibold text-zinc-700 mb-2">

            Exit Price

          </label>

          <input
            type="number"
            placeholder="Enter Exit Price"
            value={exitPrice}
            onChange={(e) =>
              setExitPrice(
                e.target.value
              )
            }
            className="w-full bg-pink-50 border border-pink-100 rounded-2xl px-5 py-4 outline-none focus:border-pink-400"
          />

        </div>

        {/* EXIT DATE */}

        <div className="mb-6">

          <label className="block text-sm font-semibold text-zinc-700 mb-2">

            Exit Date

          </label>

          <input
            type="date"
            value={exitDate}
            onChange={(e) =>
              setExitDate(
                e.target.value
              )
            }
            className="w-full bg-pink-50 border border-pink-100 rounded-2xl px-5 py-4 outline-none focus:border-pink-400"
          />

        </div>

        {/* BUTTONS */}

        <div className="flex gap-4">

          <button
            onClick={onClose}
            className="flex-1 bg-zinc-200 hover:bg-zinc-300 text-zinc-800 font-bold py-4 rounded-2xl transition-all duration-300"
          >

            Cancel

          </button>

          <button
            onClick={
              handleCloseTrade
            }
            disabled={loading}
            className="flex-1 bg-pink-500 hover:bg-pink-600 disabled:bg-pink-300 text-white font-bold py-4 rounded-2xl transition-all duration-300"
          >

            {loading
              ? "Closing..."
              : "Close Trade"}

          </button>

        </div>

      </div>

    </div>
  );
}