"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import Sidebar from "@/components/Sidebar";

import { supabase } from "@/lib/supabase";

export default function AdminPage() {

  const router =
    useRouter();

  // STATES

  const [users, setUsers] =
    useState<any[]>([]);

  const [trades, setTrades] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  // FETCH ADMIN DATA

  const fetchAdminData =
    async () => {

      setLoading(true);

      // CURRENT USER

      const {

        data: {
          user,
        },

      } = await supabase.auth.getUser();

      if (!user) {

        router.push(
          "/login"
        );

        return;
      }

      // CHECK ADMIN ROLE

      const {
        data: profile,
      } = await supabase

        .from("profiles")

        .select("*")

        .eq(
          "id",
          user.id
        )

        .single();

      // BLOCK NORMAL USERS

      if (
        profile?.role !==
        "admin"
      ) {

        alert(
          "Access Denied ❌"
        );

        router.push(
          "/dashboard"
        );

        return;
      }

      // FETCH USERS

      const {
        data: usersData,
      } = await supabase

        .from("profiles")

        .select("*");

      // FETCH TRADES

      const {
        data: tradesData,
      } = await supabase

        .from("trades")

        .select("*");

      setUsers(
        usersData || []
      );

      setTrades(
        tradesData || []
      );

      setLoading(false);
    };

  // FETCH

  useEffect(() => {

    fetchAdminData();

  }, []);

  // STATS

  const totalUsers =
    users.length;

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

  const totalNetPnl =
    trades.reduce(

      (sum, trade) =>

        sum +

        Number(
          trade.net_pnl || 0
        ),

      0
    );

  return (

    <div className="flex min-h-screen bg-[#fff4f8]">

      {/* SIDEBAR */}

      <Sidebar />

      {/* MAIN */}

      <main className="flex-1 p-6 overflow-y-auto">

        {/* HEADER */}

        <div className="bg-gradient-to-r from-red-500 to-pink-500 rounded-3xl p-8 shadow-xl mb-6">

          <h1 className="text-4xl font-bold text-white">

            Admin Control Panel

          </h1>

          <p className="text-white/90 text-lg mt-3">

            Manage all users and platform trading activity.

          </p>

        </div>

        {/* STATS */}

        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-6">

          <div className="bg-white rounded-2xl p-4 shadow-md border border-pink-100">

            <p className="text-zinc-500 text-sm">

              Total Users

            </p>

            <h2 className="text-2xl font-bold text-zinc-800 mt-2">

              {totalUsers}

            </h2>

          </div>

          <div className="bg-white rounded-2xl p-4 shadow-md border border-pink-100">

            <p className="text-zinc-500 text-sm">

              Total Trades

            </p>

            <h2 className="text-2xl font-bold text-zinc-800 mt-2">

              {totalTrades}

            </h2>

          </div>

          <div className="bg-white rounded-2xl p-4 shadow-md border border-pink-100">

            <p className="text-zinc-500 text-sm">

              Open Trades

            </p>

            <h2 className="text-2xl font-bold text-yellow-600 mt-2">

              {openTrades}

            </h2>

          </div>

          <div className="bg-white rounded-2xl p-4 shadow-md border border-pink-100">

            <p className="text-zinc-500 text-sm">

              Closed Trades

            </p>

            <h2 className="text-2xl font-bold text-blue-600 mt-2">

              {closedTrades}

            </h2>

          </div>

          <div className="bg-white rounded-2xl p-4 shadow-md border border-pink-100">

            <p className="text-zinc-500 text-sm">

              Platform Net P&L

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

        </div>

        {/* USERS TABLE */}

        <div className="bg-white rounded-3xl shadow-lg border border-pink-100 overflow-hidden mb-6">

          <div className="p-6 border-b border-pink-100">

            <h2 className="text-2xl font-bold text-zinc-800">

              All Users

            </h2>

          </div>

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead className="bg-pink-50">

                <tr>

                  <th className="text-left px-6 py-4">

                    Name

                  </th>

                  <th className="text-left px-6 py-4">

                    Email

                  </th>

                  <th className="text-left px-6 py-4">

                    Role

                  </th>

                </tr>

              </thead>

              <tbody>

                {users.map(
                  (user) => (

                    <tr
                      key={user.id}
                      className="border-b border-pink-50"
                    >

                      <td className="px-6 py-5 font-semibold">

                        {user.full_name}

                      </td>

                      <td className="px-6 py-5">

                        {user.email}

                      </td>

                      <td className="px-6 py-5">

                        <span className={`px-3 py-1 rounded-full text-sm font-bold

                          ${
                            user.role ===
                            "admin"

                              ? "bg-red-100 text-red-600"

                              : "bg-blue-100 text-blue-600"
                          }
                        `}>

                          {user.role}

                        </span>

                      </td>

                    </tr>
                  )
                )}

              </tbody>

            </table>

          </div>

        </div>

        {/* TRADES TABLE */}

        <div className="bg-white rounded-3xl shadow-lg border border-pink-100 overflow-hidden">

          <div className="p-6 border-b border-pink-100">

            <h2 className="text-2xl font-bold text-zinc-800">

              All Trades

            </h2>

          </div>

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead className="bg-pink-50">

                <tr>

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

                    Net P&L

                  </th>

                  <th className="text-left px-6 py-4">

                    Status

                  </th>

                </tr>

              </thead>

              <tbody>

                {trades.map(
                  (trade) => (

                    <tr
                      key={trade.id}
                      className="border-b border-pink-50"
                    >

                      <td className="px-6 py-5 font-semibold">

                        {trade.stock_name}

                      </td>

                      <td className="px-6 py-5">

                        {trade.side}

                      </td>

                      <td className="px-6 py-5">

                        {trade.quantity}

                      </td>

                      <td className="px-6 py-5">

                        ₹
                        {trade.entry_price}

                      </td>

                      <td className={`px-6 py-5 font-bold

                        ${
                          trade.net_pnl >= 0

                            ? "text-green-600"

                            : "text-red-500"
                        }
                      `}>

                        ₹
                        {trade.net_pnl || 0}

                      </td>

                      <td className="px-6 py-5">

                        <span className={`px-3 py-1 rounded-full text-sm font-bold

                          ${
                            trade.status ===
                            "open"

                              ? "bg-yellow-100 text-yellow-700"

                              : "bg-green-100 text-green-700"
                          }
                        `}>

                          {trade.status}

                        </span>

                      </td>

                    </tr>
                  )
                )}

              </tbody>

            </table>

          </div>

        </div>

      </main>

    </div>
  );
}