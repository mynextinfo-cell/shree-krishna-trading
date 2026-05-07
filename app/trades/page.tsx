'use client'

import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

export default function TradesPage() {

  const [trades, setTrades] = useState<any[]>([])

  async function fetchTrades() {

    const { data, error } = await supabase
      .from('trades')
      .select('*')
      .order('id', { ascending: false })

    if (error) {
      console.log(error)
    } else {
      setTrades(data || [])
    }
  }

  useEffect(() => {
    fetchTrades()
  }, [])

  return (
    <main className="min-h-screen bg-black text-white p-8">

      {/* Heading */}
      <div className="mb-10">

        <h1 className="text-5xl font-bold mb-3">
          📒 My Journal
        </h1>

        <p className="text-gray-400 mb-2">
          All your trading records & analytics
        </p>

        <p className="text-green-400 font-bold text-lg">
          Total Records: {trades.length}
        </p>

      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-3xl border border-gray-800">

        <table className="w-full bg-gray-900">

          {/* Table Header */}
          <thead className="bg-[#07142b] text-gray-300">

            <tr>

              <th className="p-4 text-left">
                S.No.
              </th>

              <th className="p-4 text-left">
                Stock
              </th>

              <th className="p-4 text-left">
                Strategy
              </th>

              <th className="p-4 text-left">
                Type
              </th>

              <th className="p-4 text-left">
                Buy Date
              </th>

              <th className="p-4 text-left">
                Sell Date
              </th>

              <th className="p-4 text-left">
                Entry
              </th>

              <th className="p-4 text-left">
                Exit
              </th>

              <th className="p-4 text-left">
                Qty
              </th>

              <th className="p-4 text-left">
                Brokerage
              </th>

              <th className="p-4 text-left">
                Gross P/L
              </th>

              <th className="p-4 text-left">
                Net P/L
              </th>

              <th className="p-4 text-left">
                Notes
              </th>

            </tr>

          </thead>

          {/* Table Body */}
          <tbody>

            {trades.map((trade, index) => (

              <tr
                key={trade.id}
                className="border-t border-gray-800 hover:bg-gray-800"
              >

                {/* Serial Number */}
                <td className="p-4 font-bold text-gray-400">
                  {index + 1}
                </td>

                {/* Stock Name */}
                <td className="p-4 font-bold">
                  {trade.stock_name}
                </td>

                {/* Strategy */}
                <td className="p-4">
                  {trade.strategy_name}
                </td>

                {/* Trade Type */}
                <td className="p-4">
                  {trade.trade_type}
                </td>

                {/* Buy Date */}
                <td className="p-4">
                  {trade.buy_date}
                </td>

                {/* Sell Date */}
                <td className="p-4">
                  {trade.sell_date}
                </td>

                {/* Entry Price */}
                <td className="p-4">
                  ₹ {trade.entry_price}
                </td>

                {/* Exit Price */}
                <td className="p-4">
                  ₹ {trade.exit_price}
                </td>

                {/* Quantity */}
                <td className="p-4">
                  {trade.quantity}
                </td>

                {/* Brokerage */}
                <td className="p-4">
                  ₹ {trade.brokerage}
                </td>

                {/* Gross Profit/Loss */}
                <td
                  className={`p-4 font-bold ${
                    trade.gross_pl >= 0
                      ? 'text-green-400'
                      : 'text-red-400'
                  }`}
                >
                  ₹ {trade.gross_pl}
                </td>

                {/* Net Profit/Loss */}
                <td
                  className={`p-4 font-bold ${
                    trade.net_pl >= 0
                      ? 'text-green-400'
                      : 'text-red-400'
                  }`}
                >
                  ₹ {trade.net_pl}
                </td>

                {/* Notes */}
                <td className="p-4 max-w-xs">
                  {trade.notes}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </main>
  )
}