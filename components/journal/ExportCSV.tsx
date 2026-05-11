import { Trade } from "./types";

interface ExportCSVProps {

  trades: Trade[];
}

export default function ExportCSV({

  trades,

}: ExportCSVProps) {

  // EXPORT FUNCTION

  const exportToCSV = () => {

    // EMPTY CHECK

    if (
      trades.length === 0
    ) {

      alert(
        "No trades available to export."
      );

      return;
    }

    // CSV HEADERS

    const headers = [

      "Date",

      "Symbol",

      "Type",

      "Entry Price",

      "Exit Price",

      "Quantity",

      "Brokerage",

      "Gross PnL",

      "Net PnL",

      "Notes",
    ];

    // CSV ROWS

    const rows =
      trades.map(
        (trade) => [

          trade.date,

          trade.symbol,

          trade.tradeType,

          trade.entryPrice,

          trade.exitPrice,

          trade.quantity,

          trade.brokerage,

          trade.grossPnL,

          trade.netPnL,

          trade.notes,
        ]
      );

    // COMBINE

    const csvContent = [

      headers.join(","),

      ...rows.map(
        (row) =>
          row.join(",")
      ),
    ].join("\n");

    // CREATE FILE

    const blob =
      new Blob(
        [csvContent],
        {
          type: "text/csv;charset=utf-8;",
        }
      );

    // DOWNLOAD LINK

    const link =
      document.createElement(
        "a"
      );

    const url =
      URL.createObjectURL(
        blob
      );

    link.href = url;

    link.setAttribute(
      "download",
      "trading-journal.csv"
    );

    document.body.appendChild(
      link
    );

    link.click();

    document.body.removeChild(
      link
    );
  };

  return (

    <button
      onClick={exportToCSV}
      className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-2xl font-bold transition shadow-lg"
    >

      Export CSV

    </button>
  );
}