"use client";

import Sidebar from "@/components/Sidebar";

export default function ChartPage() {

  const charts = [

    {
      title: "NIFTY 50",
      value: "24,850",
      change: "+0.45%",
      color: "text-green-600",
    },

    {
      title: "BANKNIFTY",
      value: "55,210",
      change: "-0.32%",
      color: "text-red-500",
    },

    {
      title: "SENSEX",
      value: "81,720",
      change: "+0.40%",
      color: "text-green-600",
    },

    {
      title: "NASDAQ",
      value: "18,650",
      change: "+1.12%",
      color: "text-green-600",
    },
  ];

  return (

    <div className="flex min-h-screen bg-[#f5f7ff]">

      {/* SIDEBAR */}

      <Sidebar />

      {/* MAIN CONTENT */}

      <main className="flex-1 p-6 overflow-y-auto">

        {/* HEADER */}

        <div className="bg-gradient-to-r from-blue-500 to-indigo-500 rounded-3xl p-8 shadow-xl mb-6">

          <h1 className="text-4xl font-bold text-white">

            Market Charts

          </h1>

          <p className="text-white/90 text-lg mt-3">

            Track market indices and stock performance.

          </p>

        </div>

        {/* SUMMARY CARDS */}

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">

          {charts.map((chart) => (

            <div
              key={chart.title}
              className="bg-white rounded-2xl p-4 shadow-md border border-blue-100"
            >

              <p className="text-zinc-500 text-sm">

                {chart.title}

              </p>

              <h2 className="text-2xl font-bold text-zinc-800 mt-2">

                {chart.value}

              </h2>

              <p className={`font-semibold mt-1 ${chart.color}`}>

                {chart.change}

              </p>

            </div>
          ))}

        </div>

        {/* CHART SECTION */}

        <div className="bg-white rounded-3xl shadow-lg border border-blue-100 p-6">

          <h2 className="text-2xl font-bold text-zinc-800 mb-6">

            Live Market Overview

          </h2>

          {/* MOCK CHART */}

          <div className="h-[400px] bg-gradient-to-br from-blue-50 to-indigo-100 rounded-3xl flex items-center justify-center">

            <div className="text-center">

              <h3 className="text-3xl font-bold text-indigo-600">

                Trading Charts Coming Soon 🚀

              </h3>

              <p className="text-zinc-600 mt-4 text-lg">

                TradingView style live chart integration will appear here.

              </p>

            </div>

          </div>

        </div>

      </main>

    </div>
  );
}