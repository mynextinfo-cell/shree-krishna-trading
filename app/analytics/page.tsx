"use client";

import { useEffect, useState } from "react";

import Sidebar from "@/components/Sidebar";

import { supabase } from "@/lib/supabase";

import {

  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,

} from "recharts";

export default function AnalyticsPage() {

  // PROFILE

  const [profile, setProfile] =
    useState<any>(null);

  // TRADES

  const [trades, setTrades] =
    useState<any[]>([]);

  // LOADING

  const [loading, setLoading] =
    useState(true);

  // FILTERS

  const [search, setSearch] =
    useState("");

  const [segmentFilter, setSegmentFilter] =
    useState("ALL");

  // FETCH DATA

  const fetchAnalytics =
    async () => {

      setLoading(true);

      // USER

      const {

        data: {
          user,
        },

      } = await supabase.auth.getUser();

      if (!user) {

        setLoading(false);

        return;
      }

      // PROFILE

      const {
        data: profileData,
      } = await supabase

        .from("profiles")

        .select("*")

        .eq(
          "id",
          user.id
        )

        .single();

      setProfile(
        profileData
      );

      // QUERY

      let query =
        supabase

          .from("trades")

          .select("*")

          .eq(
            "status",
            "closed"
          );

      // ADMIN FILTER

      if (
        profileData?.role !==
        "admin"
      ) {

        query =
          query.eq(
            "user_id",
            user.id
          );
      }

      // FETCH

      const {
        data,
        error,
      } = await query.order(
        "created_at",
        {
          ascending: true,
        }
      );

      if (error) {

        console.error(
          error
        );

        alert(
          "Failed to fetch analytics ❌"
        );

        setLoading(false);

        return;
      }

      setTrades(
        data || []
      );

      setLoading(false);
    };

  // FETCH

  useEffect(() => {

    fetchAnalytics();

  }, []);

  // FILTERED TRADES

  const filteredTrades =
    trades.filter(
      (trade) => {

        const matchesSearch =

          trade.stock_name

            ?.toLowerCase()

            .includes(
              search.toLowerCase()
            );

        const matchesSegment =

          segmentFilter ===
          "ALL"

            ? true

            : trade.segment ===
              segmentFilter;

        return (
          matchesSearch &&
          matchesSegment
        );
      }
    );

  // TOTAL PNL

  const totalNetPnl =
    filteredTrades.reduce(

      (sum, trade) =>

        sum +

        Number(
          trade.net_pnl || 0
        ),

      0
    );

  // WINNING

  const winningTrades =
    filteredTrades.filter(
      (trade) =>
        Number(
          trade.net_pnl
        ) > 0
    );

  // LOSING

  const losingTrades =
    filteredTrades.filter(
      (trade) =>
        Number(
          trade.net_pnl
        ) < 0
    );

  // WIN RATE

  const winRate =

    filteredTrades.length > 0

      ? (
          (
            winningTrades.length /
            filteredTrades.length
          ) * 100
        ).toFixed(1)

      : "0";

  // AVG PROFIT

  const averageProfit =

    winningTrades.length > 0

      ? (
          winningTrades.reduce(

            (sum, trade) =>

              sum +

              Number(
                trade.net_pnl
              ),

            0
          ) /

          winningTrades.length
        ).toFixed(2)

      : "0";

  // AVG LOSS

  const averageLoss =

    losingTrades.length > 0

      ? (
          losingTrades.reduce(

            (sum, trade) =>

              sum +

              Number(
                trade.net_pnl
              ),

            0
          ) /

          losingTrades.length
        ).toFixed(2)

      : "0";

  // TOTAL BROKERAGE

  const totalBrokerage =
    filteredTrades.reduce(

      (sum, trade) =>

        sum +

        Number(
          trade.brokerage || 0
        ),

      0
    );

  // TOTAL TAXES

  const totalTaxes =
    filteredTrades.reduce(

      (sum, trade) =>

        sum +

        Number(
          trade.taxes || 0
        ),

      0
    );

  // BEST TRADE

  const bestTrade =
    Math.max(

      ...filteredTrades.map(
        (trade) =>
          Number(
            trade.net_pnl || 0
          )
      ),

      0
    );

  // WORST TRADE

  const worstTrade =
    Math.min(

      ...filteredTrades.map(
        (trade) =>
          Number(
            trade.net_pnl || 0
          )
      ),

      0
    );

  // EQUITY CURVE

  let cumulative = 0;

  const equityCurveData =
    filteredTrades.map(
      (trade, index) => {

        cumulative +=
          Number(
            trade.net_pnl || 0
          );

        return {

          trade:
            index + 1,

          pnl:
            cumulative,
        };
      }
    );

  // WIN LOSS PIE

  const pieData = [

    {
      name: "Wins",
      value:
        winningTrades.length,
    },

    {
      name: "Losses",
      value:
        losingTrades.length,
    },
  ];

  // MONTHLY DATA

  const monthlyDataMap:
    any = {};

  filteredTrades.forEach(
    (trade) => {

      const month =
        new Date(
          trade.created_at
        ).toLocaleString(
          "default",
          {
            month: "short",
          }
        );

      if (
        !monthlyDataMap[
          month
        ]
      ) {

        monthlyDataMap[
          month
        ] = 0;
      }

      monthlyDataMap[
        month
      ] += Number(
        trade.net_pnl || 0
      );
    }
  );

  const monthlyData =
    Object.keys(
      monthlyDataMap
    ).map(
      (month) => ({

        month,

        pnl:
          monthlyDataMap[
            month
          ],
      })
    );

  return (

    <div className="flex min-h-screen bg-[#fdfcff]">

      {/* SIDEBAR */}

      <Sidebar />

      {/* MAIN */}

      <main className="flex-1 p-6 overflow-y-auto">

        {/* HEADER */}

        <div className="bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-3xl p-8 shadow-xl mb-6">

          <div className="flex items-start justify-between">

            <div>

              <h1 className="text-4xl font-bold text-white">

                Advanced Analytics

              </h1>

              <p className="text-white/90 text-lg mt-3">

                AI powered performance tracking dashboard.

              </p>

              {/* ROLE */}

              <div className="mt-4">

                <span className={`px-4 py-2 rounded-full text-sm font-bold

                  ${
                    profile?.role ===
                    "admin"

                      ? "bg-red-100 text-red-600"

                      : "bg-white text-violet-600"
                  }
                `}>

                  Logged in as:

                  {" "}

                  {profile?.role || "user"}

                </span>

              </div>

            </div>

          </div>

        </div>

        {/* LOADING */}

        {loading && (

          <div className="bg-white rounded-3xl shadow-lg border border-violet-100 p-10 text-center text-zinc-500">

            Loading Analytics...

          </div>
        )}

        {/* CONTENT */}

        {!loading && (

          <>

            {/* FILTERS */}

            <div className="bg-white rounded-3xl shadow-lg border border-violet-100 p-5 mb-6">

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                {/* SEARCH */}

                <input

                  type="text"

                  placeholder="Search Stock..."

                  value={search}

                  onChange={(e) =>
                    setSearch(
                      e.target.value
                    )
                  }

                  className="border border-violet-200 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-violet-400"
                />

                {/* SEGMENT */}

                <select

                  value={segmentFilter}

                  onChange={(e) =>
                    setSegmentFilter(
                      e.target.value
                    )
                  }

                  className="border border-violet-200 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-violet-400"
                >

                  <option value="ALL">

                    All Segments

                  </option>

                  <option value="Equity">

                    Equity

                  </option>

                  <option value="Options">

                    Options

                  </option>

                  <option value="Futures">

                    Futures

                  </option>

                  <option value="Crypto">

                    Crypto

                  </option>

                  <option value="Forex">

                    Forex

                  </option>

                </select>

              </div>

            </div>

            {/* SUMMARY */}

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">

              <div className="bg-white rounded-2xl p-5 shadow-md border border-violet-100">

                <p className="text-zinc-500 text-sm">

                  Total Net P&L

                </p>

                <h2 className={`text-3xl font-bold mt-2

                  ${
                    totalNetPnl >= 0

                      ? "text-green-600"

                      : "text-red-500"
                  }
                `}>

                  ₹
                  {totalNetPnl.toFixed(2)}

                </h2>

              </div>

              <div className="bg-white rounded-2xl p-5 shadow-md border border-violet-100">

                <p className="text-zinc-500 text-sm">

                  Win Rate

                </p>

                <h2 className="text-3xl font-bold text-blue-600 mt-2">

                  {winRate}%

                </h2>

              </div>

              <div className="bg-white rounded-2xl p-5 shadow-md border border-violet-100">

                <p className="text-zinc-500 text-sm">

                  Avg Profit

                </p>

                <h2 className="text-3xl font-bold text-green-600 mt-2">

                  ₹
                  {averageProfit}

                </h2>

              </div>

              <div className="bg-white rounded-2xl p-5 shadow-md border border-violet-100">

                <p className="text-zinc-500 text-sm">

                  Avg Loss

                </p>

                <h2 className="text-3xl font-bold text-red-500 mt-2">

                  ₹
                  {averageLoss}

                </h2>

              </div>

            </div>

            {/* SECOND ROW */}

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">

              <div className="bg-white rounded-2xl p-5 shadow-md border border-violet-100">

                <p className="text-zinc-500 text-sm">

                  Total Brokerage

                </p>

                <h2 className="text-3xl font-bold text-orange-500 mt-2">

                  ₹
                  {totalBrokerage.toFixed(2)}

                </h2>

              </div>

              <div className="bg-white rounded-2xl p-5 shadow-md border border-violet-100">

                <p className="text-zinc-500 text-sm">

                  Total Taxes

                </p>

                <h2 className="text-3xl font-bold text-pink-500 mt-2">

                  ₹
                  {totalTaxes.toFixed(2)}

                </h2>

              </div>

              <div className="bg-white rounded-2xl p-5 shadow-md border border-violet-100">

                <p className="text-zinc-500 text-sm">

                  Best Trade

                </p>

                <h2 className="text-3xl font-bold text-green-600 mt-2">

                  ₹
                  {bestTrade.toFixed(2)}

                </h2>

              </div>

              <div className="bg-white rounded-2xl p-5 shadow-md border border-violet-100">

                <p className="text-zinc-500 text-sm">

                  Worst Trade

                </p>

                <h2 className="text-3xl font-bold text-red-500 mt-2">

                  ₹
                  {worstTrade.toFixed(2)}

                </h2>

              </div>

            </div>

            {/* CHARTS */}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">

              {/* EQUITY CURVE */}

              <div className="bg-white rounded-3xl shadow-lg border border-violet-100 p-6">

                <h2 className="text-2xl font-bold text-zinc-800 mb-6">

                  Equity Curve

                </h2>

                <div className="h-[300px]">

                  <ResponsiveContainer
                    width="100%"
                    height="100%"
                  >

                    <LineChart
                      data={
                        equityCurveData
                      }
                    >

                      <XAxis
                        dataKey="trade"
                      />

                      <YAxis />

                      <Tooltip />

                      <Line

                        type="monotone"

                        dataKey="pnl"

                        stroke="#7c3aed"

                        strokeWidth={3}
                      />

                    </LineChart>

                  </ResponsiveContainer>

                </div>

              </div>

              {/* WIN LOSS PIE */}

              <div className="bg-white rounded-3xl shadow-lg border border-violet-100 p-6">

                <h2 className="text-2xl font-bold text-zinc-800 mb-6">

                  Win vs Loss

                </h2>

                <div className="h-[300px]">

                  <ResponsiveContainer
                    width="100%"
                    height="100%"
                  >

                    <PieChart>

                      <Pie

                        data={pieData}

                        dataKey="value"

                        outerRadius={100}

                        label
                      >

                        <Cell fill="#22c55e" />

                        <Cell fill="#ef4444" />

                      </Pie>

                      <Tooltip />

                    </PieChart>

                  </ResponsiveContainer>

                </div>

              </div>

            </div>

            {/* MONTHLY BAR */}

            <div className="bg-white rounded-3xl shadow-lg border border-violet-100 p-6">

              <h2 className="text-2xl font-bold text-zinc-800 mb-6">

                Monthly P&L

              </h2>

              <div className="h-[350px]">

                <ResponsiveContainer
                  width="100%"
                  height="100%"
                >

                  <BarChart
                    data={monthlyData}
                  >

                    <XAxis
                      dataKey="month"
                    />

                    <YAxis />

                    <Tooltip />

                    <Bar
                      dataKey="pnl"
                      fill="#8b5cf6"
                    />

                  </BarChart>

                </ResponsiveContainer>

              </div>

            </div>

          </>
        )}

      </main>

    </div>
  );
}