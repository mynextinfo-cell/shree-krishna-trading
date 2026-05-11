"use client";

import { useEffect, useState } from "react";

import Sidebar from "@/components/Sidebar";

import { Trade } from "@/components/journal/types";

import AnalyticsCard from "@/components/journal/AnalyticsCard";

import MonthlyPerformance from "@/components/journal/MonthlyPerformance";

import EquityCurve from "@/components/journal/EquityCurve";

import TradeHistory from "@/components/journal/TradeHistory";

import TradeForm from "@/components/journal/TradeForm";

import ExportCSV from "@/components/journal/ExportCSV";

import ExportPDF from "@/components/journal/ExportPDF";

import { supabase } from "@/lib/supabase";

export default function JournalPage() {

  // TODAY DATE

  const today =
    new Date()
      .toISOString()
      .split("T")[0];

  // FORM STATES

  const [date, setDate] =
    useState(today);

  const [symbol, setSymbol] =
    useState("");

  const [tradeType, setTradeType] =
    useState("BUY");

  const [entryPrice, setEntryPrice] =
    useState("");

  const [exitPrice, setExitPrice] =
    useState("");

  const [quantity, setQuantity] =
    useState("");

  const [brokerage, setBrokerage] =
    useState("");

  const [notes, setNotes] =
    useState("");

  // TRADE STATES

  const [trades, setTrades] =
    useState<Trade[]>([]);

  const [editIndex, setEditIndex] =
    useState<number | null>(null);

  // FETCH TRADES

  useEffect(() => {

    fetchTrades();

  }, []);

  const fetchTrades =
    async () => {

      const {
        data,
        error,
      } = await supabase
        .from("trades")
        .select("*")
        .order(
          "created_at",
          {
            ascending: false,
          }
        );

      if (error) {

        alert(
          error.message
        );

        return;
      }

      const formattedTrades =
        data.map(
          (trade) => ({

            id: trade.id,

            created_at:
              trade.created_at,

            date:
              trade.date,

            symbol:
              trade.symbol,

            tradeType:
              trade.trade_type,

            entryPrice:
              Number(
                trade.entry_price
              ),

            exitPrice:
              Number(
                trade.exit_price
              ),

            quantity:
              Number(
                trade.quantity
              ),

            brokerage:
              Number(
                trade.brokerage
              ),

            notes:
              trade.notes,

            grossPnL:
              Number(
                trade.gross_pnl
              ),

            netPnL:
              Number(
                trade.net_pnl
              ),
          }))
;

      setTrades(
        formattedTrades
      );
    };

  // CALCULATE GROSS PNL

  const calculateGrossPnL = () => {

    const entry =
      Number(entryPrice);

    const exit =
      Number(exitPrice);

    const qty =
      Number(quantity);

    if (tradeType === "BUY") {

      return (
        (exit - entry) * qty
      );
    }

    return (
      (entry - exit) * qty
    );
  };

  const grossPnL =
    calculateGrossPnL();

  // NET PNL

  const netPnL =
    grossPnL -
    Number(
      brokerage || 0
    );

  // RESET FORM

  const resetForm = () => {

    setDate(today);

    setSymbol("");

    setTradeType("BUY");

    setEntryPrice("");

    setExitPrice("");

    setQuantity("");

    setBrokerage("");

    setNotes("");

    setEditIndex(null);
  };

  // SAVE / UPDATE TRADE

  const saveTrade =
    async () => {

      if (
        !symbol ||
        !entryPrice ||
        !exitPrice ||
        !quantity
      ) {

        alert(
          "Please fill all required fields."
        );

        return;
      }

      // UPDATE TRADE

      if (
        editIndex !== null
      ) {

        const trade =
          trades[
            editIndex
          ];

        const {
          error,
        } = await supabase
          .from("trades")
          .update({

            date: date,

            symbol:
              symbol,

            trade_type:
              tradeType,

            entry_price:
              Number(
                entryPrice
              ),

            exit_price:
              Number(
                exitPrice
              ),

            quantity:
              Number(
                quantity
              ),

            brokerage:
              Number(
                brokerage || 0
              ),

            notes: notes,

            gross_pnl:
              grossPnL,

            net_pnl:
              netPnL,
          })
          .eq(
            "id",
            trade.id
          );

        if (error) {

          alert(
            error.message
          );

          return;
        }

        await fetchTrades();

        resetForm();

        return;
      }

      // INSERT TRADE

      const {
        error,
      } = await supabase
        .from("trades")
        .insert([{

          date: date,

          symbol:
            symbol,

          trade_type:
            tradeType,

          entry_price:
            Number(
              entryPrice
            ),

          exit_price:
            Number(
              exitPrice
            ),

          quantity:
            Number(
              quantity
            ),

          brokerage:
            Number(
              brokerage || 0
            ),

          notes: notes,

          gross_pnl:
            grossPnL,

          net_pnl:
            netPnL,
        }]);

      if (error) {

        alert(
          error.message
        );

        return;
      }

      await fetchTrades();

      resetForm();
    };

  // DELETE TRADE

  const deleteTrade =
    async (
      indexToDelete: number
    ) => {

      const trade =
        trades[
          indexToDelete
        ];

      const {
        error,
      } = await supabase
        .from("trades")
        .delete()
        .eq(
          "id",
          trade.id
        );

      if (error) {

        alert(
          error.message
        );

        return;
      }

      await fetchTrades();
    };

  // EDIT TRADE

  const editTrade = (
    trade: Trade,
    index: number
  ) => {

    setDate(trade.date);

    setSymbol(
      trade.symbol
    );

    setTradeType(
      trade.tradeType
    );

    setEntryPrice(
      trade.entryPrice.toString()
    );

    setExitPrice(
      trade.exitPrice.toString()
    );

    setQuantity(
      trade.quantity.toString()
    );

    setBrokerage(
      trade.brokerage.toString()
    );

    setNotes(
      trade.notes
    );

    setEditIndex(index);

    window.scrollTo({

      top: 0,

      behavior:
        "smooth",
    });
  };

  // ANALYTICS

  const totalTrades =
    trades.length;

  const winningTrades =
    trades.filter(
      (trade) =>
        trade.netPnL > 0
    ).length;

  const losingTrades =
    trades.filter(
      (trade) =>
        trade.netPnL < 0
    ).length;

  const totalNetPnL =
    trades.reduce(
      (acc, trade) =>
        acc +
        trade.netPnL,
      0
    );

  const winRate =
    totalTrades > 0
      ? (
          (winningTrades /
            totalTrades) *
          100
        ).toFixed(1)
      : "0";

  const bestTrade =
    trades.length > 0
      ? Math.max(
          ...trades.map(
            (trade) =>
              trade.netPnL
          )
        )
      : 0;

  const worstTrade =
    trades.length > 0
      ? Math.min(
          ...trades.map(
            (trade) =>
              trade.netPnL
          )
        )
      : 0;

  // EQUITY CURVE

  let cumulativePnL = 0;

  const equityCurveData =
    trades
      .slice()
      .reverse()
      .map(
        (
          trade,
          index
        ) => {

          cumulativePnL +=
            trade.netPnL;

          return {

            trade:
              index + 1,

            equity:
              cumulativePnL,
          };
        }
      );

  // MONTHLY PERFORMANCE

  const monthlyMap:
    Record<
      string,
      number
    > = {};

  trades.forEach(
    (trade) => {

      const month =
        new Date(
          trade.date
        ).toLocaleString(
          "default",
          {

            month:
              "long",

            year:
              "numeric",
          }
        );

      monthlyMap[
        month
      ] =
        (
          monthlyMap[
            month
          ] || 0
        ) +
        trade.netPnL;
    }
  );

  const monthlyPerformance =
    Object.entries(
      monthlyMap
    );

  return (

    <div className="flex min-h-screen bg-[#fff1f7]">

      {/* SIDEBAR */}

      <Sidebar />

      {/* MAIN */}

      <main className="flex-1 p-4 md:p-6 overflow-y-auto">

        {/* HEADER */}

        <div className="bg-pink-500 rounded-3xl px-8 py-6 shadow-xl mb-6">

          <h1 className="text-5xl font-extrabold text-white">

            Trading Journal

          </h1>

          <p className="text-white/90 mt-2 text-xl">

            Professional Trade Tracking System

          </p>

        </div>

        {/* ANALYTICS */}

        <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 mb-6">

          <AnalyticsCard
            title="Total Trades"
            value={
              totalTrades
            }
            color="text-zinc-800"
          />

          <AnalyticsCard
            title="Winning"
            value={
              winningTrades
            }
            color="text-green-500"
          />

          <AnalyticsCard
            title="Losing"
            value={
              losingTrades
            }
            color="text-red-500"
          />

          <AnalyticsCard
            title="Win Rate"
            value={`${winRate}%`}
            color="text-blue-500"
          />

          <AnalyticsCard
            title="Best Trade"
            value={`₹${bestTrade.toFixed(0)}`}
            color="text-green-500"
          />

          <AnalyticsCard
            title="Worst Trade"
            value={`₹${worstTrade.toFixed(0)}`}
            color="text-red-500"
          />

        </div>

        {/* MONTHLY PERFORMANCE */}

        <MonthlyPerformance
          monthlyPerformance={
            monthlyPerformance
          }
        />

        {/* EQUITY CURVE */}

        <EquityCurve
          equityCurveData={
            equityCurveData
          }
        />

        {/* TRADE FORM */}

        <TradeForm
          date={date}
          setDate={setDate}
          symbol={symbol}
          setSymbol={setSymbol}
          tradeType={tradeType}
          setTradeType={setTradeType}
          entryPrice={entryPrice}
          setEntryPrice={setEntryPrice}
          exitPrice={exitPrice}
          setExitPrice={setExitPrice}
          quantity={quantity}
          setQuantity={setQuantity}
          brokerage={brokerage}
          setBrokerage={setBrokerage}
          notes={notes}
          setNotes={setNotes}
          grossPnL={grossPnL}
          netPnL={netPnL}
          editIndex={
            editIndex
          }
          onSave={
            saveTrade
          }
          onCancelEdit={
            resetForm
          }
        />

        {/* EXPORT BUTTONS */}

        <div className="flex flex-wrap justify-end gap-4 mb-6">

          <ExportCSV
            trades={trades}
          />

          <ExportPDF
            trades={trades}
            totalTrades={
              totalTrades
            }
            winningTrades={
              winningTrades
            }
            losingTrades={
              losingTrades
            }
            totalNetPnL={
              totalNetPnL
            }
            winRate={
              winRate
            }
          />

        </div>

        {/* TRADE HISTORY */}

        <TradeHistory
          trades={trades}
          totalNetPnL={
            totalNetPnL
          }
          onEdit={
            editTrade
          }
          onDelete={
            deleteTrade
          }
        />

      </main>

    </div>
  );
}