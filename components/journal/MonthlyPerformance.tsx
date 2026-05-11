interface MonthlyPerformanceProps {

  monthlyPerformance: [
    string,
    number
  ][];
}

export default function MonthlyPerformance({

  monthlyPerformance,

}: MonthlyPerformanceProps) {

  return (

    <div className="bg-white border border-pink-100 rounded-3xl p-6 shadow-lg mb-6">

      {/* HEADER */}

      <div className="mb-6">

        <h2 className="text-3xl font-bold text-zinc-800">

          Monthly Performance

        </h2>

        <p className="text-zinc-500 mt-1">

          Month-wise trading performance analytics

        </p>

      </div>

      {/* EMPTY */}

      {monthlyPerformance.length === 0 ? (

        <div className="text-zinc-400 py-10 text-center">

          No monthly data available

        </div>

      ) : (

        /* GRID */

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

          {monthlyPerformance.map(
            (
              [month, pnl],
              index
            ) => (

              <div
                key={index}
                className="bg-pink-50 border border-pink-100 rounded-2xl p-5"
              >

                {/* MONTH */}

                <p className="text-zinc-500 text-sm">

                  {month}

                </p>

                {/* PNL */}

                <h2
                  className={`text-3xl font-bold mt-3 ${
                    pnl >= 0
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >

                  ₹
                  {pnl.toFixed(2)}

                </h2>

              </div>
            )
          )}

        </div>

      )}

    </div>
  );
}