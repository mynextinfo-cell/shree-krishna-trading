"use client";

interface Props {

  trade: any;

  onClose: () => void;
}

export default function ViewTradeModal({

  trade,

  onClose,

}: Props) {

  if (!trade)
    return null;

  // FORMAT DATE

  const formatDate = (
    value: string
  ) => {

    if (!value)
      return "-";

    return new Date(
      value
    ).toLocaleString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }
    );
  };

  // TOTAL INVESTMENT

  const investment =

    Number(
      trade.entry_price || 0
    ) *

    Number(
      trade.quantity || 0
    );

  // GROSS PNL

  const grossPnl =

    trade.exit_price

      ? (

          (
            Number(
              trade.exit_price
            ) -

            Number(
              trade.entry_price
            )
          ) *

          Number(
            trade.quantity
          )

        ).toFixed(2)

      : "0";

  // AI REVIEW ENGINE

  const getAIReview =
    () => {

      const note =
        (
          trade.note || ""
        ).toLowerCase();

      const pnl =
        Number(
          trade.net_pnl || 0
        );

      const reviews:
        string[] = [];

      // LOSS

      if (pnl < 0) {

        reviews.push(
          "⚠ Loss detected. Review your stoploss and risk management."
        );
      }

      // PROFIT

      if (pnl > 0) {

        reviews.push(
          "✅ Good trade execution. Maintain discipline and consistency."
        );
      }

      // FOMO

      if (

        note.includes(
          "fomo"
        ) ||

        note.includes(
          "fear"
        ) ||

        note.includes(
          "early entry"
        )

      ) {

        reviews.push(
          "⚠ Emotional/FOMO entry detected. Wait for stronger confirmation before entering."
        );
      }

      // REVENGE

      if (
        note.includes(
          "revenge"
        )
      ) {

        reviews.push(
          "⚠ Revenge trading behavior detected. Take a break after consecutive losses."
        );
      }

      // OVERTRADING

      if (
        note.includes(
          "overtrade"
        ) ||

        note.includes(
          "too many trades"
        )
      ) {

        reviews.push(
          "⚠ Overtrading detected. Focus on high probability setups only."
        );
      }

      // DISCIPLINE

      if (
        note.includes(
          "discipline"
        ) ||

        note.includes(
          "followed plan"
        )
      ) {

        reviews.push(
          "✅ Good discipline noted. Continue following your trading plan."
        );
      }

      // DEFAULT

      if (
        reviews.length === 0
      ) {

        reviews.push(
          "📊 AI could not detect major emotional patterns in this trade."
        );
      }

      return reviews;
    };

  // AI SCORE

  const getAIScore =
    () => {

      const pnl =
        Number(
          trade.net_pnl || 0
        );

      const note =
        (
          trade.note || ""
        ).toLowerCase();

      let score = 70;

      if (pnl > 0)
        score += 15;

      if (pnl < 0)
        score -= 10;

      if (
        note.includes(
          "discipline"
        )
      ) {

        score += 10;
      }

      if (

        note.includes(
          "fomo"
        ) ||

        note.includes(
          "revenge"
        )

      ) {

        score -= 20;
      }

      // LIMIT

      if (score > 100)
        score = 100;

      if (score < 0)
        score = 0;

      return score;
    };

  const aiScore =
    getAIScore();

  return (

    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">

      {/* MODAL */}

      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-6xl max-h-[95vh] overflow-y-auto">

        {/* HEADER */}

        <div className="sticky top-0 bg-white border-b border-pink-100 px-8 py-5 flex items-center justify-between rounded-t-3xl z-10">

          <div>

            <h2 className="text-3xl font-bold text-zinc-800">

              Trade Details

            </h2>

            <p className="text-zinc-500 mt-1">

              Professional AI powered trading journal

            </p>

          </div>

          {/* CLOSE */}

          <button

            onClick={onClose}

            className="bg-red-500 hover:bg-red-600 transition text-white px-5 py-2 rounded-2xl font-semibold shadow-lg"
          >

            Close

          </button>

        </div>

        {/* CONTENT */}

        <div className="p-8 space-y-8">

          {/* AI SCORE */}

          <div className="bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-3xl p-6 text-white shadow-xl">

            <div className="flex items-center justify-between">

              <div>

                <h3 className="text-3xl font-bold">

                  AI Trade Score

                </h3>

                <p className="text-white/90 mt-2">

                  AI evaluated your discipline and emotional behavior.

                </p>

              </div>

              <div className="text-6xl font-bold">

                {aiScore}

              </div>

            </div>

            {/* PROGRESS */}

            <div className="mt-5">

              <div className="w-full bg-white/20 rounded-full h-4 overflow-hidden">

                <div

                  className={`h-4 rounded-full

                    ${
                      aiScore >= 80

                        ? "bg-green-400"

                        : aiScore >= 50

                        ? "bg-yellow-400"

                        : "bg-red-400"
                    }
                  `}

                  style={{
                    width: `${aiScore}%`,
                  }}
                />

              </div>

            </div>

          </div>

          {/* TOP GRID */}

          <div className="grid grid-cols-1 md:grid-cols-4 gap-5">

            {/* STOCK */}

            <div className="bg-pink-50 rounded-3xl p-5 border border-pink-100">

              <p className="text-sm text-zinc-500">

                Stock

              </p>

              <h3 className="text-2xl font-bold text-zinc-800 mt-2">

                {trade.stock_name}

              </h3>

            </div>

            {/* SIDE */}

            <div className="bg-pink-50 rounded-3xl p-5 border border-pink-100">

              <p className="text-sm text-zinc-500">

                Side

              </p>

              <h3 className={`text-2xl font-bold mt-2

                ${
                  trade.side === "BUY"

                    ? "text-green-600"

                    : "text-red-500"
                }
              `}>

                {trade.side}

              </h3>

            </div>

            {/* STATUS */}

            <div className="bg-pink-50 rounded-3xl p-5 border border-pink-100">

              <p className="text-sm text-zinc-500">

                Status

              </p>

              <h3 className={`text-2xl font-bold mt-2

                ${
                  trade.status === "open"

                    ? "text-yellow-600"

                    : "text-green-600"
                }
              `}>

                {trade.status?.toUpperCase()}

              </h3>

            </div>

            {/* SEGMENT */}

            <div className="bg-pink-50 rounded-3xl p-5 border border-pink-100">

              <p className="text-sm text-zinc-500">

                Segment

              </p>

              <h3 className="text-2xl font-bold text-blue-600 mt-2">

                {trade.segment || "-"}

              </h3>

            </div>

          </div>

          {/* TRADE INFO */}

          <div className="grid grid-cols-1 md:grid-cols-4 gap-5">

            {/* QUANTITY */}

            <div className="bg-white rounded-3xl p-5 border border-pink-100 shadow-sm">

              <p className="text-sm text-zinc-500">

                Quantity

              </p>

              <h3 className="text-xl font-bold text-zinc-800 mt-2">

                {trade.quantity}

              </h3>

            </div>

            {/* ENTRY */}

            <div className="bg-white rounded-3xl p-5 border border-pink-100 shadow-sm">

              <p className="text-sm text-zinc-500">

                Entry Price

              </p>

              <h3 className="text-xl font-bold text-zinc-800 mt-2">

                ₹
                {trade.entry_price}

              </h3>

            </div>

            {/* EXIT */}

            <div className="bg-white rounded-3xl p-5 border border-pink-100 shadow-sm">

              <p className="text-sm text-zinc-500">

                Exit Price

              </p>

              <h3 className="text-xl font-bold text-zinc-800 mt-2">

                ₹
                {trade.exit_price || 0}

              </h3>

            </div>

            {/* INVESTMENT */}

            <div className="bg-white rounded-3xl p-5 border border-pink-100 shadow-sm">

              <p className="text-sm text-zinc-500">

                Investment

              </p>

              <h3 className="text-xl font-bold text-blue-600 mt-2">

                ₹
                {investment.toFixed(2)}

              </h3>

            </div>

          </div>

          {/* PNL */}

          <div className="grid grid-cols-1 md:grid-cols-4 gap-5">

            {/* GROSS */}

            <div className="bg-blue-50 rounded-3xl p-5 border border-blue-100">

              <p className="text-sm text-zinc-500">

                Gross P&L

              </p>

              <h3 className={`text-xl font-bold mt-2

                ${
                  Number(
                    grossPnl
                  ) >= 0

                    ? "text-green-600"

                    : "text-red-500"
                }
              `}>

                ₹
                {grossPnl}

              </h3>

            </div>

            {/* NET */}

            <div className="bg-blue-50 rounded-3xl p-5 border border-blue-100">

              <p className="text-sm text-zinc-500">

                Net P&L

              </p>

              <h3 className={`text-xl font-bold mt-2

                ${
                  Number(
                    trade.net_pnl || 0
                  ) >= 0

                    ? "text-green-600"

                    : "text-red-500"
                }
              `}>

                ₹
                {trade.net_pnl || 0}

              </h3>

            </div>

            {/* BROKERAGE */}

            <div className="bg-blue-50 rounded-3xl p-5 border border-blue-100">

              <p className="text-sm text-zinc-500">

                Brokerage

              </p>

              <h3 className="text-xl font-bold text-blue-600 mt-2">

                ₹
                {trade.brokerage || 0}

              </h3>

            </div>

            {/* TAX */}

            <div className="bg-blue-50 rounded-3xl p-5 border border-blue-100">

              <p className="text-sm text-zinc-500">

                Taxes

              </p>

              <h3 className="text-xl font-bold text-blue-600 mt-2">

                ₹
                {trade.taxes || 0}

              </h3>

            </div>

          </div>

          {/* NOTES */}

          <div className="bg-white rounded-3xl border border-pink-100 shadow-sm p-6">

            <div className="flex items-center justify-between mb-5">

              <h3 className="text-2xl font-bold text-zinc-800">

                Trade Notes

              </h3>

              <div className="bg-pink-100 text-pink-600 px-4 py-2 rounded-2xl text-sm font-semibold">

                Psychology Analysis

              </div>

            </div>

            <div className="bg-pink-50 rounded-2xl p-5 text-zinc-700 leading-relaxed whitespace-pre-wrap min-h-[140px]">

              {trade.note ||

                "No notes added."}

            </div>

          </div>

          {/* AI REVIEW */}

          <div className="bg-white rounded-3xl border border-violet-100 shadow-sm p-6">

            <div className="flex items-center justify-between mb-5">

              <h3 className="text-2xl font-bold text-zinc-800">

                AI Trade Review

              </h3>

              <div className="bg-violet-100 text-violet-600 px-4 py-2 rounded-2xl text-sm font-semibold">

                AI Engine Active

              </div>

            </div>

            <div className="space-y-4">

              {getAIReview().map(
                (
                  review,
                  index
                ) => (

                  <div

                    key={index}

                    className="bg-violet-50 border border-violet-100 rounded-2xl p-4 text-zinc-700"
                  >

                    {review}

                  </div>
                )
              )}

            </div>

          </div>

          {/* SCREENSHOT */}

          {trade.screenshot_url && (

            <div className="bg-white rounded-3xl border border-pink-100 shadow-sm p-6">

              <div className="flex items-center justify-between mb-5">

                <h3 className="text-2xl font-bold text-zinc-800">

                  Trade Screenshot

                </h3>

                <div className="bg-blue-100 text-blue-600 px-4 py-2 rounded-2xl text-sm font-semibold">

                  Visual Analysis

                </div>

              </div>

              <img

                src={
                  trade.screenshot_url
                }

                alt="Trade Screenshot"

                className="w-full rounded-3xl border border-pink-100 shadow-xl"
              />

            </div>
          )}

          {/* DATES */}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            {/* CREATED */}

            <div className="bg-zinc-50 rounded-3xl p-5 border border-zinc-100">

              <p className="text-sm text-zinc-500">

                Created At

              </p>

              <h3 className="text-lg font-bold text-zinc-800 mt-2">

                {formatDate(
                  trade.created_at
                )}

              </h3>

            </div>

            {/* EXIT */}

            <div className="bg-zinc-50 rounded-3xl p-5 border border-zinc-100">

              <p className="text-sm text-zinc-500">

                Exit Date

              </p>

              <h3 className="text-lg font-bold text-zinc-800 mt-2">

                {trade.exit_date

                  ? formatDate(
                      trade.exit_date
                    )

                  : "-"}

              </h3>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}