"use client";

import {
  LayoutDashboard,
  CandlestickChart,
  Wallet,
  BarChart3,
  Settings,
  Menu,
  X,
} from "lucide-react";

import { useState } from "react";

export default function Sidebar() {

  const [open, setOpen] = useState(false);

  return (
    <>

      {/* MOBILE TOPBAR */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-[#050816] border-b border-zinc-900 flex items-center justify-between p-4">

        <h1 className="text-xl font-bold bg-gradient-to-r from-violet-400 to-fuchsia-500 bg-clip-text text-transparent">
          SK Trading
        </h1>

        <button
          onClick={() => setOpen(true)}
        >
          <Menu />
        </button>

      </div>

      {/* MOBILE SIDEBAR */}
      {open && (
        <div className="fixed inset-0 z-50 bg-black/80 md:hidden">

          <div className="w-72 h-full bg-[#050816] border-r border-zinc-900 p-6">

            <div className="flex items-center justify-between mb-10">

              <h1 className="text-2xl font-bold bg-gradient-to-r from-violet-400 to-fuchsia-500 bg-clip-text text-transparent">
                Shree Krishna Trading
              </h1>

              <button
                onClick={() => setOpen(false)}
              >
                <X />
              </button>

            </div>

            <nav className="space-y-4">

              <button className="flex items-center gap-4 w-full bg-violet-600/20 border border-violet-500/30 rounded-2xl p-4 text-left">
                <LayoutDashboard />
                Dashboard
              </button>

              <button className="flex items-center gap-4 w-full hover:bg-zinc-900 rounded-2xl p-4 transition">
                <CandlestickChart />
                Trades
              </button>

              <button className="flex items-center gap-4 w-full hover:bg-zinc-900 rounded-2xl p-4 transition">
                <Wallet />
                Portfolio
              </button>

              <button className="flex items-center gap-4 w-full hover:bg-zinc-900 rounded-2xl p-4 transition">
                <BarChart3 />
                Analytics
              </button>

              <button className="flex items-center gap-4 w-full hover:bg-zinc-900 rounded-2xl p-4 transition">
                <Settings />
                Settings
              </button>

            </nav>

          </div>

        </div>
      )}

      {/* DESKTOP SIDEBAR */}
      <aside className="hidden md:block w-72 bg-[#050816] border-r border-zinc-900 min-h-screen p-6">

        <h1 className="text-3xl font-bold mb-12 bg-gradient-to-r from-violet-400 to-fuchsia-500 bg-clip-text text-transparent">
          Shree Krishna Trading
        </h1>

        <nav className="space-y-4">

          <button className="flex items-center gap-4 w-full bg-violet-600/20 border border-violet-500/30 rounded-2xl p-4 text-left">
            <LayoutDashboard />
            Dashboard
          </button>

          <button className="flex items-center gap-4 w-full hover:bg-zinc-900 rounded-2xl p-4 transition">
            <CandlestickChart />
            Trades
          </button>

          <button className="flex items-center gap-4 w-full hover:bg-zinc-900 rounded-2xl p-4 transition">
            <Wallet />
            Portfolio
          </button>

          <button className="flex items-center gap-4 w-full hover:bg-zinc-900 rounded-2xl p-4 transition">
            <BarChart3 />
            Analytics
          </button>

          <button className="flex items-center gap-4 w-full hover:bg-zinc-900 rounded-2xl p-4 transition">
            <Settings />
            Settings
          </button>

        </nav>

      </aside>

    </>
  );
}