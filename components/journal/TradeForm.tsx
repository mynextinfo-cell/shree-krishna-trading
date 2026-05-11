interface TradeFormProps {

  date: string;

  setDate: (
    value: string
  ) => void;

  symbol: string;

  setSymbol: (
    value: string
  ) => void;

  tradeType: string;

  setTradeType: (
    value: string
  ) => void;

  entryPrice: string;

  setEntryPrice: (
    value: string
  ) => void;

  exitPrice: string;

  setExitPrice: (
    value: string
  ) => void;

  quantity: string;

  setQuantity: (
    value: string
  ) => void;

  brokerage: string;

  setBrokerage: (
    value: string
  ) => void;

  notes: string;

  setNotes: (
    value: string
  ) => void;

  grossPnL: number;

  netPnL: number;

  editIndex:
    number | null;

  onSave: () => void;

  onCancelEdit:
    () => void;
}

export default function TradeForm({

  date,

  setDate,

  symbol,

  setSymbol,

  tradeType,

  setTradeType,

  entryPrice,

  setEntryPrice,

  exitPrice,

  setExitPrice,

  quantity,

  setQuantity,

  brokerage,

  setBrokerage,

  notes,

  setNotes,

  grossPnL,

  netPnL,

  editIndex,

  onSave,

  onCancelEdit,

}: TradeFormProps) {

  return (

    <div className="bg-white rounded-3xl shadow-xl p-6 mb-6 border border-pink-100">

      {/* HEADER */}

      <div className="flex items-center justify-between mb-6">

        <div>

          <h2 className="text-3xl font-bold text-zinc-800">

            {editIndex !== null
              ? "Edit Trade"
              : "Add New Trade"}

          </h2>

          <p className="text-zinc-500 mt-1">

            Record your trading activity

          </p>

        </div>

        {/* CANCEL EDIT */}

        {editIndex !== null && (

          <button
            onClick={
              onCancelEdit
            }
            className="bg-zinc-200 hover:bg-zinc-300 text-zinc-800 px-5 py-3 rounded-2xl font-semibold transition"
          >

            Cancel Edit

          </button>

        )}

      </div>

      {/* FORM GRID */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

        {/* DATE */}

        <div>

          <label className="block text-sm font-semibold text-zinc-700 mb-2">

            Entry Date

          </label>

          <input
            type="date"
            value={date || ""}
            onChange={(e) =>
              setDate(
                e.target.value
              )
            }
            className="w-full bg-pink-50 border border-pink-100 rounded-2xl px-5 py-4 outline-none focus:border-pink-400"
          />

        </div>

        {/* SYMBOL */}

        <div>

          <label className="block text-sm font-semibold text-zinc-700 mb-2">

            Symbol

          </label>

          <input
            type="text"
            placeholder="NIFTY / RELIANCE"
            value={symbol || ""}
            onChange={(e) =>
              setSymbol(
                e.target.value
              )
            }
            className="w-full bg-pink-50 border border-pink-100 rounded-2xl px-5 py-4 outline-none focus:border-pink-400"
          />

        </div>

        {/* TRADE TYPE */}

        <div>

          <label className="block text-sm font-semibold text-zinc-700 mb-2">

            Trade Type

          </label>

          <select
            value={
              tradeType || "BUY"
            }
            onChange={(e) =>
              setTradeType(
                e.target.value
              )
            }
            className="w-full bg-pink-50 border border-pink-100 rounded-2xl px-5 py-4 outline-none focus:border-pink-400"
          >

            <option value="BUY">

              BUY

            </option>

            <option value="SELL">

              SELL

            </option>

          </select>

        </div>

        {/* ENTRY PRICE */}

        <div>

          <label className="block text-sm font-semibold text-zinc-700 mb-2">

            Entry Price

          </label>

          <input
            type="number"
            placeholder="0"
            value={entryPrice || ""}
            onChange={(e) =>
              setEntryPrice(
                e.target.value
              )
            }
            className="w-full bg-pink-50 border border-pink-100 rounded-2xl px-5 py-4 outline-none focus:border-pink-400"
          />

        </div>

        {/* EXIT PRICE */}

        <div>

          <label className="block text-sm font-semibold text-zinc-700 mb-2">

            Exit Price

          </label>

          <input
            type="number"
            placeholder="0"
            value={exitPrice || ""}
            onChange={(e) =>
              setExitPrice(
                e.target.value
              )
            }
            className="w-full bg-pink-50 border border-pink-100 rounded-2xl px-5 py-4 outline-none focus:border-pink-400"
          />

        </div>

        {/* QUANTITY */}

        <div>

          <label className="block text-sm font-semibold text-zinc-700 mb-2">

            Quantity

          </label>

          <input
            type="number"
            placeholder="0"
            value={quantity || ""}
            onChange={(e) =>
              setQuantity(
                e.target.value
              )
            }
            className="w-full bg-pink-50 border border-pink-100 rounded-2xl px-5 py-4 outline-none focus:border-pink-400"
          />

        </div>

        {/* BROKERAGE */}

        <div className="md:col-span-2 lg:col-span-1">

          <label className="block text-sm font-semibold text-zinc-700 mb-2">

            Brokerage / Charges

          </label>

          <input
            type="number"
            placeholder="0"
            value={brokerage || ""}
            onChange={(e) =>
              setBrokerage(
                e.target.value
              )
            }
            className="w-full bg-pink-50 border border-pink-100 rounded-2xl px-5 py-4 outline-none focus:border-pink-400"
          />

        </div>

      </div>

      {/* NOTES */}

      <div className="mt-5">

        <label className="block text-sm font-semibold text-zinc-700 mb-2">

          Trade Notes

        </label>

        <textarea
          placeholder="Write your setup, psychology, mistakes..."
          rows={5}
          value={notes || ""}
          onChange={(e) =>
            setNotes(
              e.target.value
            )
          }
          className="w-full bg-pink-50 border border-pink-100 rounded-2xl px-5 py-4 outline-none focus:border-pink-400 resize-none"
        />

      </div>

      {/* PNL SECTION */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">

        {/* GROSS PNL */}

        <div className="bg-pink-50 border border-pink-100 rounded-2xl p-5">

          <p className="text-zinc-500 text-sm">

            Gross P&L

          </p>

          <h2
            className={`text-4xl font-extrabold mt-2 ${
              grossPnL >= 0
                ? "text-green-500"
                : "text-red-500"
            }`}
          >

            ₹
            {grossPnL.toFixed(
              2
            )}

          </h2>

        </div>

        {/* NET PNL */}

        <div className="bg-pink-50 border border-pink-100 rounded-2xl p-5">

          <p className="text-zinc-500 text-sm">

            Net P&L

          </p>

          <h2
            className={`text-4xl font-extrabold mt-2 ${
              netPnL >= 0
                ? "text-green-500"
                : "text-red-500"
            }`}
          >

            ₹
            {netPnL.toFixed(
              2
            )}

          </h2>

        </div>

      </div>

      {/* SAVE BUTTON */}

      <button
        onClick={onSave}
        className="mt-6 bg-pink-500 hover:bg-pink-600 text-white px-8 py-4 rounded-2xl font-bold text-lg transition shadow-lg"
      >

        {editIndex !== null
          ? "Update Trade"
          : "Save Trade"}

      </button>

    </div>
  );
}