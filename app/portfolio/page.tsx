'use client'

import { useEffect, useMemo, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function PortfolioPage() {

  const [trades, setTrades] = useState<any[]>([])

  const [livePrices, setLivePrices] = useState<any>({})

  // FETCH TRADES
  useEffect(() => {

    const fetchTrades = async () => {

      // GET LOGGED-IN USER
      const {

        data: { user }

      } = await supabase.auth.getUser()

      if (!user) return

      // CHECK USER ROLE
      const { data: profile } = await supabase

        .from('profiles')

        .select('*')

        .eq('id', user.id)

        .single()

      // BASE QUERY
      let query = supabase

        .from('trades')

        .select('*')

      // NORMAL USER
      if (profile?.role !== 'admin') {

        query = query.eq(

          'user_id',

          user.id

        )

      }

      // FETCH DATA
      const { data, error } = await query

      if (error) {

        console.log(error)

        return

      }

      setTrades(data || [])

    }

    fetchTrades()

  }, [])

  // FETCH LIVE PRICES
  useEffect(() => {

    const fetchPrices = async () => {

      const updatedPrices: any = {}

      const uniqueStocks = [

        ...new Set(
          trades.map(
            (trade) => trade.stock
          )
        )

      ]

      for (const stock of uniqueStocks) {

        try {

          const response = await fetch(

            `/api/stock-price?symbol=${stock}`

          )

          const data = await response.json()

          updatedPrices[stock] = data.price

        } catch (error) {

          console.log(error)

        }

      }

      setLivePrices(updatedPrices)

    }

    if (trades.length > 0) {

      fetchPrices()

    }

  }, [trades])

  // HOLDINGS CALCULATION
  const holdings = useMemo(() => {

    const grouped: any = {}

    trades.forEach((trade) => {

      const stock = trade.stock

      if (!grouped[stock]) {

        grouped[stock] = {

          stock,
          quantity: 0,
          invested: 0

        }

      }

      const qty = Number(trade.quantity)

      const entry =
        Number(trade.entry_price)

      if (trade.type === 'BUY') {

        grouped[stock].quantity += qty

        grouped[stock].invested +=
          entry * qty

      } else {

        grouped[stock].quantity -= qty

        grouped[stock].invested -=
          entry * qty

      }

    })

    return Object.values(grouped)

      .filter((item: any) =>
        item.quantity > 0
      )

  }, [trades])

  // TOTALS
  const totals = useMemo(() => {

    let totalInvestment = 0

    let totalCurrentValue = 0

    let totalPNL = 0

    holdings.forEach((holding: any) => {

      const ltp =

        livePrices[holding.stock] || 0

      const currentValue =

        ltp * holding.quantity

      const pnl =

        currentValue -
        holding.invested

      totalInvestment +=
        holding.invested

      totalCurrentValue +=
        currentValue

      totalPNL += pnl

    })

    return {

      totalInvestment,
      totalCurrentValue,
      totalPNL

    }

  }, [holdings, livePrices])

  return (

    <main className="min-h-screen bg-pink-100 p-6 text-black">

      {/* HEADER */}
      <div className="mb-8">

        <h1 className="text-5xl font-bold text-pink-700 mb-2">

          Shree Krishna Trading

        </h1>

        <p className="text-gray-700 text-lg">

          Live Portfolio Tracker

        </p>

      </div>

      {/* SUMMARY CARDS */}
      <div className="grid md:grid-cols-3 gap-6 mb-10">

        {/* Investment */}
        <div className="bg-white rounded-3xl shadow-lg p-6">

          <p className="text-gray-500 mb-2">

            Total Investment

          </p>

          <h2 className="text-4xl font-bold">

            ₹ {totals.totalInvestment.toFixed(2)}

          </h2>

        </div>

        {/* Current Value */}
        <div className="bg-white rounded-3xl shadow-lg p-6">

          <p className="text-gray-500 mb-2">

            Current Value

          </p>

          <h2 className="text-4xl font-bold text-blue-600">

            ₹ {totals.totalCurrentValue.toFixed(2)}

          </h2>

        </div>

        {/* Unrealized PNL */}
        <div className="bg-white rounded-3xl shadow-lg p-6">

          <p className="text-gray-500 mb-2">

            Unrealized Profit / Loss

          </p>

          <h2
            className={`text-4xl font-bold ${
              totals.totalPNL >= 0

                ? 'text-green-600'

                : 'text-red-600'
            }`}
          >

            ₹ {totals.totalPNL.toFixed(2)}

          </h2>

        </div>

      </div>

      {/* HOLDINGS TABLE */}
      <div className="bg-white rounded-3xl shadow-lg p-6 overflow-x-auto">

        <h2 className="text-3xl font-bold mb-6">

          📊 Current Holdings

        </h2>

        <table className="w-full">

          <thead>

            <tr className="border-b">

              <th className="p-3 text-left">

                Stock

              </th>

              <th className="p-3 text-left">

                Quantity

              </th>

              <th className="p-3 text-left">

                Avg Investment

              </th>

              <th className="p-3 text-left">

                LTP

              </th>

              <th className="p-3 text-left">

                Current Value

              </th>

              <th className="p-3 text-left">

                Unrealized P/L

              </th>

              <th className="p-3 text-left">

                Allocation %

              </th>

            </tr>

          </thead>

          <tbody>

            {holdings.map((holding: any) => {

              const ltp =

                livePrices[holding.stock] || 0

              const currentValue =

                ltp * holding.quantity

              const pnl =

                currentValue -
                holding.invested

              const allocation =

                totals.totalCurrentValue > 0

                  ? (
                      (
                        currentValue /
                        totals.totalCurrentValue
                      ) * 100
                    ).toFixed(2)

                  : 0

              return (

                <tr
                  key={holding.stock}
                  className="border-b hover:bg-pink-50"
                >

                  {/* STOCK */}
                  <td className="p-3 font-bold">

                    {holding.stock}

                  </td>

                  {/* QUANTITY */}
                  <td className="p-3">

                    {holding.quantity}

                  </td>

                  {/* INVESTMENT */}
                  <td className="p-3">

                    ₹ {
                      holding.invested.toFixed(2)
                    }

                  </td>

                  {/* LTP */}
                  <td className="p-3 text-blue-600 font-bold">

                    ₹ {ltp.toFixed(2)}

                  </td>

                  {/* CURRENT VALUE */}
                  <td className="p-3 font-bold">

                    ₹ {currentValue.toFixed(2)}

                  </td>

                  {/* PNL */}
                  <td
                    className={`p-3 font-bold ${
                      pnl >= 0

                        ? 'text-green-600'

                        : 'text-red-600'
                    }`}
                  >

                    ₹ {pnl.toFixed(2)}

                  </td>

                  {/* ALLOCATION */}
                  <td className="p-3">

                    {allocation}%

                  </td>

                </tr>

              )

            })}

          </tbody>

        </table>

      </div>

    </main>

  )

}