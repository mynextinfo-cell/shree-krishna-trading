"use client";

import { useEffect, useState } from "react";

import Sidebar from "@/components/Sidebar";

import TradeForm from "@/components/journal/TradeForm";

import CloseTradeModal from "@/components/journal/CloseTradeModal";

import EditTradeModal from "@/components/journal/EditTradeModal";

import ViewTradeModal from "@/components/journal/ViewTradeModal";

import { supabase } from "@/lib/supabase";

import {
  exportTradesToPDF,
  exportTradesToCSV,
} from "@/lib/exportTrades";

export default function JournalPage() {

  // CLOCK

  const [currentTime, setCurrentTime] =
    useState("");

  const [currentDate, setCurrentDate] =
    useState("");

  // PROFILE

  const [profile, setProfile] =
    useState<any>(null);

  // TRADES

  const [openTrades, setOpenTrades] =
    useState<any[]>([]);

  const [closedTrades, setClosedTrades] =
    useState<any[]>([]);

  // LOADING

  const [loading, setLoading] =
    useState(true);

  // MODALS

  const [selectedTrade, setSelectedTrade] =
    useState<any>(null);

  const [editTrade, setEditTrade] =
    useState<any>(null);

  const [viewTrade, setViewTrade] =
    useState<any>(null);

  // SEARCH + FILTER

  const [search, setSearch] =
    useState("");

  const [sideFilter, setSideFilter] =
    useState("ALL");

  const [statusFilter, setStatusFilter] =
    useState("ALL");

  // PAGINATION

  const [currentPage, setCurrentPage] =
    useState(1);

  const tradesPerPage = 10;

  // FETCH DATA

  const fetchTrades = async () => {

    setLoading(true);

    const {
      data: { user },
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

      .eq("id", user.id)

      .single();

    setProfile(profileData);

    // OPEN QUERY

    let openQuery =

      supabase

        .from("trades")

        .select("*")

        .eq("status", "open");

    // CLOSED QUERY

    let closedQuery =

      supabase

        .from("trades")

        .select("*")

        .eq("status", "closed");

    // USER FILTER

    if (
      profileData?.role !==
      "admin"
    ) {

      openQuery =
        openQuery.eq(
          "user_id",
          user.id
        );

      closedQuery =
        closedQuery.eq(
          "user_id",
          user.id
        );
    }

    // FETCH OPEN

    const {
      data: openData,
    } = await openQuery.order(
      "created_at",
      {
        ascending: false,
      }
    );

    // FETCH CLOSED

    const {
      data: closedData,
    } = await closedQuery.order(
      "created_at",
      {
        ascending: false,
      }
    );

    setOpenTrades(
      openData || []
    );

    setClosedTrades(
      closedData || []
    );

    setLoading(false);
  };

  // DELETE TRADE

  const handleDeleteTrade =
    async (
      id: string
    ) => {

      const confirmDelete =
        confirm(
          "Delete this trade permanently?"
        );

      if (!confirmDelete)
        return;

      const { error } =
        await supabase

          .from("trades")

          .delete()

          .eq("id", id);

      if (error) {

        console.error(error);

        alert(
          "Failed to delete trade ❌"
        );

        return;
      }

      alert(
        "Trade deleted successfully ✅"
      );

      fetchTrades();
    };

  // CLOCK

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

  // INITIAL FETCH

  useEffect(() => {

    fetchTrades();

  }, []);

  // TOTAL PNL

  const totalNetPnl =
    closedTrades.reduce(

      (sum, trade) =>

        sum +

        Number(
          trade.net_pnl || 0
        ),

      0
    );

  // FILTER OPEN

  const filteredOpenTrades =
    openTrades.filter(
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

        const matchesStatus =

          statusFilter ===
          "ALL"

            ? true

            : statusFilter ===
              "OPEN";

        return (
          matchesSearch &&
          matchesSide &&
          matchesStatus
        );
      }
    );

  // FILTER CLOSED

  const filteredClosedTrades =
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

        const matchesStatus =

          statusFilter ===
          "ALL"

            ? true

            : statusFilter ===
              "CLOSED";

        return (
          matchesSearch &&
          matchesSide &&
          matchesStatus
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

  const currentOpenTrades =
    filteredOpenTrades.slice(
      indexOfFirstTrade,
      indexOfLastTrade
    );

  const currentClosedTrades =
    filteredClosedTrades.slice(
      indexOfFirstTrade,
      indexOfLastTrade
    );

  const totalPages =
    Math.ceil(

      Math.max(

        filteredOpenTrades.length,

        filteredClosedTrades.length

      ) /

      tradesPerPage
    );

  return (

    <div className="flex min-h-screen bg-[#fff4f8]">

      {/* SIDEBAR */}

      <Sidebar />

      {/* MAIN */}

      <main className="flex-1 p-6 overflow-y-auto">

        {/* HEADER */}

        <div className="bg-gradient-to-r from-pink-500 to-rose-400 rounded-3xl p-8 shadow-xl mb-6">

          <div className="flex items-start justify-between gap-6">

            {/* LEFT */}

            <div>

              <h1 className="text-4xl font-bold text-white">

                Trading Journal

              </h1>

              <p className="text-white/90 text-lg mt-3">

                Professional AI powered visual trading journal.

              </p>

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

            Loading Journal...

          </div>
        )}

        {/* CONTENT */}

        {!loading && (

          <>

            {/* SUMMARY */}

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">

              <div className="bg-white rounded-2xl p-4 shadow-md border border-pink-100">

                <p className="text-zinc-500 text-sm">

                  Open Positions

                </p>

                <h2 className="text-2xl font-bold text-zinc-800 mt-2">

                  {openTrades.length}

                </h2>

              </div>

              <div className="bg-white rounded-2xl p-4 shadow-md border border-pink-100">

                <p className="text-zinc-500 text-sm">

                  Closed Trades

                </p>

                <h2 className="text-2xl font-bold text-zinc-800 mt-2">

                  {closedTrades.length}

                </h2>

              </div>

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

              <div className="bg-white rounded-2xl p-4 shadow-md border border-pink-100">

                <p className="text-zinc-500 text-sm">

                  Total Trades

                </p>

                <h2 className="text-2xl font-bold text-blue-600 mt-2">

                  {openTrades.length +
                    closedTrades.length}

                </h2>

              </div>

            </div>

            {/* FILTERS */}

            <div className="bg-white rounded-3xl shadow-lg border border-pink-100 p-5 mb-6">

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                <input

                  type="text"

                  placeholder="Search Stock..."

                  value={search}

                  onChange={(e) =>
                    setSearch(
                      e.target.value
                    )
                  }

                  className="border border-pink-200 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-pink-400"
                />

                <select

                  value={sideFilter}

                  onChange={(e) =>
                    setSideFilter(
                      e.target.value
                    )
                  }

                  className="border border-pink-200 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-pink-400"
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

                <select

                  value={statusFilter}

                  onChange={(e) =>
                    setStatusFilter(
                      e.target.value
                    )
                  }

                  className="border border-pink-200 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-pink-400"
                >

                  <option value="ALL">

                    All Status

                  </option>

                  <option value="OPEN">

                    OPEN

                  </option>

                  <option value="CLOSED">

                    CLOSED

                  </option>

                </select>

              </div>

            </div>

            {/* EXPORT */}

            <div className="flex flex-wrap gap-4 mb-6">

              <button

                onClick={() =>
                  exportTradesToPDF(
                    [...openTrades, ...closedTrades],
                    "Journal Report"
                  )
                }

                className="bg-red-500 hover:bg-red-600 text-white font-bold px-6 py-3 rounded-2xl shadow-lg"
              >

                Export PDF

              </button>

              <button

                onClick={() =>
                  exportTradesToCSV(
                    [...openTrades, ...closedTrades],
                    "journal-report"
                  )
                }

                className="bg-green-500 hover:bg-green-600 text-white font-bold px-6 py-3 rounded-2xl shadow-lg"
              >

                Export Excel

              </button>

            </div>

            {/* TRADE FORM */}

            <div className="mb-6">

              <TradeForm />

            </div>

            {/* OPEN POSITIONS */}

            <div className="bg-white rounded-3xl shadow-lg border border-pink-100 overflow-hidden mb-6">

              <div className="p-6 border-b border-pink-100">

                <h2 className="text-2xl font-bold text-zinc-800">

                  Open Positions

                </h2>

              </div>

              <div className="overflow-x-auto">

                <table className="w-full">

                  <thead className="bg-pink-50">

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
                        Status
                      </th>

                      <th className="text-left px-6 py-4">
                        Actions
                      </th>

                    </tr>

                  </thead>

                  <tbody>

                    {currentOpenTrades.map(
                      (
                        trade,
                        index
                      ) => (

                        <tr
                          key={trade.id}
                          className="border-b border-pink-50"
                        >

                          <td className="px-6 py-5 font-semibold text-zinc-500">

                            {indexOfFirstTrade + index + 1}

                          </td>

                          <td className="px-6 py-5 font-bold">

                            {trade.stock_name}

                          </td>

                          <td className={`px-6 py-5 font-semibold

                            ${
                              trade.side === "BUY"

                                ? "text-green-600"

                                : "text-red-500"
                            }
                          `}>

                            {trade.side}

                          </td>

                          <td className="px-6 py-5">

                            {trade.quantity}

                          </td>

                          <td className="px-6 py-5">

                            ₹
                            {trade.entry_price}

                          </td>

                          <td className="px-6 py-5">

                            <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-semibold">

                              OPEN

                            </span>

                          </td>

                          <td className="px-6 py-5">

                            <div className="flex flex-wrap gap-2">

                              <button

                                onClick={() =>
                                  setViewTrade(
                                    trade
                                  )
                                }

                                className="bg-violet-500 hover:bg-violet-600 text-white px-4 py-2 rounded-xl font-semibold"
                              >

                                View

                              </button>

                              <button

                                onClick={() =>
                                  setSelectedTrade(
                                    trade
                                  )
                                }

                                className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-xl font-semibold"
                              >

                                Close

                              </button>

                              <button

                                onClick={() =>
                                  setEditTrade(
                                    trade
                                  )
                                }

                                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl font-semibold"
                              >

                                Edit

                              </button>

                              <button

                                onClick={() =>
                                  handleDeleteTrade(
                                    trade.id
                                  )
                                }

                                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl font-semibold"
                              >

                                Delete

                              </button>

                            </div>

                          </td>

                        </tr>
                      )
                    )}

                  </tbody>

                </table>

              </div>

            </div>

            {/* PAGINATION */}

            <div className="flex items-center justify-center gap-3 mb-6">

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

                className="bg-pink-500 hover:bg-pink-600 text-white px-5 py-2 rounded-xl font-semibold"
              >

                Previous

              </button>

              <div className="bg-white border border-pink-200 px-5 py-2 rounded-xl font-bold text-pink-600 shadow-sm">

                Page {currentPage}
                {" / "}
                {totalPages || 1}

              </div>

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

                className="bg-pink-500 hover:bg-pink-600 text-white px-5 py-2 rounded-xl font-semibold"
              >

                Next

              </button>

            </div>

            {/* CLOSED TRADES */}

            <div className="bg-white rounded-3xl shadow-lg border border-pink-100 overflow-hidden">

              <div className="p-6 border-b border-pink-100">

                <h2 className="text-2xl font-bold text-zinc-800">

                  Closed Trades

                </h2>

              </div>

              <div className="overflow-x-auto">

                <table className="w-full">

                  <thead className="bg-pink-50">

                    <tr>

                      <th className="text-left px-6 py-4">
                        S.No
                      </th>

                      <th className="text-left px-6 py-4">
                        Stock
                      </th>

                      <th className="text-left px-6 py-4">
                        Entry
                      </th>

                      <th className="text-left px-6 py-4">
                        Exit
                      </th>

                      <th className="text-left px-6 py-4">
                        Net P&L
                      </th>

                      <th className="text-left px-6 py-4">
                        View
                      </th>

                    </tr>

                  </thead>

                  <tbody>

                    {currentClosedTrades.map(
                      (
                        trade,
                        index
                      ) => (

                        <tr
                          key={trade.id}
                          className="border-b border-pink-50"
                        >

                          <td className="px-6 py-5 font-semibold text-zinc-500">

                            {indexOfFirstTrade + index + 1}

                          </td>

                          <td className="px-6 py-5 font-bold">

                            {trade.stock_name}

                          </td>

                          <td className="px-6 py-5">

                            ₹
                            {trade.entry_price}

                          </td>

                          <td className="px-6 py-5">

                            ₹
                            {trade.exit_price}

                          </td>

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

                          <td className="px-6 py-5">

                            <button

                              onClick={() =>
                                setViewTrade(
                                  trade
                                )
                              }

                              className="bg-violet-500 hover:bg-violet-600 text-white px-4 py-2 rounded-xl font-semibold"
                            >

                              View

                            </button>

                          </td>

                        </tr>
                      )
                    )}

                  </tbody>

                </table>

              </div>

            </div>

          </>
        )}

      </main>

      {/* CLOSE MODAL */}

      {selectedTrade && (

        <CloseTradeModal

          trade={selectedTrade}

          onClose={() =>
            setSelectedTrade(
              null
            )
          }

          onSuccess={
            fetchTrades
          }

        />
      )}

      {/* EDIT MODAL */}

      {editTrade && (

        <EditTradeModal

          trade={editTrade}

          onClose={() =>
            setEditTrade(
              null
            )
          }

          onSuccess={
            fetchTrades
          }

        />
      )}

      {/* VIEW MODAL */}

      {viewTrade && (

        <ViewTradeModal

          trade={viewTrade}

          onClose={() =>
            setViewTrade(
              null
            )
          }

        />
      )}

    </div>
  );
}