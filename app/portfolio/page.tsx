'use client'

import {
  TrendingUp,
  TrendingDown,
  PieChart,
  Wallet,
} from 'lucide-react'

type Holding = {
  stock: string
  qty: number
  avg: number
  current: number
}

export default function PortfolioPage() {

  const holdings: Holding[] = [

    {
      stock: 'RELIANCE',
      qty: 20,
      avg: 2680,
      current: 2845,
    },

    {
      stock: 'TCS',
      qty: 10,
      avg: 3920,
      current: 4120,
    },

    {
      stock: 'INFY',
      qty: 25,
      avg: 1620,
      current: 1585,
    },

    {
      stock: 'HDFCBANK',
      qty: 15,
      avg: 1680,
      current: 1742,
    },

  ]

  const invested =
    holdings.reduce(
      (acc, item) =>
        acc + item.avg * item.qty,
      0
    )

  const currentValue =
    holdings.reduce(
      (acc, item) =>
        acc +
        item.current * item.qty,
      0
    )

  const totalPnL =
    currentValue - invested

  const totalReturn =
    (
      (totalPnL / invested) *
      100
    ).toFixed(2)

  return (

    <div className="min-h-screen bg-[#fff7fa] p-8">

      {/* HEADER */}
      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-6xl font-black text-pink-700">

            Portfolio

          </h1>

          <p className="text-pink-500 text-2xl mt-3">

            Track Your Investments

          </p>

        </div>

        <div className="bg-white rounded-3xl p-5 shadow-md border border-pink-100">

          <Wallet
            className="text-pink-600"
            size={40}
          />

        </div>

      </div>

      {/* STATS */}
      <div className="grid grid-cols-4 gap-6 mt-10">

        {/* INVESTED */}
        <div className="bg-white rounded-3xl p-8 shadow-md border border-pink-100">

          <p className="text-gray-500 text-xl">

            Invested Amount

          </p>

          <h2 className="text-5xl font-black text-pink-600 mt-5">

            ₹ {invested.toLocaleString()}

          </h2>

        </div>

        {/* CURRENT */}
        <div className="bg-white rounded-3xl p-8 shadow-md border border-pink-100">

          <p className="text-gray-500 text-xl">

            Current Value

          </p>

          <h2 className="text-5xl font-black text-blue-600 mt-5">

            ₹ {currentValue.toLocaleString()}

          </h2>

        </div>

        {/* PNL */}
        <div className="bg-white rounded-3xl p-8 shadow-md border border-pink-100">

          <p className="text-gray-500 text-xl">

            Total P/L

          </p>

          <h2
            className={`text-5xl font-black mt-5 ${
              totalPnL >= 0
                ? 'text-green-600'
                : 'text-red-600'
            }`}
          >

            ₹ {totalPnL.toLocaleString()}

          </h2>

        </div>

        {/* RETURN */}
        <div className="bg-white rounded-3xl p-8 shadow-md border border-pink-100">

          <p className="text-gray-500 text-xl">

            Total Return

          </p>

          <h2
            className={`text-5xl font-black mt-5 ${
              totalPnL >= 0
                ? 'text-green-600'
                : 'text-red-600'
            }`}
          >

            {totalReturn}%

          </h2>

        </div>

      </div>

      {/* HOLDINGS */}
      <div className="mt-10 bg-white rounded-3xl shadow-md border border-pink-100 overflow-hidden">

        {/* HEADER */}
        <div className="grid grid-cols-6 bg-pink-50 px-6 py-5 font-bold text-gray-700">

          <p>Stock</p>

          <p>Quantity</p>

          <p>Avg Price</p>

          <p>Current Price</p>

          <p>P/L</p>

          <p>Status</p>

        </div>

        {/* ROWS */}
        {holdings.map((item, index) => {

          const pnl =
            (item.current - item.avg) *
            item.qty

          const positive = pnl >= 0

          return (

            <div
              key={index}
              className="grid grid-cols-6 px-6 py-5 border-t border-pink-100 items-center"
            >

              <h3 className="text-2xl font-black">

                {item.stock}

              </h3>

              <p className="text-lg">

                {item.qty}

              </p>

              <p className="text-lg">

                ₹ {item.avg}

              </p>

              <p className="text-lg">

                ₹ {item.current}

              </p>

              <p
                className={`font-bold text-xl ${
                  positive
                    ? 'text-green-600'
                    : 'text-red-600'
                }`}
              >

                ₹ {pnl}

              </p>

              <div>

                {positive ? (

                  <TrendingUp
                    className="text-green-600"
                    size={28}
                  />

                ) : (

                  <TrendingDown
                    className="text-red-600"
                    size={28}
                  />

                )}

              </div>

            </div>

          )

        })}

      </div>

      {/* ALLOCATION */}
      <div className="mt-10 bg-white rounded-3xl p-8 shadow-md border border-pink-100">

        <div className="flex items-center gap-4 mb-8">

          <PieChart
            className="text-pink-600"
            size={40}
          />

          <h2 className="text-4xl font-black text-gray-800">

            Portfolio Allocation

          </h2>

        </div>

        <div className="grid grid-cols-4 gap-6">

          {holdings.map((item, index) => {

            const allocation =
              (
                (item.current *
                  item.qty /
                  currentValue) *
                100
              ).toFixed(1)

            return (

              <div
                key={index}
                className="bg-[#fff1f7] rounded-3xl p-6 border border-pink-100"
              >

                <h3 className="text-3xl font-black">

                  {item.stock}

                </h3>

                <p className="text-pink-600 text-5xl font-black mt-5">

                  {allocation}%

                </p>

              </div>

            )

          })}

        </div>

      </div>

    </div>

  )

}