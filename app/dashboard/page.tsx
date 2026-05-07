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
      <aside className="w-[250px] bg-white/40 backdrop-blur-2xl border-r border-pink-200 shadow-xl p-5 flex flex-col">

        {/* COMPANY LOGO */}
        <div className="mb-10 flex justify-center">

          <img
            src="/logo.png"
            alt="Company Logo"
            className="w-[120px] h-[120px] object-contain"
          />

        </div>

        {/* NAVIGATION */}
        <nav className="flex flex-col gap-3">

          {navItems.map((item) => (

            <Link
              key={item.path}
              href={item.path}
              className={`px-4 py-3 rounded-xl font-semibold transition-all duration-300 ${
                pathname === item.path

                  ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg'

                  : 'bg-white/70 hover:bg-pink-200 text-pink-900'
              }`}
            >

              {item.name}

            </Link>

          ))}

        </nav>

        {/* FOOTER */}
        <div className="mt-auto">

          <div className="bg-white/70 backdrop-blur-lg border border-pink-100 rounded-2xl p-4 shadow-md">

            <p className="text-sm text-pink-700 font-semibold">

              Premium Trading Terminal

            </p>

            <p className="text-xs text-gray-600 mt-1">

              Professional Fintech Platform

            </p>

          </div>

        </div>

      </aside>

      {/* MAIN CONTENT */}
      <div className="flex-1 p-6 overflow-auto">

        {/* TOP BAR */}
        <div className="flex justify-between items-start mb-8">

          {/* COMPANY INFO */}
          <div>

            <h2 className="text-4xl font-black text-pink-800">

              Shree Krishna Trading

            </h2>

            <p className="text-pink-600 mt-1 font-medium">

              Trust Commitment Growth

            </p>

          </div>

          {/* RIGHT SIDE */}
          <div className="flex flex-col items-end gap-3">

            {/* DATE & TIME */}
            <div className="bg-white/70 backdrop-blur-lg border border-pink-200 rounded-2xl px-5 py-3 shadow-lg text-right">

              <p className="text-xs text-pink-700 font-medium">

                {mounted && formattedDate}

              </p>

              <h2 className="text-lg font-bold text-pink-900 mt-1">

                {mounted && formattedTime}

              </h2>

            </div>

            {/* MANAGING DIRECTOR */}
            <div className="bg-white/70 backdrop-blur-lg border border-pink-200 rounded-2xl px-5 py-3 shadow-md">

              <p className="text-sm text-pink-700 font-semibold">

                Managing Director

              </p>

              <h2 className="text-base font-bold text-black mt-1">

                Sanjay Mondal

              </h2>

            </div>

          </div>

        </div>

        {/* PAGE CONTENT */}
        <div className="bg-white/40 backdrop-blur-2xl border border-pink-100 rounded-[28px] shadow-xl p-5">

          {children}

        </div>

      </div>

    </div>

  )

}