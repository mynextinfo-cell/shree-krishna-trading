"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function AnalyticsChart({
  trades,
}: any) {

  const chartData = trades.map((trade: any, index: number) => {
    const pnl =
      (Number(trade.sell_price || 0) -
        Number(trade.buy_price || 0)) *
      Number(trade.quantity || 0);

    return {
      trade: index + 1,
      pnl,
    };
  });

  return (
    <div className="bg-[#050816] border border-zinc-900 rounded-3xl p-8 mt-14">

      <h2 className="text-3xl font-bold mb-8">
        Equity Curve
      </h2>

      <div className="h-[400px]">

        <ResponsiveContainer width="100%" height="100%">

          <LineChart data={chartData}>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="trade" />

            <YAxis />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="pnl"
              stroke="#8b5cf6"
              strokeWidth={3}
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}