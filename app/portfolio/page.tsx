"use client";

import { useEffect, useState } from "react";

import Sidebar from "@/components/Sidebar";

import { supabase } from "@/lib/supabase";

export default function PortfolioPage() {

  // PROFILE

  const [profile, setProfile] =
    useState<any>(null);

  // PORTFOLIO

  const [portfolio, setPortfolio] =
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

  const itemsPerPage = 10;

  // FETCH PORTFOLIO

  const fetchPortfolio =
    async () => {

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
            "open"
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
          "Failed to fetch portfolio ❌"
        );

        setLoading(false);

        return;
      }

      setPortfolio(
        data || []
      );

      setLoading(false);
    };

  // FETCH

  useEffect(() => {

    fetchPortfolio();

  }, []);

  // TOTAL INVESTMENT

  const totalInvestment =
    portfolio.reduce(

      (sum, item) =>

        sum +

        (
          Number(
            item.entry_price || 0
          ) *

          Number(
            item.quantity || 0
          )
        ),

      0
    );

  // TOTAL HOLDINGS

  const totalHoldings =
    portfolio.length;

  // BUY POSITIONS

  const buyPositions =
    portfolio.filter(
      (item) =>
        item.side ===
        "BUY"
    ).length;

  // SELL POSITIONS

  const sellPositions =
    portfolio.filter(
      (item) =>
        item.side ===
        "SELL"
    ).length;

  // FILTERED PORTFOLIO

  const filteredPortfolio =
    portfolio.filter(
      (item) => {

        const matchesSearch =

          item.stock_name

            ?.toLowerCase()

            .includes(
              search.toLowerCase()
            );

        const matchesSide =

          sideFilter ===
          "ALL"

            ? true

            : item.side ===
              sideFilter;

        return (
          matchesSearch &&
          matchesSide
        );
      }
    );

  // PAGINATION

  const indexOfLastItem =
    currentPage *
    itemsPerPage;

  const indexOfFirstItem =
    indexOfLastItem -
    itemsPerPage;

  const currentPortfolio =
    filteredPortfolio.slice(

      indexOfFirstItem,

      indexOfLastItem
    );

  const totalPages =
    Math.ceil(

      filteredPortfolio.length /

      itemsPerPage
    );

  return (

    <div className="flex min-h-screen bg-[#f5fbff]">

      {/* SIDEBAR */}

      <Sidebar />

      {/* MAIN */}

      <main className="flex-1 p-6 overflow-y-auto">

        {/* HEADER */}

        <div className="bg-gradient-to-r from-sky-500 to-blue-500 rounded-3xl p-8 shadow-xl mb-6">

          <div className="flex items-start justify-between gap-6">

            <div>

              <h1 className="text-4xl font-bold text-white">

                Portfolio Dashboard

              </h1>

              <p className="text-white/90 text-lg mt-3">

                Manage and monitor your active holdings.

              </p>

              {/* ROLE */}

              <div className="mt-4">

                <span className={`px-4 py-2 rounded-full text-sm font-bold

                  ${
                    profile?.role ===
                    "admin"

                      ? "bg-red-100 text-red-600"

                      : "bg-white text-blue-600"
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

          <div className="bg-white rounded-3xl shadow-lg border border-blue-100 p-10 text-center text-zinc-500 mb-6">

            Loading Portfolio...

          </div>
        )}

        {/* CONTENT */}

        {!loading && (

          <>

            {/* SUMMARY */}

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">

              {/* TOTAL HOLDINGS */}

              <div className="bg-white rounded-2xl p-4 shadow-md border border-blue-100">

                <p className="text-zinc-500 text-sm">

                  Total Holdings

                </p>

                <h2 className="text-2xl font-bold text-zinc-800 mt-2">

                  {totalHoldings}

                </h2>

              </div>

              {/* TOTAL INVESTMENT */}

              <div className="bg-white rounded-2xl p-4 shadow-md border border-blue-100">

                <p className="text-zinc-500 text-sm">

                  Total Investment

                </p>

                <h2 className="text-2xl font-bold text-green-600 mt-2">

                  ₹
                  {totalInvestment.toFixed(2)}

                </h2>

              </div>

              {/* BUY POSITIONS */}

              <div className="bg-white rounded-2xl p-4 shadow-md border border-blue-100">

                <p className="text-zinc-500 text-sm">

                  Buy Positions

                </p>

                <h2 className="text-2xl font-bold text-blue-600 mt-2">

                  {buyPositions}

                </h2>

              </div>

              {/* SELL POSITIONS */}

              <div className="bg-white rounded-2xl p-4 shadow-md border border-blue-100">

                <p className="text-zinc-500 text-sm">

                  Sell Positions

                </p>

                <h2 className="text-2xl font-bold text-red-500 mt-2">

                  {sellPositions}

                </h2>

              </div>

            </div>

            {/* SEARCH + FILTER */}

            <div className="bg-white rounded-3xl shadow-lg border border-blue-100 p-5 mb-6">

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                {/* SEARCH */}

                <input

                  type="text"

                  placeholder="Search Holdings..."

                  value={search}

                  onChange={(e) =>
                    setSearch(
                      e.target.value
                    )
                  }

                  className="border border-blue-200 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-400"
                />

                {/* SIDE FILTER */}

                <select

                  value={sideFilter}

                  onChange={(e) =>
                    setSideFilter(
                      e.target.value
                    )
                  }

                  className="border border-blue-200 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-400"
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

            {/* TABLE */}

            <div className="bg-white rounded-3xl shadow-lg border border-blue-100 overflow-hidden">

              <div className="p-6 border-b border-blue-100">

                <h2 className="text-2xl font-bold text-zinc-800">

                  Active Holdings

                </h2>

              </div>

              <div className="overflow-x-auto">

                <table className="w-full">

                  <thead className="bg-blue-50">

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

                        Entry Price

                      </th>

                      <th className="text-left px-6 py-4">

                        Investment

                      </th>

                      <th className="text-left px-6 py-4">

                        Brokerage

                      </th>

                      <th className="text-left px-6 py-4">

                        Segment

                      </th>

                      <th className="text-left px-6 py-4">

                        Status

                      </th>

                    </tr>

                  </thead>

                  <tbody>

                    {currentPortfolio.map(
                      (
                        item,
                        index
                      ) => (

                        <tr
                          key={item.id}
                          className="border-b border-blue-50 hover:bg-blue-50 transition"
                        >

                          {/* SERIAL */}

                          <td className="px-6 py-5 font-semibold text-zinc-500">

                            {indexOfFirstItem + index + 1}

                          </td>

                          {/* STOCK */}

                          <td className="px-6 py-5 font-bold text-zinc-800">

                            {item.stock_name}

                          </td>

                          {/* SIDE */}

                          <td className={`px-6 py-5 font-semibold

                            ${
                              item.side === "BUY"

                                ? "text-green-600"

                                : "text-red-500"
                            }
                          `}>

                            {item.side}

                          </td>

                          {/* QUANTITY */}

                          <td className="px-6 py-5">

                            {item.quantity}

                          </td>

                          {/* ENTRY */}

                          <td className="px-6 py-5">

                            ₹
                            {item.entry_price}

                          </td>

                          {/* INVESTMENT */}

                          <td className="px-6 py-5 font-semibold text-blue-600">

                            ₹
                            {(
                              Number(
                                item.entry_price || 0
                              ) *

                              Number(
                                item.quantity || 0
                              )
                            ).toFixed(2)}

                          </td>

                          {/* BROKERAGE */}

                          <td className="px-6 py-5">

                            ₹
                            {item.brokerage || 0}

                          </td>

                          {/* SEGMENT */}

                          <td className="px-6 py-5">

                            {item.segment || "-"}

                          </td>

                          {/* STATUS */}

                          <td className="px-6 py-5">

                            <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-semibold">

                              OPEN

                            </span>

                          </td>

                        </tr>
                      )
                    )}

                  </tbody>

                </table>

                {/* EMPTY */}

                {filteredPortfolio.length === 0 && (

                  <div className="p-10 text-center text-zinc-500">

                    No Active Holdings Found

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

                className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-xl font-semibold"
              >

                Previous

              </button>

              {/* PAGE */}

              <div className="bg-white border border-blue-200 px-5 py-2 rounded-xl font-bold text-blue-600 shadow-sm">

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

                className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-xl font-semibold"
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