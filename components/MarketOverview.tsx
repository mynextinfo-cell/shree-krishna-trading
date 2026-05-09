'use client'

import { useEffect, useState } from 'react'

type MarketData = {

  symbol: string

  name: string

  currency: string

  price: number

  changePercent: number

}

export default function MarketOverview() {

  const [markets, setMarkets] = useState<MarketData[]>([])

  const [loading, setLoading] = useState(true)

  // FETCH MARKET DATA
  const fetchMarketData = async () => {

    try {

      const response = await fetch('/api/markets')

      const data = await response.json()

      // ENSURE ARRAY RESPONSE
      if (Array.isArray(data)) {

        setMarkets(data)

      } else {

        console.log('Invalid API response')

        setMarkets([])

      }

    } catch (error) {

      console.log(error)

      setMarkets([])

    } finally {

      setLoading(false)

    }

  }

  useEffect(() => {

    fetchMarketData()

    // AUTO REFRESH EVERY 30 SEC
    const interval = setInterval(() => {

      fetchMarketData()

    }, 30000)

    return () => clearInterval(interval)

  }, [])

  // LOADING STATE
  if (loading) {

    return (

      <div className="bg-white rounded-[24px] shadow-lg p-6 mb-8 border border-pink-200">

        <h2 className="text-2xl font-black text-pink-700 mb-4">

          Live Global Markets

        </h2>

        <p className="text-gray-500">

          Loading market data...

        </p>

      </div>

    )

  }

  return (

    <div className="mb-8">

      {/* SECTION TITLE */}
      <div className="flex items-center justify-between mb-4">

        <div>

          <h2 className="text-3xl font-black text-pink-800">

            Live Global Markets

          </h2>

          <p className="text-pink-600 mt-1">

            Real-time market overview

          </p>

        </div>

        <div className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-bold text-sm shadow">

          ● LIVE

        </div>

      </div>

      {/* MARKET CARDS */}
      <div className="grid md:grid-cols-5 gap-4">

        {markets.map((market) => {

          const isPositive =

            market.changePercent >= 0

          return (

            <div
              key={market.symbol}
              className={`rounded-[24px] p-5 shadow-lg border transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl ${
                isPositive

                  ? 'bg-green-50 border-green-200'

                  : 'bg-red-50 border-red-200'
              }`}
            >

              {/* TOP SECTION */}
              <div className="flex items-center gap-2 mb-4">

                <div
                  className={`text-2xl font-black ${
                    isPositive

                      ? 'text-green-600'

                      : 'text-red-600'
                  }`}
                >

                  {isPositive ? '▲' : '▼'}

                </div>

                <h3 className="text-lg font-bold text-black">

                  {market.name}

                </h3>

              </div>

              {/* PRICE */}
              <div className="mb-3">

                <h2 className="text-3xl font-black text-black">

                  {market.currency}

                  {market.price.toLocaleString()}

                </h2>

              </div>

              {/* CHANGE */}
              <div>

                <p
                  className={`text-lg font-bold ${
                    isPositive

                      ? 'text-green-600'

                      : 'text-red-600'
                  }`}
                >

                  {isPositive ? '+' : ''}

                  {market.changePercent.toFixed(2)}%

                </p>

              </div>

            </div>

          )

        })}

      </div>

    </div>

  )

}