"use client";

import { useEffect, useState } from "react";

import {
  Wallet,
  TrendingUp,
  PieChart,
} from "lucide-react";

import Sidebar from "@/components/Sidebar";

import { supabase } from "@/lib/supabase";

export default function PortfolioPage() {

  const [trades, setTrades] = useState<any[]>([]);

  useEffect(() => {

    fetchTrades();

  }, []);

  const fetchTrades = async () => {

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { data } = await supabase
      .from("trades")
      .select("*")
      .eq("user_id", user.id);

    if (data) {
      setTrades(data);
    }
  };

  // CALCULATIONS
  const totalInvestment = trades.reduce(
    (acc, trade) =>
      acc +
      (
        Number(trade.buy_price || 0) *
        Number(trade.quantity || 0)
      ),
    0
  );

  const currentValue = trades.reduce(
    (acc, trade) =>
      acc +
      (
        Number(trade.sell_price || 0) *
        Number(trade.quantity || 0)
      ),
    0
  );

  const totalPnL =
    currentValue - totalInvestment;

  return (

    <div className="flex bg-black text-white min-h-screen">

      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN */}
      <main className="flex-1 p-6 md:p-10 pt-24 md:pt-10">

        {/* HEADER */}
        <div className="mb-10">

          <h1 className="text-4xl md:text-5xl font-bold">
            Portfolio
          </h1>

          <p className="text-zinc-400 mt-3">
            Holdings & investment overview
          </p>

        </div>

        {/* CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* INVESTMENT */}
          <div className="bg-[#07122b] border border-zinc-800 rounded-3xl p-6">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-zinc-400">
                  Total Investment
                </p>

                <h2 className="text-4xl font-bold mt-3">
                  ₹{totalInvestment.toFixed(2)}
                </h2>

              </div>

              <div className="bg-violet-500/20 p-4 rounded-2xl">
                <Wallet size={32} />
              </div>

            </div>

          </div>

          {/* CURRENT VALUE */}
          <div className="bg-[#07122b] border border-zinc-800 rounded-3xl p-6">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-zinc-400">
                  Current Value
                </p>

                <h2 className="text-4xl font-bold mt-3">
                  ₹{currentValue.toFixed(2)}
                </h2>

              </div>

              <div className="bg-green-500/20 p-4 rounded-2xl">
                <PieChart size={32} />
              </div>

            </div>

          </div>

          {/* TOTAL PNL */}
          <div className="bg-[#07122b] border border-zinc-800 rounded-3xl p-6">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-zinc-400">
                  Total Profit/Loss
                </p>

                <h2
                  className={`text-4xl font-bold mt-3 ${
                    totalPnL >= 0
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >
                  ₹{totalPnL.toFixed(2)}
                </h2>

              </div>

              <div className="bg-yellow-500/20 p-4 rounded-2xl">
                <TrendingUp size={32} />
              </div>

            </div>

          </div>

        </div>

        {/* HOLDINGS */}
        <div className="mt-14 bg-[#050816] border border-zinc-900 rounded-3xl p-6 md:p-8 overflow-x-auto">

          <h2 className="text-3xl font-bold mb-8">
            Holdings
          </h2>

          <table className="w-full min-w-[700px]">

            <thead className="border-b border-zinc-800 text-zinc-400">

              <tr>

                <th className="text-left p-4">
                  Asset
                </th>

                <th className="text-left p-4">
                  Quantity
                </th>

                <th className="text-left p-4">
                  Buy Price
                </th>

                <th className="text-left p-4">
                  Current Price
                </th>

                <th className="text-left p-4">
                  Value
                </th>

              </tr>

            </thead>

            <tbody>

              {trades.map((trade) => {

                const value =
                  Number(trade.sell_price || 0) *
                  Number(trade.quantity || 0);

                return (

                  <tr
                    key={trade.id}
                    className="border-b border-zinc-900 hover:bg-zinc-900/40 transition"
                  >

                    <td className="p-4">
                      {trade.stock_name}
                    </td>

                    <td className="p-4">
                      {trade.quantity}
                    </td>

                    <td className="p-4">
                      ₹{trade.buy_price}
                    </td>

                    <td className="p-4">
                      ₹{trade.sell_price}
                    </td>

                    <td className="p-4 font-bold">
                      ₹{value.toFixed(2)}
                    </td>

                  </tr>
                );
              })}

            </tbody>

          </table>

        </div>

      </main>

    </div>
  );
}