'use client'

import { useEffect, useState } from 'react'
import nseStocks from '../data/nseStocks'

export default function ChartPage() {

  const [currentTime, setCurrentTime] = useState('')
  const [stockInput, setStockInput] = useState('')
  const [symbol, setSymbol] = useState('NSE:RELIANCE')

  // Clock
  useEffect(() => {

    const updateClock = () => {

      const now = new Date()

      setCurrentTime(now.toLocaleString())
    }

    updateClock()

    const interval = setInterval(updateClock, 1000)

    return () => clearInterval(interval)

  }, [])

  // Dashboard Data
  const indexes = [

    {
      name: 'NIFTY50',
      symbol: 'NSE:NIFTY',
      price: '₹22,450',
      change: '+1.24%',
      trend: 'up'
    },

    {
      name: 'NIFTY100',
      symbol: 'NSECNX:NIFTY',
      price: '₹23,120',
      change: '+0.92%',
      trend: 'up'
    },

    {
      name: 'S&P500',
      symbol: 'SP:SPX',
      price: '$5,210',
      change: '-0.42%',
      trend: 'down'
    },

    {
      name: 'DJIA',
      symbol: 'DJ:DJI',
      price: '$39,500',
      change: '+0.71%',
      trend: 'up'
    },

    {
      name: 'Nasdaq',
      symbol: 'NASDAQ:IXIC',
      price: '$16,300',
      change: '+1.18%',
      trend: 'up'
    },

    {
      name: 'Russell 2000',
      symbol: 'INDEX:RUT',
      price: '$2,050',
      change: '-0.36%',
      trend: 'down'
    },

    {
      name: 'NYSE',
      symbol: 'NYSE:NYA',
      price: '$18,100',
      change: '+0.48%',
      trend: 'up'
    }

  ]

  // Fast Search Suggestions
  const filteredStocks = nseStocks.filter((stock) =>
    stock.toLowerCase().includes(
      stockInput.toLowerCase()
    )
  )

  return (

    <main className="min-h-screen bg-pink-100 text-black p-6">

      {/* Header */}
      <div className="flex justify-between items-start mb-10 flex-wrap gap-5">

        <div>

          <h1 className="text-5xl font-bold mb-2 text-pink-700">
            Shree Krishna Trading
          </h1>

          <p className="text-gray-700 text-lg">
            Professional Trading Workspace
          </p>

        </div>

        {/* Time */}
        <div className="bg-white px-6 py-4 rounded-3xl shadow-lg border border-pink-200">

          <p className="font-bold text-lg">
            📅 {currentTime}
          </p>

        </div>

      </div>

      {/* Dashboard */}
      <div className="grid grid-cols-3 md:grid-cols-5 xl:grid-cols-7 gap-3 mb-8">

        {indexes.map((index) => (

          <button
            key={index.symbol}
            onClick={() => setSymbol(index.symbol)}
            className={`

              rounded-lg
              p-3
              shadow-lg
              transition-all
              duration-300
              aspect-[2.8/1.6]
              text-left

              ${
                index.trend === 'up'
                  ? 'bg-green-500 hover:bg-green-600 text-white'
                  : 'bg-red-500 hover:bg-red-600 text-white'
              }

            `}
          >

            <h2 className="text-sm font-bold mb-1">
              {index.name}
            </h2>

            <p className="text-lg font-bold">
              {index.price}
            </p>

            <p className="text-sm">
              {index.change}
            </p>

          </button>

        ))}

      </div>

      {/* Search Section */}
      <div className="bg-white rounded-3xl p-6 shadow-lg mb-8 relative">

        <h2 className="text-xl font-bold mb-4">
          🔍 Search NSE Stock
        </h2>

        <input
          type="text"
          placeholder="Type stock name..."
          value={stockInput}
          onChange={(e) => setStockInput(e.target.value)}
          className="w-full border border-pink-300 rounded-2xl p-4"
        />

        {/* Dropdown Suggestions */}
        {stockInput && (

          <div className="absolute left-6 right-6 top-28 bg-white border border-pink-200 rounded-2xl shadow-xl max-h-[300px] overflow-y-auto z-50">

            {filteredStocks.slice(0, 20).map((stock) => (

              <button
                key={stock}
                onClick={() => {

                  setSymbol(`NSE:${stock}`)
                  setStockInput(stock)

                }}
                className="w-full text-left px-5 py-3 hover:bg-pink-100 border-b"
              >

                {stock}

              </button>

            ))}

          </div>

        )}

      </div>

      {/* Current Selection */}
      <div className="bg-white rounded-2xl p-5 shadow-lg mb-8 flex flex-wrap items-center justify-between gap-4 border border-pink-200">

        <div>

          <p className="text-sm text-gray-500 mb-1">
            Current Selection
          </p>

          <h2 className="text-2xl font-bold text-pink-700">
            {symbol}
          </h2>

        </div>

        {/* Open Chart */}
        <a
          href={`https://www.tradingview.com/chart/?symbol=${symbol}`}
          target="_blank"
          className="bg-black hover:bg-gray-800 text-white px-6 py-3 rounded-2xl font-bold shadow-lg"
        >
          📊 Open Chart
        </a>

      </div>

    </main>
  )
}