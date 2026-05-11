"use client";

import Sidebar from "@/components/Sidebar";
import TradingViewChart from "@/components/TradingViewChart";
import MarketTicker from "@/components/MarketTicker";

export default function DashboardPage() {

  const marketData = [
    {
      name: "NIFTY 50",
      value: "24,850.35",
      change: "+125.40",
      positive: true,
    },
    {
      name: "BANKNIFTY",
      value: "53,120.80",
      change: "-210.25",
      positive: false,
    },
    {
      name: "SENSEX",
      value: "81,245.65",
      change: "+310.75",
      positive: true,
    },
    {
      name: "NASDAQ",
      value: "19,210.45",
      change: "+95.15",
      positive: true,
    },
  ];

  return (

    <div className="flex min-h-screen bg-[#fff1f7]">

      {/* SIDEBAR */}

      <Sidebar />

      {/* MAIN CONTENT */}

      <main className="flex-1 p-4 md:p-6 overflow-y-auto">

        {/* HEADER */}

        <div className="bg-orange-500 rounded-3xl px-8 py-6 shadow-xl mb-6">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

            {/* LEFT */}

            <div>

              <h1 className="text-5xl font-extrabold text-white tracking-wide">

                Shree Krishna Trading

              </h1>

              <p className="text-white/90 mt-2 text-xl">

                Trust Commitment Growth

              </p>

            </div>

            {/* RIGHT */}

            <div className="bg-orange-400/40 rounded-2xl px-6 py-4 backdrop-blur-md">

              <p className="text-white text-lg font-semibold">

                Chairman: Sanjay Mondal

              </p>

            </div>

          </div>

        </div>

        {/* MARKET TICKER */}

        <MarketTicker />

        {/* MARKET OVERVIEW CARDS */}

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">

          {marketData.map((market) => (

            <div
              key={market.name}
              className="bg-gradient-to-br from-white to-pink-50 border border-pink-100 rounded-2xl px-5 py-4 shadow-md hover:scale-[1.02] transition-all duration-300"
            >

              {/* MARKET NAME */}

              <p className="text-zinc-500 text-xs font-medium">

                {market.name}

              </p>

              {/* MARKET VALUE */}

              <h2 className="text-3xl font-extrabold text-zinc-800 mt-2 leading-none">

                {market.value}

              </h2>

              {/* MARKET CHANGE */}

              <p
                className={`mt-3 text-xl font-bold ${
                  market.positive
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >

                {market.change}

              </p>

            </div>
          ))}

        </div>

        {/* LIVE CHART */}

        <div className="mb-6">

          <TradingViewChart />

        </div>

        {/* QUICK ANALYTICS */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">

          {/* PORTFOLIO */}

          <div className="bg-gradient-to-br from-white to-pink-50 border border-pink-100 rounded-2xl p-5 shadow-md">

            <p className="text-zinc-500 text-sm">

              Total Portfolio Value

            </p>

            <h2 className="text-3xl font-bold text-green-500 mt-2">

              ₹5,42,850

            </h2>

          </div>

          {/* DAILY PNL */}

          <div className="bg-gradient-to-br from-white to-pink-50 border border-pink-100 rounded-2xl p-5 shadow-md">

            <p className="text-zinc-500 text-sm">

              Today's Profit / Loss

            </p>

            <h2 className="text-3xl font-bold text-pink-500 mt-2">

              +₹12,450

            </h2>

          </div>

          {/* WIN RATE */}

          <div className="bg-gradient-to-br from-white to-pink-50 border border-pink-100 rounded-2xl p-5 shadow-md">

            <p className="text-zinc-500 text-sm">

              Win Rate

            </p>

            <h2 className="text-3xl font-bold text-orange-500 mt-2">

              68%

            </h2>

          </div>

        </div>

        {/* RECENT TRADES */}

        <div className="bg-gradient-to-br from-white to-pink-50 border border-pink-100 rounded-2xl p-5 shadow-md">

          <div className="flex items-center justify-between mb-5">

            <h2 className="text-2xl font-bold text-zinc-800">

              Recent Trades

            </h2>

            <button className="bg-pink-500 hover:bg-pink-600 text-white px-5 py-2 rounded-xl transition font-semibold">

              View All

            </button>

          </div>

          {/* TABLE */}

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead>

                <tr className="border-b border-pink-100 text-left">

                  <th className="py-3 text-zinc-500 font-medium">

                    Symbol

                  </th>

                  <th className="py-3 text-zinc-500 font-medium">

                    Type

                  </th>

                  <th className="py-3 text-zinc-500 font-medium">

                    Entry

                  </th>

                  <th className="py-3 text-zinc-500 font-medium">

                    Exit

                  </th>

                  <th className="py-3 text-zinc-500 font-medium">

                    P&L

                  </th>

                </tr>

              </thead>

              <tbody>

                <tr className="border-b border-pink-100 hover:bg-pink-50 transition">

                  <td className="py-4 text-zinc-800 font-medium">

                    NIFTY

                  </td>

                  <td className="py-4 text-green-500 font-semibold">

                    BUY

                  </td>

                  <td className="py-4 text-zinc-800">

                    24800

                  </td>

                  <td className="py-4 text-zinc-800">

                    24890

                  </td>

                  <td className="py-4 text-green-500 font-bold">

                    +₹6,750

                  </td>

                </tr>

                <tr className="border-b border-pink-100 hover:bg-pink-50 transition">

                  <td className="py-4 text-zinc-800 font-medium">

                    BANKNIFTY

                  </td>

                  <td className="py-4 text-red-500 font-semibold">

                    SELL

                  </td>

                  <td className="py-4 text-zinc-800">

                    53100

                  </td>

                  <td className="py-4 text-zinc-800">

                    52980

                  </td>

                  <td className="py-4 text-green-500 font-bold">

                    +₹4,200

                  </td>

                </tr>

                <tr className="hover:bg-pink-50 transition">

                  <td className="py-4 text-zinc-800 font-medium">

                    RELIANCE

                  </td>

                  <td className="py-4 text-green-500 font-semibold">

                    BUY

                  </td>

                  <td className="py-4 text-zinc-800">

                    2950

                  </td>

                  <td className="py-4 text-zinc-800">

                    2920

                  </td>

                  <td className="py-4 text-red-500 font-bold">

                    -₹1,850

                  </td>

                </tr>

              </tbody>

            </table>

          </div>

        </div>

      </main>

    </div>
  );
}