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

interface EquityCurveProps {

  equityCurveData: {

    trade: number;

    equity: number;

  }[];
}

export default function EquityCurve({

  equityCurveData,

}: EquityCurveProps) {

  return (

    <div className="bg-white border border-pink-100 rounded-3xl p-6 shadow-lg mb-6">

      {/* HEADER */}

      <div className="mb-6">

        <h2 className="text-3xl font-bold text-zinc-800">

          Equity Curve

        </h2>

        <p className="text-zinc-500 mt-1">

          Track your account growth over time

        </p>

      </div>

      {/* CHART */}

      <div className="h-[400px]">

        {equityCurveData.length === 0 ? (

          <div className="h-full flex items-center justify-center text-zinc-400 text-lg">

            No trade data available

          </div>

        ) : (

          <ResponsiveContainer
            width="100%"
            height="100%"
          >

            <LineChart
              data={
                equityCurveData
              }
            >

              {/* GRID */}

              <CartesianGrid
                strokeDasharray="3 3"
              />

              {/* X AXIS */}

              <XAxis
                dataKey="trade"
              />

              {/* Y AXIS */}

              <YAxis />

              {/* TOOLTIP */}

              <Tooltip />

              {/* LINE */}

              <Line
                type="monotone"
                dataKey="equity"
                stroke="#ec4899"
                strokeWidth={4}
              />

            </LineChart>

          </ResponsiveContainer>

        )}

      </div>

    </div>
  );
}