"use client";

import { useEffect, useState } from "react";

import Sidebar from "@/components/Sidebar";

import YahooTicker from "@/components/live/YahooTicker";

import { supabase } from "@/lib/supabase";

export default function DashboardPage() {

  // LIVE CLOCK

  const [currentTime, setCurrentTime] =
    useState("");

  const [currentDate, setCurrentDate] =
    useState("");

  // TRADES

  const [trades, setTrades] =
    useState<any[]>([]);

  // PROFILE

  const [profile, setProfile] =
    useState<any>(null);

  // LOADING

  const [loading, setLoading] =
    useState(true);

  // FETCH TRADES

  const fetchTrades = async () => {

    setLoading(true);

    // CURRENT USER

    const {

      data: {
        user,
      },

    } = await supabase.auth.getUser();

    if (!user) {

      setLoading(false);

      return;
    }

    // FETCH PROFILE

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

    // BASE QUERY

    let query =
      supabase

        .from("trades")

        .select("*");

    // NORMAL USER

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

    // FETCH TRADES

    const {
      data,
      error,
    } = await query;

    if (error) {

      console.error(
        error
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

    fetchTrades();

  }, []);

  // LIVE CLOCK

  useEffect(() => {

    const updateClock = () => {

      const now =
        new Date();

      setCurrentTime(

        now.toLocaleTimeString(
          "en-IN",
          {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          }
        )
      );

      setCurrentDate(

        now.toLocaleDateString(
          "en-IN",
          {
            weekday: "short",
            day: "numeric",
            month: "short",
            year: "numeric",
          }
        )
      );
    };

    updateClock();

    const interval =
      setInterval(
        updateClock,
        1000
      );

    return () =>
      clearInterval(
        interval
      );

  }, []);

  // STATS

  const totalTrades =
    trades.length;

  const openTrades =
    trades.filter(
      (trade) =>
        trade.status ===
        "open"
    ).length;

  const closedTrades =
    trades.filter(
      (trade) =>
        trade.status ===
        "closed"
    ).length;

  const winningTrades =
    trades.filter(
      (trade) =>
        Number(
          trade.net_pnl
        ) > 0
    ).length;

  const losingTrades =
    trades.filter(
      (trade) =>
        Number(
          trade.net_pnl
        ) < 0
    ).length;

  // WIN RATE

  const winRate =

    closedTrades > 0

      ? (
          (
            winningTrades /
            closedTrades
          ) * 100
        ).toFixed(1)

      : "0";

  // TOTAL NET PNL

  const totalNetPnl =
    trades.reduce(

      (sum, trade) =>

        sum +

        Number(
          trade.net_pnl || 0
        ),

      0
    );

  // TOTAL INVESTMENT

  const totalInvestment =
    trades
      .filter(
        (trade) =>
          trade.status ===
          "open"
      )

      .reduce(

        (sum, trade) =>

          sum +

          (
            Number(
              trade.entry_price
            ) *

            Number(
              trade.quantity
            )
          ),

        0
      );

  return (

    <div className="flex min-h-screen bg-[#fff1f7]">

      {/* SIDEBAR */}

      <Sidebar />

      {/* MAIN */}

      <main className="flex-1 p-6 overflow-y-auto">

        {/* TICKER */}

        <div className="mb-6">

          <YahooTicker />

        </div>

        {/* HEADER */}

        <div className="bg-gradient-to-r from-pink-500 to-rose-400 rounded-3xl p-8 shadow-xl mb-6">

          <div className="flex items-start justify-between gap-6">

            {/* LEFT */}

            <div>

              <h1 className="text-4xl font-bold text-white">

                Shree Krishna Trading

              </h1>

              <p className="text-white/90 text-lg mt-3 font-semibold">

                Founder & CEO: Sanjay Mondal

              </p>

              {/* ROLE */}

              <div className="mt-4">

                <span className={`px-4 py-2 rounded-full text-sm font-bold

                  ${
                    profile?.role ===
                    "admin"

                      ? "bg-red-100 text-red-600"

                      : "bg-white text-pink-600"
                  }
                `}>

                  Logged in as:

                  {" "}

                  {profile?.role || "user"}

                </span>

              </div>

            </div>

            {/* CLOCK */}

            <div className="bg-white/20 backdrop-blur-md rounded-2xl px-5 py-3 border border-white/20 shadow-lg">

              <h2 className="text-lg font-bold text-black text-right">

                {currentTime}

              </h2>

              <p className="text-xs text-black text-right mt-1">

                {currentDate}

              </p>

            </div>

          </div>

        </div>

        {/* LOADING */}

        {loading && (

          <div className="bg-white rounded-3xl shadow-lg border border-pink-100 p-10 text-center text-zinc-500 mb-6">

            Loading Dashboard...

          </div>
        )}

        {/* STATS */}

        {!loading && (

          <>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">

              {/* TOTAL TRADES */}

              <div className="bg-white rounded-2xl p-4 shadow-md border border-pink-100">

                <p className="text-zinc-500 text-sm">

                  Total Trades

                </p>

                <h2 className="text-2xl font-bold text-zinc-800 mt-2">

                  {totalTrades}

                </h2>

              </div>

              {/* OPEN POSITIONS */}

              <div className="bg-white rounded-2xl p-4 shadow-md border border-pink-100">

                <p className="text-zinc-500 text-sm">

                  Open Positions

                </p>

                <h2 className="text-2xl font-bold text-yellow-600 mt-2">

                  {openTrades}

                </h2>

              </div>

              {/* CLOSED TRADES */}

              <div className="bg-white rounded-2xl p-4 shadow-md border border-pink-100">

                <p className="text-zinc-500 text-sm">

                  Closed Trades

                </p>

                <h2 className="text-2xl font-bold text-blue-600 mt-2">

                  {closedTrades}

                </h2>

              </div>

              {/* WIN RATE */}

              <div className="bg-white rounded-2xl p-4 shadow-md border border-pink-100">

                <p className="text-zinc-500 text-sm">

                  Win Rate

                </p>

                <h2 className="text-2xl font-bold text-green-600 mt-2">

                  {winRate}%

                </h2>

              </div>

              {/* TOTAL NET PNL */}

              <div className="bg-white rounded-2xl p-4 shadow-md border border-pink-100">

                <p className="text-zinc-500 text-sm">

                  Total Net P&L

                </p>

                <h2 className={`text-2xl font-bold mt-2

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

              {/* TOTAL INVESTMENT */}

              <div className="bg-white rounded-2xl p-4 shadow-md border border-pink-100">

                <p className="text-zinc-500 text-sm">

                  Total Investment

                </p>

                <h2 className="text-2xl font-bold text-zinc-800 mt-2">

                  ₹
                  {totalInvestment.toFixed(2)}

                </h2>

              </div>

              {/* WINNING TRADES */}

              <div className="bg-white rounded-2xl p-4 shadow-md border border-pink-100">

                <p className="text-zinc-500 text-sm">

                  Winning Trades

                </p>

                <h2 className="text-2xl font-bold text-green-600 mt-2">

                  {winningTrades}

                </h2>

              </div>

              {/* LOSING TRADES */}

              <div className="bg-white rounded-2xl p-4 shadow-md border border-pink-100">

                <p className="text-zinc-500 text-sm">

                  Losing Trades

                </p>

                <h2 className="text-2xl font-bold text-red-500 mt-2">

                  {losingTrades}

                </h2>

              </div>

            </div>

            {/* MAIN PANEL */}

            <div className="bg-white rounded-3xl shadow-lg border border-pink-100 p-8">

              <h2 className="text-3xl font-bold text-zinc-800 mb-4">

                Trading Overview

              </h2>

              <p className="text-zinc-600 text-lg leading-relaxed">

                Welcome to your professional trading operating system.
                Portfolio, journal, ledger and analytics are now
                connected with multi-user secure Supabase backend.

              </p>

              <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-4">

                <div className="bg-pink-50 rounded-2xl p-5 border border-pink-100">

                  <h3 className="font-bold text-zinc-800">

                    Portfolio Sync

                  </h3>

                  <p className="text-sm text-zinc-500 mt-2">

                    Auto synced with open trades.

                  </p>

                </div>

                <div className="bg-pink-50 rounded-2xl p-5 border border-pink-100">

                  <h3 className="font-bold text-zinc-800">

                    Ledger Sync

                  </h3>

                  <p className="text-sm text-zinc-500 mt-2">

                    Closed trades auto update.

                  </p>

                </div>

                <div className="bg-pink-50 rounded-2xl p-5 border border-pink-100">

                  <h3 className="font-bold text-zinc-800">

                    Analytics

                  </h3>

                  <p className="text-sm text-zinc-500 mt-2">

                    Real-time trading performance.

                  </p>

                </div>

                <div className="bg-pink-50 rounded-2xl p-5 border border-pink-100">

                  <h3 className="font-bold text-zinc-800">

                    Database

                  </h3>

                  <p className="text-sm text-zinc-500 mt-2">

                    Secure multi-user Supabase system connected.

                  </p>

                </div>

              </div>

            </div>

          </>
        )}

      </main>

    </div>
  );
}