'use client'

import {

  Bell,

  Search,

  Menu

} from 'lucide-react'

export default function TopHeader() {

  return (

    <header className="w-full bg-gradient-to-r from-pink-600 via-rose-500 to-pink-500 shadow-lg">

      {/* TOP MENU */}
      <div className="flex items-center justify-between px-6 py-3 text-white">

        {/* LEFT */}
        <div className="flex items-center gap-5">

          {/* LOGO */}
          <div className="flex items-center gap-3">

            <img
              src="/logo.png"
              alt="Logo"
              className="w-10 h-10 rounded-full object-cover bg-white"
            />

            <h1 className="text-xl font-bold">

              Shree Krishna Trading

            </h1>

          </div>

          {/* MENU ICON */}
          <button className="hover:scale-110 transition-all">

            <Menu size={24} />

          </button>

        </div>

        {/* CENTER MENU */}
        <nav className="hidden lg:flex items-center gap-6 font-medium text-sm">

          <a href="#" className="hover:text-pink-100">

            Option Chain

          </a>

          <a href="#" className="hover:text-pink-100">

            Market Turnover

          </a>

          <a href="#" className="hover:text-pink-100">

            Listings

          </a>

          <a href="#" className="hover:text-pink-100">

            IPO

          </a>

          <a href="#" className="hover:text-pink-100">

            Circulars

          </a>

          <a href="#" className="hover:text-pink-100">

            Daily Report

          </a>

        </nav>

        {/* RIGHT */}
        <div className="flex items-center gap-5">

          {/* LANGUAGE */}
          <select className="bg-transparent outline-none text-sm">

            <option className="text-black">

              English

            </option>

            <option className="text-black">

              Hindi

            </option>

          </select>

          {/* NOTIFICATION */}
          <button className="relative">

            <Bell size={22} />

            <span className="absolute -top-2 -right-2 bg-yellow-400 text-black text-[10px] px-1 rounded-full font-bold">

              3

            </span>

          </button>

          {/* PROFILE */}
          <div className="w-9 h-9 rounded-full bg-white/30 border border-white flex items-center justify-center font-bold">

            S

          </div>

        </div>

      </div>

      {/* SEARCH SECTION */}
      <div className="bg-white px-6 py-5 flex items-center justify-between border-b">

        {/* SEARCH */}
        <div className="relative w-[55%]">

          <input
            type="text"
            placeholder="Search by Company name"
            className="w-full border border-pink-200 rounded-2xl px-5 py-4 text-lg outline-none focus:ring-2 focus:ring-pink-400"
          />

          <Search
            className="absolute right-5 top-4 text-pink-500"
            size={24}
          />

        </div>

        {/* MARKET SUMMARY */}
        <div className="flex items-center gap-10">

          {/* NIFTY */}
          <div>

            <h2 className="text-pink-700 text-2xl font-black">

              Nifty50

            </h2>

            <p className="text-3xl font-black text-red-500">

              24,326.65

            </p>

            <p className="text-red-500 font-semibold">

              -4.30 (-0.02%)

            </p>

          </div>

          {/* MARKET CAP */}
          <div>

            <h2 className="text-gray-700 text-lg font-bold">

              Market Capitalization

            </h2>

            <p className="text-black font-semibold">

              ₹ Lac Crs 475.23 | Tn $ 5.01

            </p>

          </div>

        </div>

      </div>

      {/* SECOND MENU */}
      <div className="bg-white border-b">

        <div className="flex items-center gap-10 px-8 py-4 text-gray-700 font-medium overflow-x-auto">

          <a
            href="#"
            className="text-pink-600 border-b-4 border-pink-500 pb-2"
          >

            HOME

          </a>

          <a href="#">

            ABOUT

          </a>

          <a href="#">

            MARKET DATA

          </a>

          <a href="#">

            INVEST

          </a>

          <a href="#">

            TRADE

          </a>

          <a href="#">

            REGULATION

          </a>

          <a href="#">

            LEARN

          </a>

          <a href="#">

            RESOURCES

          </a>

          <a href="#">

            RESEARCH

          </a>

        </div>

      </div>

    </header>

  )

}