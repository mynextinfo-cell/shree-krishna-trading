"use client";

import { useState } from "react";

import { supabase } from "@/lib/supabase";

interface EditTradeModalProps {

  trade: any;

  onClose: () => void;

  onSuccess: () => void;
}

export default function EditTradeModal({

  trade,

  onClose,

  onSuccess,

}: EditTradeModalProps) {

  // STATES

  const [stockName, setStockName] =
    useState(
      trade.stock_name || ""
    );

  const [quantity, setQuantity] =
    useState(
      trade.quantity || ""
    );

  const [entryPrice, setEntryPrice] =
    useState(
      trade.entry_price || ""
    );

  const [exitPrice, setExitPrice] =
    useState(
      trade.exit_price || ""
    );

  const [brokerage, setBrokerage] =
    useState(
      trade.brokerage || ""
    );

  const [taxes, setTaxes] =
    useState(
      trade.taxes || ""
    );

  const [strategy, setStrategy] =
    useState(
      trade.strategy || ""
    );

  const [notes, setNotes] =
    useState(
      trade.notes || ""
    );

  const [loading, setLoading] =
    useState(false);

  // UPDATE TRADE

  const handleUpdateTrade =
    async (
      e: React.FormEvent
    ) => {

      e.preventDefault();

      setLoading(true);

      // CALCULATIONS

      const qty =
        Number(quantity);

      const entry =
        Number(entryPrice);

      const exit =
        Number(exitPrice || 0);

      const brokerageValue =
        Number(brokerage || 0);

      const taxesValue =
        Number(taxes || 0);

      // GROSS PNL

      let pnl = 0;

      if (
        trade.side === "BUY"
      ) {

        pnl =
          (
            exit - entry
          ) * qty;

      } else {

        pnl =
          (
            entry - exit
          ) * qty;
      }

      // NET PNL

      const netPnl =

        pnl -

        brokerageValue -

        taxesValue;

      // STATUS

      const status =

        exitPrice

          ? "closed"

          : "open";

      // UPDATE

      const { error } =
        await supabase

          .from("trades")

          .update({

            stock_name:
              stockName,

            quantity:
              qty,

            entry_price:
              entry,

            exit_price:

              exitPrice

                ? exit

                : null,

            brokerage:
              brokerageValue,

            taxes:
              taxesValue,

            strategy:
              strategy,

            notes:
              notes,

            pnl:
              pnl,

            net_pnl:
              netPnl,

            status:
              status,
          })

          .eq(
            "id",
            trade.id
          );

      // ERROR

      if (error) {

        console.error(
          error
        );

        alert(
          "Failed to update trade ❌"
        );

        setLoading(false);

        return;
      }

      // SUCCESS

      alert(
        "Trade Updated Successfully 🚀"
      );

      setLoading(false);

      onSuccess();

      onClose();
    };

  return (

    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">

      {/* MODAL */}

      <div className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-pink-100 overflow-hidden">

        {/* HEADER */}

        <div className="bg-gradient-to-r from-pink-500 to-rose-400 p-6">

          <div className="flex items-center justify-between">

            <div>

              <h2 className="text-3xl font-bold text-white">

                Edit Trade

              </h2>

              <p className="text-white/90 mt-2">

                Update your trade details professionally.

              </p>

            </div>

            {/* CLOSE */}

            <button
              onClick={onClose}
              className="bg-white text-pink-500 w-10 h-10 rounded-full font-bold text-xl hover:bg-pink-100 transition"
            >

              ×

            </button>

          </div>

        </div>

        {/* FORM */}

        <form
          onSubmit={
            handleUpdateTrade
          }
          className="p-6"
        >

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            {/* STOCK */}

            <div>

              <label className="block text-sm font-semibold text-zinc-700 mb-2">

                Stock Name

              </label>

              <input
                type="text"
                value={stockName}
                onChange={(e) =>
                  setStockName(
                    e.target.value
                  )
                }
                className="w-full bg-pink-50 border border-pink-100 rounded-2xl px-5 py-4 outline-none focus:border-pink-400"
              />

            </div>

            {/* QUANTITY */}

            <div>

              <label className="block text-sm font-semibold text-zinc-700 mb-2">

                Quantity

              </label>

              <input
                type="number"
                value={quantity}
                onChange={(e) =>
                  setQuantity(
                    e.target.value
                  )
                }
                className="w-full bg-pink-50 border border-pink-100 rounded-2xl px-5 py-4 outline-none focus:border-pink-400"
              />

            </div>

            {/* ENTRY PRICE */}

            <div>

              <label className="block text-sm font-semibold text-zinc-700 mb-2">

                Entry Price

              </label>

              <input
                type="number"
                value={entryPrice}
                onChange={(e) =>
                  setEntryPrice(
                    e.target.value
                  )
                }
                className="w-full bg-pink-50 border border-pink-100 rounded-2xl px-5 py-4 outline-none focus:border-pink-400"
              />

            </div>

            {/* EXIT PRICE */}

            <div>

              <label className="block text-sm font-semibold text-zinc-700 mb-2">

                Exit Price

              </label>

              <input
                type="number"
                value={exitPrice}
                onChange={(e) =>
                  setExitPrice(
                    e.target.value
                  )
                }
                placeholder="Leave empty for open trade"
                className="w-full bg-pink-50 border border-pink-100 rounded-2xl px-5 py-4 outline-none focus:border-pink-400"
              />

            </div>

            {/* BROKERAGE */}

            <div>

              <label className="block text-sm font-semibold text-zinc-700 mb-2">

                Brokerage

              </label>

              <input
                type="number"
                value={brokerage}
                onChange={(e) =>
                  setBrokerage(
                    e.target.value
                  )
                }
                className="w-full bg-pink-50 border border-pink-100 rounded-2xl px-5 py-4 outline-none focus:border-pink-400"
              />

            </div>

            {/* TAXES */}

            <div>

              <label className="block text-sm font-semibold text-zinc-700 mb-2">

                Taxes

              </label>

              <input
                type="number"
                value={taxes}
                onChange={(e) =>
                  setTaxes(
                    e.target.value
                  )
                }
                className="w-full bg-pink-50 border border-pink-100 rounded-2xl px-5 py-4 outline-none focus:border-pink-400"
              />

            </div>

          </div>

          {/* STRATEGY */}

          <div className="mt-5">

            <label className="block text-sm font-semibold text-zinc-700 mb-2">

              Strategy

            </label>

            <input
              type="text"
              value={strategy}
              onChange={(e) =>
                setStrategy(
                  e.target.value
                )
              }
              className="w-full bg-pink-50 border border-pink-100 rounded-2xl px-5 py-4 outline-none focus:border-pink-400"
            />

          </div>

          {/* NOTES */}

          <div className="mt-5">

            <label className="block text-sm font-semibold text-zinc-700 mb-2">

              Notes

            </label>

            <textarea
              rows={5}
              value={notes}
              onChange={(e) =>
                setNotes(
                  e.target.value
                )
              }
              className="w-full bg-pink-50 border border-pink-100 rounded-2xl px-5 py-4 outline-none focus:border-pink-400 resize-none"
            />

          </div>

          {/* BUTTONS */}

          <div className="mt-6 flex items-center gap-4">

            {/* SAVE */}

            <button
              type="submit"
              disabled={loading}
              className="bg-pink-500 hover:bg-pink-600 disabled:bg-pink-300 text-white font-bold px-8 py-4 rounded-2xl shadow-lg transition-all duration-300"
            >

              {loading

                ? "Updating..."

                : "Update Trade"}

            </button>

            {/* CANCEL */}

            <button
              type="button"
              onClick={onClose}
              className="bg-zinc-200 hover:bg-zinc-300 text-zinc-700 font-bold px-8 py-4 rounded-2xl transition-all duration-300"
            >

              Cancel

            </button>

          </div>

        </form>

      </div>

    </div>
  );
}