'use client'

import {
  TrendingUp,
  TrendingDown,
  Brain,
  Target,
  Trophy,
  AlertTriangle,
  BarChart3,
  PieChart,
} from 'lucide-react'

type Trade = {
  stock: string
  pnl: number
  emotion: string
  strategy: string
  profit: boolean
}

export default function AnalyticsPage() {

  // SAMPLE DATA
  const trades: Trade[] = [

    {
      stock: 'RELIANCE',
      pnl: 5200,
      emotion: 'Confident',
      strategy: 'Breakout',
      profit: true,
    },

    {
      stock: 'INFY',
      pnl: -1800,
      emotion: 'Fear',
      strategy: 'Reversal',
      profit: false,
    },

    {
      stock: 'TCS',
      pnl: 3400,
      emotion: 'Disciplined',
      strategy: 'Momentum',
      profit: true,
    },

    {
      stock: 'HDFCBANK',
      pnl: -950,
      emotion: 'FOMO',
      strategy: 'Scalping',
      profit: false,
    },

    {
      stock: 'BANKNIFTY',
      pnl: 7600,
      emotion: 'Focused',
      strategy: 'Option Buying',
      profit: true,
    },

  ]

  // CALCULATIONS
  const totalPnL =
    trades.reduce(
      (acc, trade) =>
        acc + trade.pnl,
      0
    )

  const winningTrades =
    trades.filter(
      trade => trade.profit
    )

  const losingTrades =
    trades.filter(
      trade => !trade.profit
    )

  const winRatio =
    (
      (winningTrades.length /
        trades.length) *
      100
    ).toFixed(0)

  const bestTrade =
    Math.max(
      ...trades.map(
        trade => trade.pnl
      )
    )

  const worstTrade =
    Math.min(
      ...trades.map(
        trade => trade.pnl
      )
    )

  const averagePnL =
    (
      totalPnL /
      trades.length
    ).toFixed(0)

  // AI INSIGHT
  const aiInsight =
    totalPnL > 0
      ? 'Your trading performance is improving consistently. Momentum and breakout strategies are generating strong profits. Continue maintaining discipline and proper risk management.'
      : 'Your recent performance indicates emotional decision making. Reduce overtrading and focus on higher probability setups.'

  return (

    <div className="min-h-screen bg-[#fff7fa] p-8">

      {/* HEADER */}
      <div className="flex items-center gap-5 mb-10">

        <div className="bg-white p-5 rounded-3xl shadow-md border border-pink-100">

          <Brain
            className="text-pink-600"
            size={42}
          />

        </div>

        <div>

          <h1 className="text-6xl font-black text-pink-700">

            AI Analytics

          </h1>

          <p className="text-pink-500 text-2xl mt-2">

            Smart Trading Performance Insights

          </p>

        </div>

      </div>

      {/* TOP STATS */}
      <div className="grid grid-cols-4 gap-6 mb-10">

        {/* TOTAL PNL */}
        <div className="bg-white rounded-3xl p-8 shadow-md border border-pink-100">

          <div className="flex items-center gap-4">

            <TrendingUp
              className="text-green-600"
              size={36}
            />

            <p className="text-xl font-bold text-gray-600">

              Total P/L

            </p>

          </div>

          <h2
            className={`text-5xl font-black mt-6 ${
              totalPnL >= 0
                ? 'text-green-600'
                : 'text-red-600'
            }`}
          >

            ₹ {totalPnL}

          </h2>

        </div>

        {/* WIN RATIO */}
        <div className="bg-white rounded-3xl p-8 shadow-md border border-pink-100">

          <div className="flex items-center gap-4">

            <Target
              className="text-blue-600"
              size={36}
            />

            <p className="text-xl font-bold text-gray-600">

              Win Ratio

            </p>

          </div>

          <h2 className="text-5xl font-black text-blue-600 mt-6">

            {winRatio}%

          </h2>

        </div>

        {/* BEST TRADE */}
        <div className="bg-white rounded-3xl p-8 shadow-md border border-pink-100">

          <div className="flex items-center gap-4">

            <Trophy
              className="text-yellow-500"
              size={36}
            />

            <p className="text-xl font-bold text-gray-600">

              Best Trade

            </p>

          </div>

          <h2 className="text-5xl font-black text-yellow-500 mt-6">

            ₹ {bestTrade}

          </h2>

        </div>

        {/* WORST TRADE */}
        <div className="bg-white rounded-3xl p-8 shadow-md border border-pink-100">

          <div className="flex items-center gap-4">

            <AlertTriangle
              className="text-red-500"
              size={36}
            />

            <p className="text-xl font-bold text-gray-600">

              Worst Trade

            </p>

          </div>

          <h2 className="text-5xl font-black text-red-500 mt-6">

            ₹ {worstTrade}

          </h2>

        </div>

      </div>

      {/* CHART CARDS */}
      <div className="grid grid-cols-2 gap-8 mb-10">

        {/* STRATEGY PERFORMANCE */}
        <div className="bg-white rounded-3xl p-8 shadow-md border border-pink-100">

          <div className="flex items-center gap-4 mb-8">

            <BarChart3
              className="text-pink-600"
              size={38}
            />

            <h2 className="text-3xl font-black text-gray-800">

              Strategy Performance

            </h2>

          </div>

          <div className="space-y-6">

            {[
              'Breakout',
              'Momentum',
              'Reversal',
              'Scalping',
            ].map(
              (
                strategy,
                index
              ) => (

                <div
                  key={index}
                >

                  <div className="flex justify-between mb-2">

                    <p className="font-bold text-lg">

                      {strategy}

                    </p>

                    <p className="font-bold text-pink-600">

                      {
                        Math.floor(
                          Math.random() *
                            40 +
                            60
                        )
                      }
                      %

                    </p>

                  </div>

                  <div className="w-full h-4 bg-pink-100 rounded-full overflow-hidden">

                    <div
                      className="h-full bg-gradient-to-r from-pink-500 to-rose-500 rounded-full"
                      style={{
                        width: `${
                          Math.floor(
                            Math.random() *
                              40 +
                              60
                          )
                        }%`,
                      }}
                    />

                  </div>

                </div>

              )
            )}

          </div>

        </div>

        {/* EMOTIONAL ANALYSIS */}
        <div className="bg-white rounded-3xl p-8 shadow-md border border-pink-100">

          <div className="flex items-center gap-4 mb-8">

            <PieChart
              className="text-blue-600"
              size={38}
            />

            <h2 className="text-3xl font-black text-gray-800">

              Emotional Analysis

            </h2>

          </div>

          <div className="space-y-5">

            {[
              'Confident',
              'Focused',
              'Fear',
              'FOMO',
              'Disciplined',
            ].map(
              (
                emotion,
                index
              ) => (

                <div
                  key={index}
                  className="flex items-center justify-between bg-[#fff1f7] p-5 rounded-2xl"
                >

                  <p className="text-xl font-bold">

                    {emotion}

                  </p>

                  <p className="text-pink-600 text-2xl font-black">

                    {
                      Math.floor(
                        Math.random() *
                          25 +
                          10
                      )
                    }
                    %

                  </p>

                </div>

              )
            )}

          </div>

        </div>

      </div>

      {/* AI INSIGHT */}
      <div className="bg-white rounded-3xl p-10 shadow-md border border-pink-100">

        <div className="flex items-center gap-5 mb-8">

          <Brain
            className="text-pink-600"
            size={45}
          />

          <h2 className="text-4xl font-black text-gray-800">

            AI Trading Insight

          </h2>

        </div>

        <p className="text-2xl text-gray-700 leading-relaxed">

          {aiInsight}

        </p>

      </div>

      {/* TRADE HISTORY */}
      <div className="mt-10 bg-white rounded-3xl shadow-md border border-pink-100 overflow-hidden">

        {/* HEADER */}
        <div className="grid grid-cols-5 bg-pink-50 px-8 py-6 font-black text-xl text-gray-700">

          <p>Stock</p>

          <p>P/L</p>

          <p>Emotion</p>

          <p>Strategy</p>

          <p>Status</p>

        </div>

        {/* ROWS */}
        {trades.map(
          (
            trade,
            index
          ) => (

            <div
              key={index}
              className="grid grid-cols-5 px-8 py-6 border-t border-pink-100 items-center"
            >

              <p className="font-black text-2xl">

                {trade.stock}

              </p>

              <p
                className={`font-black text-2xl ${
                  trade.pnl >= 0
                    ? 'text-green-600'
                    : 'text-red-600'
                }`}
              >

                ₹ {trade.pnl}

              </p>

              <p className="font-bold text-lg">

                {trade.emotion}

              </p>

              <p className="font-bold text-lg">

                {trade.strategy}

              </p>

              <div>

                <span
                  className={`px-5 py-2 rounded-2xl text-white font-bold text-lg ${
                    trade.profit
                      ? 'bg-green-500'
                      : 'bg-red-500'
                  }`}
                >

                  {trade.profit
                    ? 'Profit'
                    : 'Loss'}

                </span>

              </div>

            </div>

          )
        )}

      </div>

    </div>

  )

}