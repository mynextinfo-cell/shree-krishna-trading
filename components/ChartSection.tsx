'use client'

import { useEffect, useRef } from 'react'

export default function ChartSection() {

  const chartRef = useRef<HTMLDivElement>(null)

  useEffect(() => {

    // LOAD SCRIPT
    const script = document.createElement('script')

    script.src =
      'https://s3.tradingview.com/tv.js'

    script.async = true

    script.onload = () => {

      if ((window as any).TradingView) {

        new (window as any).TradingView.widget({

          autosize: true,

          symbol: 'NSE:NIFTY',

          interval: '15',

          timezone: 'Asia/Kolkata',

          theme: 'light',

          style: '1',

          locale: 'en',

          toolbar_bg: '#fdf2f8',

          enable_publishing: false,

          hide_top_toolbar: false,

          hide_legend: false,

          save_image: true,

          container_id: 'tradingview_chart'

        })

      }

    }

    document.body.appendChild(script)

  }, [])

  return (

    <div className="mt-8 bg-white rounded-3xl shadow-lg border border-pink-100 overflow-hidden">

      {/* HEADER */}
      <div className="flex items-center justify-between px-6 py-5 border-b bg-gradient-to-r from-pink-500 to-rose-500 text-white">

        <div>

          <h2 className="text-2xl font-black">

            Live Trading Chart

          </h2>

          <p className="text-pink-100 mt-1">

            TradingView Professional Terminal

          </p>

        </div>

        {/* TIMEFRAMES */}
        <div className="flex gap-3">

          {['1m', '5m', '15m', '1H', '1D'].map(

            (time) => (

              <button
                key={time}
                className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-xl font-semibold transition-all"
              >

                {time}

              </button>

            )

          )}

        </div>

      </div>

      {/* CHART */}
      <div
        id="tradingview_chart"
        ref={chartRef}
        className="w-full h-[650px]"
      />

    </div>

  )

}