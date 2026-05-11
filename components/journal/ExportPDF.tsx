"use client";

import jsPDF from "jspdf";

import autoTable from "jspdf-autotable";

import { Trade } from "./types";

interface ExportPDFProps {

  trades: Trade[];

  totalTrades: number;

  winningTrades: number;

  losingTrades: number;

  totalNetPnL: number;

  winRate: string;
}

export default function ExportPDF({

  trades,

  totalTrades,

  winningTrades,

  losingTrades,

  totalNetPnL,

  winRate,

}: ExportPDFProps) {

  // EXPORT FUNCTION

  const exportPDF = () => {

    // EMPTY CHECK

    if (
      trades.length === 0
    ) {

      alert(
        "No trades available to export."
      );

      return;
    }

    // PDF

    const doc =
      new jsPDF();

    // TITLE

    doc.setFontSize(22);

    doc.text(
      "Trading Journal Report",
      14,
      20
    );

    // SUBTITLE

    doc.setFontSize(11);

    doc.text(
      `Generated on: ${new Date().toLocaleDateString()}`,
      14,
      30
    );

    // ANALYTICS

    doc.setFontSize(14);

    doc.text(
      "Performance Summary",
      14,
      45
    );

    doc.setFontSize(11);

    doc.text(
      `Total Trades: ${totalTrades}`,
      14,
      55
    );

    doc.text(
      `Winning Trades: ${winningTrades}`,
      14,
      63
    );

    doc.text(
      `Losing Trades: ${losingTrades}`,
      14,
      71
    );

    doc.text(
      `Win Rate: ${winRate}%`,
      14,
      79
    );

    doc.text(
      `Total Net P&L: ₹${totalNetPnL.toFixed(2)}`,
      14,
      87
    );

    // TABLE

    autoTable(doc, {

      startY: 100,

      head: [[

        "Date",

        "Symbol",

        "Type",

        "Entry",

        "Exit",

        "Qty",

        "Brokerage",

        "Net P&L",
      ]],

      body:
        trades.map(
          (trade) => [

            trade.date,

            trade.symbol,

            trade.tradeType,

            trade.entryPrice,

            trade.exitPrice,

            trade.quantity,

            trade.brokerage,

            trade.netPnL.toFixed(
              2
            ),
          ]
        ),

      styles: {

        fontSize: 10,
      },

      headStyles: {

        fillColor: [
          236,
          72,
          153,
        ],
      },
    });

    // SAVE

    doc.save(
      "trading-report.pdf"
    );
  };

  return (

    <button
      onClick={exportPDF}
      className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-2xl font-bold transition shadow-lg"
    >

      Export PDF

    </button>
  );
}