"use client";

import { useEffect, useState } from "react";

import Sidebar from "@/components/Sidebar";

import { supabase } from "@/lib/supabase";

import {

  exportTradesToPDF,
  exportTradesToCSV,

} from "@/lib/exportTrades";

export default function LedgerPage() {

  // PROFILE

  const [profile, setProfile] =
    useState<any>(null);

  // CLOSED TRADES

  const [closedTrades, setClosedTrades] =
    useState<any[]>([]);

  // LOADING

  const [loading, setLoading] =
    useState(true);

  // SEARCH + FILTER

  const [search, setSearch] =
    useState("");

  const [sideFilter, setSideFilter] =
    useState("ALL");

  // PAGINATION

  const [currentPage, setCurrentPage] =
    useState(1);

  const tradesPerPage = 10;

  // FETCH LEDGER

  const fetchLedger = async () => {

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

    // BASE QUERY

    let query =
      supabase

        .from("trades")

        .select("*")

        .eq(
          "status",
          "closed"
        );

    // USER FILTER

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

    // FETCH DATA

    const {
      data,
      error,
    } = await query.order(
      "created_at",
      {
        ascending: false,
      }
    );

    if (error) {

      console.error(
        error
      );

      alert(
        "Failed to fetch ledger ❌"
      );

      setLoading(false);

      return;
    }

    setClosedTrades(
      data || []
    );

    setLoading(false);
  };

  // FETCH

  useEffect(() => {

    fetchLedger();

  }, []);

  // TOTAL NET PNL

  const totalNetPnl =
    closedTrades.reduce(

      (sum, trade) =>

        sum +

        Number(
          trade.net_pnl || 0
        ),

      0
    );

  // WINNING TRADES

  const winningTrades =
    closedTrades.filter(
      (trade) =>
        Number(
          trade.net_pnl
        ) > 0
    ).length;

  // LOSING TRADES

  const losingTrades =
    closedTrades.filter(
      (trade) =>
        Number(
          trade.net_pnl
        ) < 0
    ).length;

  // WIN RATE

  const winRate =

    closedTrades.length > 0

      ? (
          (
            winningTrades /
            closedTrades.length
          ) * 100
        ).toFixed(1)

      : "0";

  // FILTERED TRADES

  const filteredTrades =
    closedTrades.filter(
      (trade) => {

        const matchesSearch =

          trade.stock_name

            ?.toLowerCase()

            .includes(
              search.toLowerCase()
            );

        const matchesSide =

          sideFilter ===
          "ALL"

            ? true

            : trade.side ===
              sideFilter;

        return (
          matchesSearch &&
          matchesSide
        );
      }
    );

  // PAGINATION

  const indexOfLastTrade =
    currentPage *
    tradesPerPage;

  const indexOfFirstTrade =
    indexOfLastTrade -
    tradesPerPage;

  const currentTrades =
    filteredTrades.slice(

      indexOfFirstTrade,

      indexOfLastTrade
    );

  const totalPages =
    Math.ceil(

      filteredTrades.length /

      tradesPerPage
    );

  return (

    <div className="flex min-h-screen bg-[#f9fff2]">

      {/* SIDEBAR */}

      <Sidebar />

      {/* MAIN */}

      <main className="flex-1 p-6 overflow-y-auto">

        {/* HEADER */}

        <div className="bg-gradient-to-r from-emerald-500 to-lime-400 rounded-3xl p-8 shadow-xl mb-6">

          <div className="flex items-start justify-between gap-6">

            {/* LEFT */}

            <div>

              <h1 className="text-4xl font-bold text-white">

                Trading Ledger

              </h1>

              <p className="text-white/90 text-lg mt-3">

                Realized profits and loss accounting system.

              </p>

              {/* ROLE */}

              <div className="mt-4">

                <span className={`px-4 py-2 rounded-full text-sm font-bold

                  ${
                    profile?.role ===
                    "admin"

                      ? "bg-red-100 text-red-600"

                      : "bg-white text-emerald-600"
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

          <div className="bg-white rounded-3xl shadow-lg border border-emerald-100 p-10 text-center text-zinc-500 mb-6">

            Loading Ledger...

          </div>
        )}

        {/* CONTENT */}

        {!loading && (

          <>

            {/* SUMMARY */}

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">

              <div className="bg-white rounded-2xl p-4 shadow-md border border-emerald-100">

                <p className="text-zinc-500 text-sm">

                  Closed Trades

                </p>

                <h2 className="text-2xl font-bold text-zinc-800 mt-2">

                  {closedTrades.length}

                </h2>

              </div>

              <div className="bg-white rounded-2xl p-4 shadow-md border border-emerald-100">

                <p className="text-zinc-500 text-sm">

                  Winning Trades

                </p>

                <h2 className="text-2xl font-bold text-green-600 mt-2">

                  {winningTrades}

                </h2>

              </div>

              <div className="bg-white rounded-2xl p-4 shadow-md border border-emerald-100">

                <p className="text-zinc-500 text-sm">

                  Losing Trades

                </p>

                <h2 className="text-2xl font-bold text-red-500 mt-2">

                  {losingTrades}

                </h2>

              </div>

              <div className="bg-white rounded-2xl p-4 shadow-md border border-emerald-100">

                <p className="text-zinc-500 text-sm">

                  Win Rate

                </p>

                <h2 className="text-2xl font-bold text-blue-600 mt-2">

                  {winRate}%

                </h2>

              </div>

            </div>

            {/* SEARCH + FILTER */}

            <div className="bg-white rounded-3xl shadow-lg border border-emerald-100 p-5 mb-6">

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                {/* SEARCH */}

                <input

                  type="text"

                  placeholder="Search Closed Trades..."

                  value={search}

                  onChange={(e) =>
                    setSearch(
                      e.target.value
                    )
                  }

                  className="border border-emerald-200 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-400"
                />

                {/* SIDE FILTER */}

                <select

                  value={sideFilter}

                  onChange={(e) =>
                    setSideFilter(
                      e.target.value
                    )
                  }

                  className="border border-emerald-200 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-400"
                >

                  <option value="ALL">

                    All Sides

                  </option>

                  <option value="BUY">

                    BUY

                  </option>

                  <option value="SELL">

                    SELL

                  </option>

                </select>

              </div>

            </div>

            {/* EXPORT BUTTONS */}

            <div className="flex flex-wrap gap-4 mb-6">

              {/* PDF */}

              <button

                onClick={() =>

                  exportTradesToPDF(

                    filteredTrades,

                    "Ledger Report"
                  )
                }

                className="bg-red-500 hover:bg-red-600 text-white font-bold px-6 py-3 rounded-2xl shadow-lg transition-all duration-300"
              >

                Export PDF

              </button>

              {/* EXCEL */}

              <button

                onClick={() =>

                  exportTradesToCSV(

                    filteredTrades,

                    "ledger-report"
                  )
                }

                className="bg-green-500 hover:bg-green-600 text-white font-bold px-6 py-3 rounded-2xl shadow-lg transition-all duration-300"
              >

                Export Excel

              </button>

            </div>

            {/* NET PNL */}

            <div className="bg-white rounded-3xl shadow-lg border border-emerald-100 p-6 mb-6">

              <h2 className="text-2xl font-bold text-zinc-800 mb-4">

                Total Realized Net P&L

              </h2>

              <h3 className={`text-5xl font-bold

                ${
                  totalNetPnl >= 0

                    ? "text-green-600"

                    : "text-red-500"
                }
              `}>

                ₹
                {totalNetPnl.toFixed(2)}

              </h3>

            </div>

            {/* TABLE */}

            <div className="bg-white rounded-3xl shadow-lg border border-emerald-100 overflow-hidden">

              <div className="p-6 border-b border-emerald-100">

                <h2 className="text-2xl font-bold text-zinc-800">

                  Closed Trade Ledger

                </h2>

              </div>

              <div className="overflow-x-auto">

                <table className="w-full">

                  <thead className="bg-emerald-50">

                    <tr>

                      <th className="text-left px-6 py-4">

                        S.No

                      </th>

                      <th className="text-left px-6 py-4">

                        Stock

                      </th>

                      <th className="text-left px-6 py-4">

                        Side

                      </th>

                      <th className="text-left px-6 py-4">

                        Qty

                      </th>

                      <th className="text-left px-6 py-4">

                        Entry

                      </th>

                      <th className="text-left px-6 py-4">

                        Exit

                      </th>

                      <th className="text-left px-6 py-4">

                        Brokerage

                      </th>

                      <th className="text-left px-6 py-4">

                        Taxes

                      </th>

                      <th className="text-left px-6 py-4">

                        Net P&L

                      </th>

                      <th className="text-left px-6 py-4">

                        Exit Date

                      </th>

                    </tr>

                  </thead>

                  <tbody>

                    {currentTrades.map(
                      (
                        trade,
                        index
                      ) => (

                        <tr
                          key={trade.id}
                          className="border-b border-emerald-50 hover:bg-emerald-50 transition"
                        >

                          {/* SERIAL */}

                          <td className="px-6 py-5 font-semibold text-zinc-500">

                            {indexOfFirstTrade + index + 1}

                          </td>

                          {/* STOCK */}

                          <td className="px-6 py-5 font-bold text-zinc-800">

                            {trade.stock_name}

                          </td>

                          {/* SIDE */}

                          <td className={`px-6 py-5 font-semibold

                            ${
                              trade.side === "BUY"

                                ? "text-green-600"

                                : "text-red-500"
                            }
                          `}>

                            {trade.side}

                          </td>

                          {/* QTY */}

                          <td className="px-6 py-5">

                            {trade.quantity}

                          </td>

                          {/* ENTRY */}

                          <td className="px-6 py-5">

                            ₹
                            {trade.entry_price}

                          </td>

                          {/* EXIT */}

                          <td className="px-6 py-5">

                            ₹
                            {trade.exit_price}

                          </td>

                          {/* BROKERAGE */}

                          <td className="px-6 py-5">

                            ₹
                            {trade.brokerage || 0}

                          </td>

                          {/* TAXES */}

                          <td className="px-6 py-5">

                            ₹
                            {trade.taxes || 0}

                          </td>

                          {/* NET PNL */}

                          <td className={`px-6 py-5 font-bold

                            ${
                              trade.net_pnl >= 0

                                ? "text-green-600"

                                : "text-red-500"
                            }
                          `}>

                            ₹
                            {trade.net_pnl}

                          </td>

                          {/* EXIT DATE */}

                          <td className="px-6 py-5">

                            {trade.exit_date || "-"}

                          </td>

                        </tr>
                      )
                    )}

                  </tbody>

                </table>

                {/* EMPTY */}

                {filteredTrades.length === 0 && (

                  <div className="p-10 text-center text-zinc-500">

                    No Closed Trades Found

                  </div>
                )}

              </div>

            </div>

            {/* PAGINATION */}

            <div className="flex items-center justify-center gap-3 mt-6">

              {/* PREVIOUS */}

              <button

                onClick={() =>
                  setCurrentPage(
                    (prev) =>
                      Math.max(
                        prev - 1,
                        1
                      )
                  )
                }

                className="bg-emerald-500 hover:bg-emerald-600 text-white px-5 py-2 rounded-xl font-semibold"
              >

                Previous

              </button>

              {/* PAGE */}

              <div className="bg-white border border-emerald-200 px-5 py-2 rounded-xl font-bold text-emerald-600 shadow-sm">

                Page {currentPage}
                {" / "}
                {totalPages || 1}

              </div>

              {/* NEXT */}

              <button

                onClick={() =>
                  setCurrentPage(
                    (prev) =>
                      Math.min(
                        prev + 1,
                        totalPages
                      )
                  )
                }

                className="bg-emerald-500 hover:bg-emerald-600 text-white px-5 py-2 rounded-xl font-semibold"
              >

                Next

              </button>

            </div>

          </>
        )}

      </main>

    </div>
  );
}