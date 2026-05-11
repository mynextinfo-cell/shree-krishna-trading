"use client";

export default function MarketTicker() {

  const tickerData = [
    {
      symbol: "NIFTY",
      value: "₹24,850.35",
      change: "+₹125.40",
      positive: true,
    },
    {
      symbol: "BANKNIFTY",
      value: "₹53,120.80",
      change: "-₹210.25",
      positive: false,
    },
    {
      symbol: "SENSEX",
      value: "₹81,245.65",
      change: "+₹310.75",
      positive: true,
    },
    {
      symbol: "NASDAQ",
      value: "$19,210.45",
      change: "+$95.15",
      positive: true,
    },
    {
      symbol: "DOW JONES",
      value: "$42,350.90",
      change: "-$120.20",
      positive: false,
    },
  ];

  return (

    <div className="bg-gradient-to-r from-sky-100 to-blue-100 border border-blue-200 rounded-2xl overflow-hidden mb-4 shadow-md">

      {/* HEADER */}

      <div className="px-4 py-2 border-b border-blue-200">

        <h2 className="text-zinc-800 text-sm font-bold">

          Live Market Ticker

        </h2>

      </div>

      {/* TICKER */}

      <div className="relative overflow-hidden">

        <div className="ticker-track py-3">

          {[...tickerData, ...tickerData].map(
            (item, index) => (

              <div
                key={index}
                className="ticker-item"
              >

                {/* SYMBOL */}

                <span className="text-zinc-900 font-bold text-base">

                  {item.symbol}

                </span>

                {/* VALUE */}

                <span className="text-zinc-700 text-sm font-medium">

                  {item.value}

                </span>

                {/* CHANGE */}

                <span
                  className={`font-bold text-sm ${
                    item.positive
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >

                  {item.change}

                </span>

              </div>
            )
          )}

        </div>

      </div>

      {/* STYLE */}

      <style jsx>{`

        .ticker-track {

          display: flex;
          width: max-content;
          animation: scrollTicker 35s linear infinite;
        }

        .ticker-item {

          display: flex;
          align-items: center;
          gap: 10px;
          margin-right: 45px;
          white-space: nowrap;
        }

        @keyframes scrollTicker {

          0% {
            transform: translateX(0);
          }

          100% {
            transform: translateX(-50%);
          }
        }

      `}</style>

    </div>
  );
}