import { Trade } from "./types";

interface TradeHistoryProps {

  trades: Trade[];

  totalNetPnL: number;

  onEdit: (
    trade: Trade,
    index: number
  ) => void;

  onDelete: (
    index: number
  ) => void;
}

export default function TradeHistory({

  trades,

  totalNetPnL,

  onEdit,

  onDelete,

}: TradeHistoryProps) {

  return (

    <div className="bg-white border border-pink-100 rounded-3xl p-6 shadow-lg">

      {/* TOP */}

      <div className="flex items-center justify-between mb-6">

        <h2 className="text-3xl font-bold text-zinc-800">

          Trade History

        </h2>

        {/* TOTAL */}

        <div className="bg-pink-100 px-5 py-3 rounded-2xl">

          <p className="text-zinc-500 text-sm">

            Total Net P&L

          </p>

          <h3
            className={`text-2xl font-bold ${
              totalNetPnL >= 0
                ? "text-green-500"
                : "text-red-500"
            }`}
          >

            ₹
            {totalNetPnL.toFixed(
              2
            )}

          </h3>

        </div>

      </div>

      {/* TABLE */}

      <div className="overflow-x-auto">

        <table className="w-full min-w-[1000px]">

          {/* HEAD */}

          <thead>

            <tr className="border-b border-pink-100 text-left">

              <th className="py-4">

                S.No.

              </th>

              <th className="py-4">

                Date

              </th>

              <th className="py-4">

                Symbol

              </th>

              <th className="py-4">

                Type

              </th>

              <th className="py-4">

                Gross

              </th>

              <th className="py-4">

                Brokerage

              </th>

              <th className="py-4">

                Net

              </th>

              <th className="py-4">

                Notes

              </th>

              <th className="py-4">

                Actions

              </th>

            </tr>

          </thead>

          {/* BODY */}

          <tbody>

            {trades.length === 0 ? (

              <tr>

                <td
                  colSpan={9}
                  className="py-10 text-center text-zinc-400"
                >

                  No trades added yet

                </td>

              </tr>

            ) : (

              trades.map(
                (
                  trade,
                  index
                ) => (

                  <tr
                    key={index}
                    className="border-b border-pink-100 hover:bg-pink-50 transition"
                  >

                    {/* SERIAL */}

                    <td className="py-4 font-bold">

                      {index + 1}

                    </td>

                    {/* DATE */}

                    <td className="py-4">

                      {trade.date}

                    </td>

                    {/* SYMBOL */}

                    <td className="py-4 font-semibold">

                      {trade.symbol}

                    </td>

                    {/* TYPE */}

                    <td
                      className={`py-4 font-bold ${
                        trade.tradeType ===
                        "BUY"
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >

                      {
                        trade.tradeType
                      }

                    </td>

                    {/* GROSS */}

                    <td className="py-4">

                      ₹
                      {trade.grossPnL.toFixed(
                        2
                      )}

                    </td>

                    {/* BROKERAGE */}

                    <td className="py-4">

                      ₹
                      {trade.brokerage.toFixed(
                        2
                      )}

                    </td>

                    {/* NET */}

                    <td
                      className={`py-4 font-bold ${
                        trade.netPnL >=
                        0
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >

                      ₹
                      {trade.netPnL.toFixed(
                        2
                      )}

                    </td>

                    {/* NOTES */}

                    <td className="py-4 max-w-[250px] truncate">

                      {trade.notes ||
                        "-"}

                    </td>

                    {/* ACTIONS */}

                    <td className="py-4 flex gap-3">

                      {/* EDIT */}

                      <button
                        onClick={() =>
                          onEdit(
                            trade,
                            index
                          )
                        }
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl font-semibold transition"
                      >

                        Edit

                      </button>

                      {/* DELETE */}

                      <button
                        onClick={() =>
                          onDelete(
                            index
                          )
                        }
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl font-semibold transition"
                      >

                        Delete

                      </button>

                    </td>

                  </tr>
                )
              )

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}