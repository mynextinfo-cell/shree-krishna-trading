"use client";

import {
  AdvancedRealTimeChart,
} from "react-ts-tradingview-widgets";

export default function LiveChart() {

  return (

    <div className="bg-[#050816] border border-zinc-900 rounded-3xl p-4 mt-14">

      <h2 className="text-3xl font-bold mb-6 px-4 pt-4">
        Live Market Chart
      </h2>

      <AdvancedRealTimeChart
        theme="dark"
        symbol="NSE:NIFTY"
        width="100%"
        height={600}
        autosize
      />

    </div>
  );
}