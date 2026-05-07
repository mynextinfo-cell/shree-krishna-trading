'use client'

import Link from 'next/link'

import { usePathname } from 'next/navigation'

import { useEffect, useState } from 'react'

export default function DashboardLayout({

  children

}: {

  children: React.ReactNode

}) {

  const pathname = usePathname()

  // LIVE DATE & TIME
  const [mounted, setMounted] = useState(false)

  const [currentTime, setCurrentTime] = useState(

    new Date()

  )

  useEffect(() => {

    setMounted(true)

    const interval = setInterval(() => {

      setCurrentTime(new Date())

    }, 1000)

    return () => clearInterval(interval)

  }, [])

  // DATE FORMAT
  const formattedDate =

    currentTime.toLocaleDateString(

      'en-IN',

      {

        weekday: 'long',

        year: 'numeric',

        month: 'long',

        day: 'numeric'

      }

    )

  // TIME FORMAT
  const formattedTime =

    currentTime.toLocaleTimeString(

      'en-IN',

      {

        hour: '2-digit',

        minute: '2-digit',

        second: '2-digit'

      }

    )

  // NAVIGATION
  const navItems = [

    {

      name: 'Dashboard',

      path: '/dashboard'

    },

    {

      name: 'Journal',

      path: '/journal'

    },

    {

      name: 'Portfolio',

      path: '/portfolio'

    },

    {

      name: 'Ledger',

      path: '/ledger'

    },

    {

      name: 'Analytics',

      path: '/analytics'

    },

    {

      name: 'TradingView',

      path: '/tradingview'

    }

  ]

  return (

    <div className="min-h-screen flex bg-gradient-to-br from-[#fff1f5] via-[#ffe4ec] to-[#ffd6e7] text-black">

      {/* SIDEBAR */}
      <aside className="w-[270px] bg-white/40 backdrop-blur-2xl border-r border-pink-200 shadow-2xl p-6 flex flex-col">

        {/* LOGO/TITLE */}
        <div className="mb-12">

          <h1 className="text-2xl font-extrabold text-pink-700 tracking-wide">

            Trading Dashboard

          </h1>

          <div className="w-20 h-1 bg-pink-500 rounded-full mt-3"></div>

        </div>

        {/* NAVIGATION */}
        <nav className="flex flex-col gap-4">

          {navItems.map((item) => (

            <Link
              key={item.path}
              href={item.path}
              className={`px-5 py-4 rounded-2xl font-semibold transition-all duration-300 shadow-sm ${
                pathname === item.path

                  ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg scale-[1.03]'

                  : 'bg-white/70 hover:bg-pink-200 text-pink-900'
              }`}
            >

              {item.name}

            </Link>

          ))}

        </nav>

        {/* FOOTER */}
        <div className="mt-auto">

          <div className="bg-white/60 backdrop-blur-lg border border-pink-100 rounded-3xl p-5 shadow-lg">

            <p className="text-sm text-pink-600 font-semibold">

              Premium Trading Terminal

            </p>

            <p className="text-xs text-gray-600 mt-2">

              Professional Fintech Platform

            </p>

          </div>

        </div>

      </aside>

      {/* MAIN CONTENT */}
      <div className="flex-1 p-8 overflow-auto">

        {/* TOPBAR */}
        <div className="flex justify-between items-start mb-10">

          {/* COMPANY */}
          <div>

            <h2 className="text-5xl font-black text-pink-800 leading-tight">

              Shree Krishna Trading

            </h2>

            <p className="text-pink-600 text-lg mt-2 font-medium">

              Trust Commitment Growth

            </p>

          </div>

          {/* RIGHT SECTION */}
          <div className="flex flex-col items-end gap-4">

            {/* DATE TIME */}
            <div className="bg-white/60 backdrop-blur-xl border border-pink-200 rounded-3xl px-6 py-4 shadow-xl text-right">

              <p className="text-sm text-pink-600 font-medium">

                {mounted && formattedDate}

              </p>

              <h2 className="text-2xl font-extrabold text-pink-800 mt-1">

                {mounted && formattedTime}

              </h2>

            </div>

            {/* MANAGING DIRECTOR */}
            <div className="bg-white/60 backdrop-blur-xl border border-pink-200 rounded-2xl px-5 py-3 shadow-lg">

              <p className="text-sm text-pink-700 font-semibold">

                Managing Director

              </p>

              <h2 className="text-lg font-bold text-black mt-1">

                Sanjay Mondal

              </h2>

            </div>

          </div>

        </div>

        {/* CONTENT AREA */}
        <div className="bg-white/40 backdrop-blur-2xl border border-pink-100 rounded-[30px] shadow-2xl p-6">

          {children}

        </div>

      </div>

    </div>

  )

}