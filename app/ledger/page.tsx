'use client'

import { useEffect, useMemo, useState } from 'react'

import { supabase } from '@/lib/supabase'

import DashboardLayout from '@/components/DashboardLayout'

export default function LedgerPage() {

  // DATABASE TRADES
  const [ledgerData, setLedgerData] = useState<any[]>([])

  // LIVE PRICES
  const [livePrices, setLivePrices] = useState<any>({})

  // FILTERS
  const [search, setSearch] = useState('')

  const [tradeType, setTradeType] = useState('ALL')

  // FETCH TRADES
  useEffect(() => {

    const fetchTrades = async () => {

      // GET USER
      const {

        data: { user }

      } = await supabase.auth.getUser()

      if (!user) return

      // CHECK ROLE
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

        .order('id', {

          ascending: false

        })

      if (error) {

        console.log(error)

        return

      }

      setLedgerData(data || [])

    }

    fetchTrades()

  }, [])

  // FETCH LIVE PRICES
  useEffect(() => {

    const fetchPrices = async () => {

      const updatedPrices: any = {}

      for (const trade of ledgerData) {

        try {

          const response = await fetch(

            `/api/stock-price?symbol=${trade.stock}`

          )

          const data = await response.json()

          updatedPrices[trade.stock] = data.price

        } catch (error) {

          console.log(error)

        }

      }

      setLivePrices(updatedPrices)

    }

    if (ledgerData.length > 0) {

      fetchPrices()

    }

  }, [ledgerData])

  // FILTERED DATA
  const filteredData = useMemo(() => {

    return ledgerData.filter((trade) => {

      const stockMatch =

        trade.stock
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          )

      const typeMatch =

        tradeType === 'ALL'

          ? true

          : trade.type === tradeType

      return stockMatch && typeMatch

    })

  }, [

    ledgerData,
    search,
    tradeType

  ])

  // TOTAL PNL
  const totalPNL = filteredData.reduce(

    (acc, trade) => {

      const ltp =

        livePrices[trade.stock]

        ||

        trade.exit_price

      const pnl =

        (
          (
            ltp -
            trade.entry_price
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

  // TOTAL BROKERAGE
  const totalBrokerage = filteredData.reduce(

    (acc, trade) =>

      acc + Number(trade.brokerage),

    0

  )

  return (

    <DashboardLayout>

      <main
        className="min-h-screen p-6 text-black bg-cover bg-center bg-fixed"
        style={{

          backgroundImage:
            "url('/images/ledger-bg.jpg')"

        }}
      >

        {/* DARK OVERLAY */}
        <div className="absolute inset-0 bg-black/40 -z-10"></div>

        {/* PAGE TITLE */}
        <div className="mb-8">

          <h1 className="text-5xl font-bold text-white mb-2 drop-shadow-lg">

            Live Trading Ledger

          </h1>

          <p className="text-gray-200 text-lg">

            Real-time trade tracking system

          </p>

        </div>

        {/* SUMMARY CARDS */}
        <div className="grid md:grid-cols-3 gap-5 mb-8">

          {/* TOTAL TRADES */}
          <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 shadow-lg">

            <p className="text-gray-500 mb-2">

              Total Trades

            </p>

            <h2 className="text-4xl font-bold">

              {filteredData.length}

            </h2>

          </div>

          {/* LIVE PNL */}
          <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 shadow-lg">

            <p className="text-gray-500 mb-2">

              Live Profit / Loss

            </p>

            <h2
              className={`text-4xl font-bold ${
                totalPNL >= 0

                  ? 'text-green-600'

                  : 'text-red-600'
              }`}
            >

              ₹ {totalPNL.toFixed(2)}

            </h2>

          </div>

          {/* BROKERAGE */}
          <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 shadow-lg">

            <p className="text-gray-500 mb-2">

              Total Brokerage

            </p>

            <h2 className="text-4xl font-bold">

              ₹ {totalBrokerage.toFixed(2)}

            </h2>

          </div>

        </div>

        {/* FILTERS */}
        <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-lg p-6 mb-8">

          <h2 className="text-2xl font-bold mb-5">

            🔍 Filter Ledger

          </h2>

          <div className="grid md:grid-cols-2 gap-5">

            {/* SEARCH */}
            <input
              type="text"
              placeholder="Search Stock..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="border border-pink-300 rounded-2xl p-4"
            />

            {/* TRADE TYPE */}
            <select
              value={tradeType}
              onChange={(e) =>
                setTradeType(e.target.value)
              }
              className="border border-pink-300 rounded-2xl p-4"
            >

              <option value="ALL">

                ALL

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
        <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-lg p-6 overflow-x-auto">

          <h2 className="text-3xl font-bold mb-6">

            📒 Live Ledger Records

          </h2>

          <table className="w-full">

            <thead>

              <tr className="border-b">

                <th className="p-3 text-left">

                  S.No

                </th>

                <th className="p-3 text-left">

                  Stock

                </th>

                <th className="p-3 text-left">

                  Type

                </th>

                <th className="p-3 text-left">

                  Qty

                </th>

                <th className="p-3 text-left">

                  Entry

                </th>

                <th className="p-3 text-left">

                  LTP

                </th>

                <th className="p-3 text-left">

                  Current Value

                </th>

                <th className="p-3 text-left">

                  Live P/L

                </th>

                <th className="p-3 text-left">

                  Brokerage

                </th>

                <th className="p-3 text-left">

                  Trade Date

                </th>

                <th className="p-3 text-left">

                  Exit Date

                </th>

                <th className="p-3 text-left">

                  Notes

                </th>

              </tr>

            </thead>

            <tbody>

              {filteredData.map(

                (trade, index) => {

                  const ltp =

                    livePrices[trade.stock]

                    ||

                    trade.exit_price

                  const currentValue =

                    ltp * trade.quantity

                  const livePNL =

                    (
                      (
                        ltp -
                        trade.entry_price
                      )
                      *
                      trade.quantity
                    )
                    -
                    trade.brokerage

                  return (

                    <tr
                      key={trade.id}
                      className="border-b hover:bg-pink-50/50"
                    >

                      {/* SERIAL */}
                      <td className="p-3">

                        {index + 1}

                      </td>

                      {/* STOCK */}
                      <td className="p-3 font-bold">

                        {trade.stock}

                      </td>

                      {/* TYPE */}
                      <td className="p-3">

                        {trade.type}

                      </td>

                      {/* QUANTITY */}
                      <td className="p-3">

                        {trade.quantity}

                      </td>

                      {/* ENTRY */}
                      <td className="p-3">

                        ₹ {trade.entry_price}

                      </td>

                      {/* LTP */}
                      <td className="p-3 font-bold text-blue-600">

                        ₹ {ltp?.toFixed(2)}

                      </td>

                      {/* CURRENT VALUE */}
                      <td className="p-3 font-bold">

                        ₹ {currentValue.toFixed(2)}

                      </td>

                      {/* LIVE PNL */}
                      <td
                        className={`p-3 font-bold ${
                          livePNL >= 0

                            ? 'text-green-600'

                            : 'text-red-600'
                        }`}
                      >

                        ₹ {livePNL.toFixed(2)}

                      </td>

                      {/* BROKERAGE */}
                      <td className="p-3">

                        ₹ {trade.brokerage}

                      </td>

                      {/* TRADE DATE */}
                      <td className="p-3">

                        {trade.trade_date}

                      </td>

                      {/* EXIT DATE */}
                      <td className="p-3">

                        {trade.exit_date}

                      </td>

                      {/* NOTES */}
                      <td className="p-3">

                        {trade.notes}

                      </td>

                    </tr>

                  )

                }

              )}

            </tbody>

          </table>

        </div>

      </main>

    </DashboardLayout>

  )

}