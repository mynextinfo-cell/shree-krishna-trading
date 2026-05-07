'use client'

import { useState } from 'react'
import { supabase } from '../lib/supabase'

export default function Home() {

  const [stockName, setStockName] = useState('')
  const [strategyName, setStrategyName] = useState('')
  const [tradeType, setTradeType] = useState('BUY')

  const [buyDate, setBuyDate] = useState('')
  const [sellDate, setSellDate] = useState('')

  const [entryPrice, setEntryPrice] = useState('')
  const [exitPrice, setExitPrice] = useState('')

  const [quantity, setQuantity] = useState('')
  const [brokerage, setBrokerage] = useState('')

  const [notes, setNotes] = useState('')

  // Auto Calculations
  const totalBuy =
    Number(entryPrice || 0) * Number(quantity || 0)

  const totalSell =
    Number(exitPrice || 0) * Number(quantity || 0)

  const grossPL =
    totalSell - totalBuy

  const netPL =
    grossPL - Number(brokerage || 0)

  async function saveTrade() {

    const { error } = await supabase
      .from('trades')
      .insert([
        {
          stock_name: stockName,
          strategy_name: strategyName,
          trade_type: tradeType,

          buy_date: buyDate,
          sell_date: sellDate,

          entry_price: entryPrice,
          exit_price: exitPrice,

          quantity,
          brokerage,

          gross_pl: grossPL,
          net_pl: netPL,

          notes
        }
      ])

    if (error) {
      console.log(error)
      alert('Error saving trade')
    } else {

      alert('Trade saved successfully 🚀')

      setStockName('')
      setStrategyName('')
      setTradeType('BUY')

      setBuyDate('')
      setSellDate('')

      setEntryPrice('')
      setExitPrice('')

      setQuantity('')
      setBrokerage('')

      setNotes('')
    }
  }

  return (
    <main className="min-h-screen bg-black text-white p-8">

      <h1 className="text-5xl font-bold mb-10">
        ➕ Add Trade
      </h1>

      <div className="max-w-3xl space-y-5">

        {/* Stock Name */}
        <input
          type="text"
          placeholder="Stock / Crypto Name"
          value={stockName}
          onChange={(e) => setStockName(e.target.value)}
          className="w-full p-4 rounded-2xl bg-gray-900"
        />

        {/* Strategy */}
        <input
          type="text"
          placeholder="Strategy Name"
          value={strategyName}
          onChange={(e) => setStrategyName(e.target.value)}
          className="w-full p-4 rounded-2xl bg-gray-900"
        />

        {/* Trade Type */}
        <select
          value={tradeType}
          onChange={(e) => setTradeType(e.target.value)}
          className="w-full p-4 rounded-2xl bg-gray-900"
        >
          <option value="BUY">BUY</option>
          <option value="SELL">SELL</option>
        </select>

        {/* Buy Date */}
        <div>

          <label className="block mb-2 text-gray-400">
            Buy Date
          </label>

          <input
            type="date"
            value={buyDate}
            onChange={(e) => setBuyDate(e.target.value)}
            className="w-full p-4 rounded-2xl bg-gray-900"
          />

        </div>

        {/* Sell Date */}
        <div>

          <label className="block mb-2 text-gray-400">
            Sell Date
          </label>

          <input
            type="date"
            value={sellDate}
            onChange={(e) => setSellDate(e.target.value)}
            className="w-full p-4 rounded-2xl bg-gray-900"
          />

        </div>

        {/* Entry Price */}
        <input
          type="number"
          placeholder="Entry Price"
          value={entryPrice}
          onChange={(e) => setEntryPrice(e.target.value)}
          className="w-full p-4 rounded-2xl bg-gray-900"
        />

        {/* Exit Price */}
        <input
          type="number"
          placeholder="Exit Price"
          value={exitPrice}
          onChange={(e) => setExitPrice(e.target.value)}
          className="w-full p-4 rounded-2xl bg-gray-900"
        />

        {/* Quantity */}
        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="w-full p-4 rounded-2xl bg-gray-900"
        />

        {/* Brokerage */}
        <input
          type="number"
          placeholder="Brokerage"
          value={brokerage}
          onChange={(e) => setBrokerage(e.target.value)}
          className="w-full p-4 rounded-2xl bg-gray-900"
        />

        {/* Calculation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

          <div className="bg-gray-900 p-5 rounded-2xl">

            <h2 className="text-gray-400 mb-2">
              Total Buy
            </h2>

            <p className="text-3xl font-bold">
              ₹ {totalBuy}
            </p>

          </div>

          <div className="bg-gray-900 p-5 rounded-2xl">

            <h2 className="text-gray-400 mb-2">
              Gross P/L
            </h2>

            <p className="text-3xl font-bold">
              ₹ {grossPL}
            </p>

          </div>

          <div className="bg-gray-900 p-5 rounded-2xl">

            <h2 className="text-gray-400 mb-2">
              Net P/L
            </h2>

            <p
              className={`text-3xl font-bold ${
                netPL >= 0
                  ? 'text-green-400'
                  : 'text-red-400'
              }`}
            >
              ₹ {netPL}
            </p>

          </div>

        </div>

        {/* Notes */}
        <textarea
          placeholder="Trade Notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full p-4 rounded-2xl bg-gray-900 h-40"
        />

        {/* Save Button */}
        <button
          onClick={saveTrade}
          className="bg-green-600 hover:bg-green-700 px-8 py-4 rounded-2xl font-bold"
        >
          Save Trade
        </button>

      </div>

    </main>
  )
}