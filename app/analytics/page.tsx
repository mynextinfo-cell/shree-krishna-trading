'use client'

import { useEffect, useMemo, useState } from 'react'

import DashboardLayout from '@/components/DashboardLayout'

import { supabase } from '@/lib/supabase'

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
  Bar

} from 'recharts'

export default function AnalyticsPage() {

  // DATABASE TRADES
  const [trades, setTrades] = useState<any[]>([])

  // FETCH TRADES
  useEffect(() => {

    const fetchTrades = async () => {

      const {

        data: { user }

      } = await supabase.auth.getUser()

      if (!user) return

      const { data, error } = await supabase

        .from('trades')

        .select('*')
        .eq('user_id', user.id)

      if (error) {

        console.log(error)

        return

      }

      setTrades(data || [])

    }

    fetchTrades()

  }, [])

  // CALCULATE REAL PNL
  const totalPNL = useMemo(() => {

    return trades.reduce(

      (acc, trade) => {

        const pnl =

          trade.type === 'BUY'

            ? (
                (
                  trade.exit_price -
                  trade.entry_price
                )
                *
                trade.quantity
              )
              -
              trade.brokerage

            : (
                (
                  trade.entry_price -
                  trade.exit_price
                )
                *
                trade.quantity
              )
              -
              trade.brokerage

        return acc + pnl

      },

      0

    )

  }, [trades])

  // WINNING & LOSING TRADES
  const winningTrades = trades.filter((trade) => {

    const pnl =

      trade.type === 'BUY'

        ? (
            (
              trade.exit_price -
              trade.entry_price
            )
            *
            trade.quantity
          )
          -
          trade.brokerage

        : (
            (
              trade.entry_price -
              trade.exit_price
            )
            *
            trade.quantity
          )
          -
          trade.brokerage

    return pnl > 0

  })

  const losingTrades = trades.filter((trade) => {

    const pnl =

      trade.type === 'BUY'

        ? (
            (
              trade.exit_price -
              trade.entry_price
            )
            *
            trade.quantity
          )
          -
          trade.brokerage

        : (
            (
              trade.entry_price -
              trade.exit_price
            )
            *
            trade.quantity
          )
          -
          trade.brokerage

    return pnl <= 0

  })

  // WIN RATIO
  const winRatio = trades.length

    ? (
        (
          winningTrades.length /
          trades.length
        )
        *
        100
      ).toFixed(1)

    : 0

  // EQUITY CURVE DATA
  const equityData = trades.map(

    (trade, index) => {

      const pnl =

        trade.type === 'BUY'

          ? (
              (
                trade.exit_price -
                trade.entry_price
              )
              *
              trade.quantity
            )
            -
            trade.brokerage

          : (
              (
                trade.entry_price -
                trade.exit_price
              )
              *
              trade.quantity
            )
            -
            trade.brokerage

      return {

        trade: `T${index + 1}`,

        pnl

      }

    }

  )

  // PIE CHART DATA
  const winData = [

    {

      name: 'Winning',

      value: winningTrades.length

    },

    {

      name: 'Losing',

      value: losingTrades.length

    }

  ]

  // MONTHLY DATA
  const monthlyMap: any = {}

  trades.forEach((trade) => {

    const month =

      trade.trade_date

        ? new Date(
            trade.trade_date
          ).toLocaleString(

            'default',

            {

              month: 'short'

            }

          )

        : 'Unknown'

    if (!monthlyMap[month]) {

      monthlyMap[month] = 0

    }

    monthlyMap[month] += 1

  })

  const monthlyData = Object.keys(

    monthlyMap

  ).map((month) => ({

    month,

    trades: monthlyMap[month]

  }))

  const COLORS = [

    '#22c55e',

    '#ef4444'

  ]

  return (

    <DashboardLayout>

      <main className="min-h-screen bg-black text-white p-6">

        {/* PAGE TITLE */}
        <div className="mb-8">

          <h1 className="text-5xl font-bold text-pink-500 mb-2">

            Trading Analytics

          </h1>

          <p className="text-gray-400 text-lg">

            Professional performance analysis dashboard

          </p>

        </div>

        {/* SUMMARY CARDS */}
        <div className="grid md:grid-cols-4 gap-6 mb-10">

          {/* TOTAL PNL */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 shadow-lg">

            <p className="text-gray-400 mb-2">

              Total P/L

            </p>

            <h2
              className={`text-4xl font-bold ${
                totalPNL >= 0

                  ? 'text-green-400'

                  : 'text-red-400'
              }`}
            >

              ₹ {totalPNL.toFixed(2)}

            </h2>

          </div>

          {/* WIN RATE */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 shadow-lg">

            <p className="text-gray-400 mb-2">

              Win Ratio

            </p>

            <h2 className="text-4xl font-bold text-pink-400">

              {winRatio}%

            </h2>

          </div>

          {/* TOTAL TRADES */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 shadow-lg">

            <p className="text-gray-400 mb-2">

              Total Trades

            </p>

            <h2 className="text-4xl font-bold text-white">

              {trades.length}

            </h2>

          </div>

          {/* WINNING */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 shadow-lg">

            <p className="text-gray-400 mb-2">

              Winning Trades

            </p>

            <h2 className="text-4xl font-bold text-green-400">

              {winningTrades.length}

            </h2>

          </div>

        </div>

        {/* EQUITY CURVE */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 mb-10 shadow-lg">

          <h2 className="text-3xl font-bold text-pink-400 mb-6">

            📈 Equity Curve

          </h2>

          <div className="w-full h-[400px]">

            <ResponsiveContainer width="100%" height="100%">

              <LineChart data={equityData}>

                <XAxis dataKey="trade" />

                <YAxis />

                <Tooltip />

                <Line
                  type="monotone"
                  dataKey="pnl"
                  stroke="#ec4899"
                  strokeWidth={4}
                />

              </LineChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* CHARTS */}
        <div className="grid md:grid-cols-2 gap-8">

          {/* WIN RATIO */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 shadow-lg">

            <h2 className="text-3xl font-bold text-pink-400 mb-6">

              🥧 Win Ratio

            </h2>

            <div className="w-full h-[350px]">

              <ResponsiveContainer width="100%" height="100%">

                <PieChart>

                  <Pie
                    data={winData}
                    cx="50%"
                    cy="50%"
                    outerRadius={120}
                    dataKey="value"
                    label
                  >

                    {winData.map(

                      (entry, index) => (

                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index]}
                        />

                      )

                    )}

                  </Pie>

                  <Tooltip />

                </PieChart>

              </ResponsiveContainer>

            </div>

          </div>

          {/* MONTHLY TRADES */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 shadow-lg">

            <h2 className="text-3xl font-bold text-pink-400 mb-6">

              📊 Monthly Trades

            </h2>

            <div className="w-full h-[350px]">

              <ResponsiveContainer width="100%" height="100%">

                <BarChart data={monthlyData}>

                  <XAxis dataKey="month" />

                  <YAxis />

                  <Tooltip />

                  <Bar
                    dataKey="trades"
                    fill="#ec4899"
                    radius={[10, 10, 0, 0]}
                  />

                </BarChart>

              </ResponsiveContainer>

            </div>

          </div>

        </div>

      </main>

    </DashboardLayout>

  )

}