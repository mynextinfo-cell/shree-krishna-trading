"use client";

import dynamic from "next/dynamic";

const AdvancedRealTimeChart = dynamic(
  async () => {
    const mod =
      await import(
        "react-ts-tradingview-widgets"
      );

    return mod.AdvancedRealTimeChart;
  },
  {
    ssr: false,
  }
);

export default function TradingViewChart() {

  return (

    <div className="bg-gradient-to-br from-lime-100 to-green-100 border border-lime-200 rounded-3xl overflow-hidden shadow-xl">

      {/* HEADER */}

      <div className="px-6 py-5 border-b border-lime-200">

        <h2 className="text-3xl font-bold text-zinc-800">

          Live Market Chart

        </h2>

        <p className="text-zinc-600 mt-1">

          Professional TradingView live chart

        </p>

      </div>

      {/* CHART */}

      <div className="h-[700px] rounded-b-3xl overflow-hidden">

        <AdvancedRealTimeChart
          theme="dark"
          symbol="NSE:NIFTY"
          timezone="Asia/Kolkata"
          locale="en"
          hide_top_toolbar={false}
          hide_legend={false}
          allow_symbol_change={true}
          autosize
        />

      </div>

    </div>
  );
}