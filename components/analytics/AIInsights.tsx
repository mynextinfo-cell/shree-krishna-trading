"use client";

interface AIInsightsProps {

  trades: any[];
}

export default function AIInsights({

  trades,

}: AIInsightsProps) {

  // NO DATA

  if (
    !trades ||
    trades.length === 0
  ) {

    return (

      <div className="bg-white rounded-3xl shadow-lg border border-purple-100 p-8">

        <h2 className="text-2xl font-bold text-zinc-800 mb-4">

          AI Trade Insights

        </h2>

        <p className="text-zinc-500">

          No trade data available.

        </p>

      </div>
    );
  }

  // WINNING TRADES

  const winningTrades =
    trades.filter(
      (trade) =>
        Number(
          trade.net_pnl
        ) > 0
    );

  // LOSING TRADES

  const losingTrades =
    trades.filter(
      (trade) =>
        Number(
          trade.net_pnl
        ) < 0
    );

  // WIN RATE

  const winRate =

    (
      (
        winningTrades.length /
        trades.length
      ) * 100
    ).toFixed(1);

  // STRATEGY ANALYSIS

  const strategyMap: any = {};

  trades.forEach(
    (trade) => {

      const strategy =
        trade.strategy ||
        "Unknown";

      if (
        !strategyMap[
          strategy
        ]
      ) {

        strategyMap[
          strategy
        ] = {

          total: 0,

          pnl: 0,
        };
      }

      strategyMap[
        strategy
      ].total += 1;

      strategyMap[
        strategy
      ].pnl += Number(
        trade.net_pnl || 0
      );
    }
  );

  // BEST STRATEGY

  let bestStrategy =
    "N/A";

  let bestStrategyPnl =
    -Infinity;

  Object.keys(
    strategyMap
  ).forEach(
    (strategy) => {

      const pnl =
        strategyMap[
          strategy
        ].pnl;

      if (
        pnl >
        bestStrategyPnl
      ) {

        bestStrategy =
          strategy;

        bestStrategyPnl =
          pnl;
      }
    }
  );

  // WORST STRATEGY

  let worstStrategy =
    "N/A";

  let worstStrategyPnl =
    Infinity;

  Object.keys(
    strategyMap
  ).forEach(
    (strategy) => {

      const pnl =
        strategyMap[
          strategy
        ].pnl;

      if (
        pnl <
        worstStrategyPnl
      ) {

        worstStrategy =
          strategy;

        worstStrategyPnl =
          pnl;
      }
    }
  );

  // BEST STOCK

  let bestTrade =
    trades[0];

  trades.forEach(
    (trade) => {

      if (

        Number(
          trade.net_pnl
        ) >

        Number(
          bestTrade.net_pnl
        )

      ) {

        bestTrade =
          trade;
      }
    }
  );

  // WORST STOCK

  let worstTrade =
    trades[0];

  trades.forEach(
    (trade) => {

      if (

        Number(
          trade.net_pnl
        ) <

        Number(
          worstTrade.net_pnl
        )

      ) {

        worstTrade =
          trade;
      }
    }
  );

  // AI MESSAGE

  let aiMessage =
    "";

  if (
    Number(winRate) >= 70
  ) {

    aiMessage =
      "Excellent trading discipline and strong execution.";
  }

  else if (
    Number(winRate) >= 50
  ) {

    aiMessage =
      "Good performance. Focus more on risk management.";
  }

  else {

    aiMessage =
      "Your loss rate is high. Avoid emotional or revenge trading.";
  }

  return (

    <div className="bg-white rounded-3xl shadow-lg border border-purple-100 p-8">

      {/* TITLE */}

      <div className="flex items-center justify-between mb-6">

        <div>

          <h2 className="text-3xl font-bold text-zinc-800">

            AI Trade Insights

          </h2>

          <p className="text-zinc-500 mt-2">

            Smart analysis generated from your trading history.

          </p>

        </div>

        <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-5 py-3 rounded-2xl font-bold shadow-lg">

          AI Powered

        </div>

      </div>

      {/* GRID */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">

        {/* WIN RATE */}

        <div className="bg-purple-50 border border-purple-100 rounded-2xl p-5">

          <h3 className="text-zinc-500 font-semibold">

            Win Rate

          </h3>

          <p className="text-3xl font-bold text-green-600 mt-2">

            {winRate}%

          </p>

        </div>

        {/* BEST STRATEGY */}

        <div className="bg-purple-50 border border-purple-100 rounded-2xl p-5">

          <h3 className="text-zinc-500 font-semibold">

            Best Strategy

          </h3>

          <p className="text-2xl font-bold text-blue-600 mt-2">

            {bestStrategy}

          </p>

          <p className="text-sm text-zinc-500 mt-2">

            Net P&L:
            {" "}
            ₹
            {bestStrategyPnl.toFixed(2)}

          </p>

        </div>

        {/* WORST STRATEGY */}

        <div className="bg-purple-50 border border-purple-100 rounded-2xl p-5">

          <h3 className="text-zinc-500 font-semibold">

            Worst Strategy

          </h3>

          <p className="text-2xl font-bold text-red-500 mt-2">

            {worstStrategy}

          </p>

          <p className="text-sm text-zinc-500 mt-2">

            Net P&L:
            {" "}
            ₹
            {worstStrategyPnl.toFixed(2)}

          </p>

        </div>

        {/* BEST TRADE */}

        <div className="bg-purple-50 border border-purple-100 rounded-2xl p-5">

          <h3 className="text-zinc-500 font-semibold">

            Best Trade

          </h3>

          <p className="text-2xl font-bold text-green-600 mt-2">

            {bestTrade.stock_name}

          </p>

          <p className="text-sm text-zinc-500 mt-2">

            Profit:
            {" "}
            ₹
            {bestTrade.net_pnl}

          </p>

        </div>

        {/* WORST TRADE */}

        <div className="bg-purple-50 border border-purple-100 rounded-2xl p-5">

          <h3 className="text-zinc-500 font-semibold">

            Worst Trade

          </h3>

          <p className="text-2xl font-bold text-red-500 mt-2">

            {worstTrade.stock_name}

          </p>

          <p className="text-sm text-zinc-500 mt-2">

            Loss:
            {" "}
            ₹
            {worstTrade.net_pnl}

          </p>

        </div>

        {/* AI MESSAGE */}

        <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl p-5 shadow-lg">

          <h3 className="font-semibold text-lg">

            AI Suggestion

          </h3>

          <p className="mt-3 leading-relaxed">

            {aiMessage}

          </p>

        </div>

      </div>

    </div>
  );
}