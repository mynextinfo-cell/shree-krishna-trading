'use client'

import { useEffect, useRef, useState }

from 'react'

import Navbar from '@/components/Navbar'

import nseStocks from '../data/nseStocks'

export default function TradingViewPage() {

  const chartRef = useRef<HTMLDivElement>(null)

  const [selectedStock, setSelectedStock] = useState('NSE:RELIANCE')

  const [search, setSearch] = useState('RELIANCE')

  // FILTER STOCKS
  const filteredStocks = nseStocks.filter((stock) =>

    stock.toLowerCase().includes(

      search.toLowerCase()

    )

  )

  // LOAD CHART
  useEffect(() => {

    if (!chartRef.current) return

    chartRef.current.innerHTML = ''

    const script = document.createElement('script')

    script.src =

      'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js'

    script.type = 'text/javascript'

    script.async = true

    script.innerHTML = JSON.stringify({

      autosize: true,

      symbol: selectedStock,

      interval: '15',

      timezone: 'Asia/Kolkata',

      theme: 'dark',

      style: '1',

      locale: 'en',

      enable_publishing: false,

      allow_symbol_change: true,

      calendar: false,

      support_host: 'https://www.tradingview.com'

    })

    chartRef.current.appendChild(script)

  }, [selectedStock])

  return (

    <main className="min-h-screen bg-black text-white p-6">

      {/* NAVBAR */}
      <Navbar />

      {/* PAGE TITLE */}
      <div className="mb-8">

        <h1 className="text-5xl font-bold text-pink-500 mb-2">

          Live Trading Charts

        </h1>

        <p className="text-gray-400 text-lg">

          Professional NSE market analysis dashboard

        </p>

      </div>

      {/* SEARCH BOX */}
      <div className="bg-zinc-900 rounded-3xl p-6 mb-8 border border-zinc-700">

        <h2 className="text-2xl font-bold mb-5">

          🔍 Search NSE Stock

        </h2>

        <div className="relative">

          {/* INPUT */}
          <input
            type="text"
            placeholder="Type NSE stock name..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="w-full bg-zinc-800 border border-zinc-600 rounded-2xl p-4 text-white"
          />

          {/* DROPDOWN */}
          {search && (

            <div className="absolute z-50 bg-zinc-900 border border-zinc-700 rounded-2xl w-full mt-2 max-h-[300px] overflow-y-auto shadow-2xl">

              {filteredStocks

                .slice(0, 20)

                .map((stock) => (

                  <button
                    key={stock}
                    onClick={() => {

                      setSearch(stock)

                      setSelectedStock(

                        `NSE:${stock}`

                      )

                    }}
                    className="w-full text-left px-5 py-4 hover:bg-zinc-800 border-b border-zinc-700"
                  >

                    {stock}

                  </button>

                ))}

            </div>

          )}

        </div>

      </div>

      {/* CURRENT STOCK */}
      <div className="bg-zinc-900 rounded-3xl p-5 mb-6 border border-zinc-700">

        <h2 className="text-2xl font-bold text-pink-400">

          Current Selection:

          <span className="ml-3 text-white">

            {selectedStock}

          </span>

        </h2>

      </div>

      {/* CHART */}
      <div className="bg-zinc-900 rounded-3xl p-4 border border-zinc-700 shadow-2xl">

        <div

          ref={chartRef}

          className="w-full h-[700px]"

        />

      </div>

    </main>

  )

}