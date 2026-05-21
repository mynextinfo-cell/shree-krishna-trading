import jsPDF from "jspdf";

import autoTable from "jspdf-autotable";

import * as XLSX from "xlsx";

import { saveAs } from "file-saver";

// PDF EXPORT

export const exportTradesToPDF = (

  trades: any[],

  title: string = "Trading Report"

) => {

  const doc =
    new jsPDF();

  // TITLE

  doc.setFontSize(20);

  doc.text(
    title,
    14,
    20
  );

  // DATE

  doc.setFontSize(11);

  doc.text(

    `Generated: ${new Date().toLocaleString()}`,

    14,

    30
  );

  // TABLE DATA

  const tableData =
    trades.map(
      (trade) => [

        trade.stock_name,

        trade.side,

        trade.quantity,

        trade.entry_price,

        trade.exit_price || "-",

        trade.status,

        trade.net_pnl || 0,
      ]
    );

  // TABLE

  autoTable(doc, {

    startY: 40,

    head: [[

      "Stock",

      "Side",

      "Qty",

      "Entry",

      "Exit",

      "Status",

      "Net P&L",
    ]],

    body: tableData,
  });

  // SAVE PDF

  doc.save(

    `${title}.pdf`
  );
};

// CSV EXPORT

export const exportTradesToCSV = (

  trades: any[],

  fileName: string = "trading-report"

) => {

  // CONVERT DATA

  const worksheet =
    XLSX.utils.json_to_sheet(
      trades
    );

  const workbook =
    XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(

    workbook,

    worksheet,

    "Trades"
  );

  // GENERATE BUFFER

  const excelBuffer =
    XLSX.write(
      workbook,
      {

        bookType: "xlsx",

        type: "array",
      }
    );

  // CREATE FILE

  const data =
    new Blob(
      [excelBuffer],
      {

        type:
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
      }
    );

  // SAVE

  saveAs(

    data,

    `${fileName}.xlsx`
  );
};