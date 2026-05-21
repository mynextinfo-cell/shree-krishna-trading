"use client";

import {
  useEffect,
  useState,
} from "react";

type StockData = {

  symbol: string;

  price: number;

  change: number;

};

export default function YahooTicker() {

  const [stocks, setStocks] =
    useState<StockData[]>([]);

  const [mounted, setMounted] =
    useState(false);

  useEffect(() => {

    setMounted(true);

  }, []);

  useEffect(() => {

    if (!mounted) return;

    const fetchStocks =
      async () => {

        try {

          const response =
            await fetch(
              "/api/market",
              {
                cache:
                  "no-store",
              }
            );

          if (
            !response.ok
          ) {

            throw new Error(
              "API failed"
            );
          }

          const data =
            await response.json();

          if (
            Array.isArray(
              data
            )
          ) {

            setStocks(
              data
            );
          }

        } catch (error) {

          console.log(
            "Fetch Error:",
            error
          );
        }
      };

    fetchStocks();

    const interval =
      setInterval(
        fetchStocks,
        10000
      );

    return () =>
      clearInterval(
        interval
      );

  }, [mounted]);

  if (!mounted) {

    return null;
  }

  return (

    <div className="bg-white rounded-2xl shadow-lg border border-pink-100 overflow-hidden mb-6 py-4">

      {/* TICKER CONTAINER */}

      <div className="ticker-wrapper">

        <div className="ticker-move">

          {/* FIRST LOOP */}

          {stocks.map(
            (stock) => (

              <div
                key={stock.symbol}
                className="ticker-item"
              >

                <span className="symbol">

                  {stock.symbol}

                </span>

                <span className="price">

                  ₹{stock.price}

                </span>

                <span
                  className={

                    stock.change >= 0

                      ? "change-positive"

                      : "change-negative"
                  }
                >

                  {stock.change}%

                </span>

              </div>
            )
          )}

          {/* DUPLICATE LOOP */}

          {stocks.map(
            (stock) => (

              <div
                key={`${stock.symbol}-duplicate`}
                className="ticker-item"
              >

                <span className="symbol">

                  {stock.symbol}

                </span>

                <span className="price">

                  ₹{stock.price}

                </span>

                <span
                  className={

                    stock.change >= 0

                      ? "change-positive"

                      : "change-negative"
                  }
                >

                  {stock.change}%

                </span>

              </div>
            )
          )}

        </div>

      </div>

      {/* STYLES */}

      <style jsx>{`

        .ticker-wrapper {

          width: 100%;

          overflow: hidden;

          position: relative;
        }

        .ticker-move {

          display: flex;

          width: max-content;

          animation: tickerScroll 60s linear infinite;
        }

        .ticker-item {

          display: flex;

          align-items: center;

          gap: 12px;

          padding: 0 32px;

          white-space: nowrap;
        }

        .symbol {

          font-size: 18px;

          font-weight: 700;

          color: #27272a;
        }

        .price {

          font-size: 18px;

          font-weight: 600;

          color: black;
        }

        .change-positive {

          color: #16a34a;

          font-weight: 700;
        }

        .change-negative {

          color: #dc2626;

          font-weight: 700;
        }

        @keyframes tickerScroll {

          0% {

            transform: translateX(0%);
          }

          100% {

            transform: translateX(-50%);
          }
        }

      `}</style>

    </div>
  );
}