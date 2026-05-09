"use client";

import { useEffect, useState } from "react";

import {
  Plus,
  TrendingUp,
  Wallet,
  Target,
  LogOut,
} from "lucide-react";

import { useRouter } from "next/navigation";

import Sidebar from "@/components/Sidebar";
import MarketOverview from "@/components/MarketOverview";
import AnalyticsChart from "@/components/AnalyticsChart";
import LiveChart from "@/components/LiveChart";
import MarketNews from "@/components/MarketNews";
import AIAssistant from "@/components/AIAssistant";

import { supabase } from "@/lib/supabase";

export default function DashboardPage() {

  const router = useRouter();

  // USER
  const [user, setUser] = useState<any>(null);

  // FORM STATES
  const [stockName, setStockName] = useState("");
  const [strategyName, setStrategyName] = useState("");
  const [tradeType, setTradeType] = useState("BUY");
  const [buyDate, setBuyDate] = useState("");
  const [sellDate, setSellDate] = useState("");
  const [quantity, setQuantity] = useState("");
  const [buyPrice, setBuyPrice] = useState("");
  const [sellPrice, setSellPrice] = useState("");
  const [notes, setNotes] = useState("");

  // SCREENSHOT
  const [screenshot, setScreenshot] =
    useState<any>(null);

  // TRADES
  const [trades, setTrades] = useState<any[]>([]);

  // GET USER
  const getUser = async () => {

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {

      router.push("/auth");

    } else {

      setUser(user);
    }
  };

  // FETCH TRADES
  const fetchTrades = async () => {

    if (!user) return;

    const { data, error } = await supabase
      .from("trades")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", {
        ascending: false,
      });

    if (error) {

      console.log(error);

    } else {

      setTrades(data || []);
    }
  };

  // LOAD USER
  useEffect(() => {

    getUser();

  }, []);

  // LOAD TRADES
  useEffect(() => {

    if (user) {
      fetchTrades();
    }

  }, [user]);

  // IMAGE UPLOAD
  const uploadImage = async () => {

    if (!screenshot) return null;

    const fileName =
      `${Date.now()}-${screenshot.name}`;

    const { error } = await supabase.storage
      .from("trade-images")
      .upload(fileName, screenshot);

    if (error) {

      console.log(error);

      return null;
    }

    const {
      data: { publicUrl },
    } = supabase.storage
      .from("trade-images")
      .getPublicUrl(fileName);

    return publicUrl;
  };

  // SAVE TRADE
  const saveTrade = async () => {

    if (!user) {
      alert("Please login first");
      return;
    }

    // UPLOAD IMAGE
    const imageUrl =
      await uploadImage();

    const { error } = await supabase
      .from("trades")
      .insert([
        {
          stock_name: stockName,
          strategy_name: strategyName,
          trade_type: tradeType,
          buy_date: buyDate,
          sell_date: sellDate,
          quantity: quantity,
          buy_price: buyPrice,
          sell_price: sellPrice,
          notes: notes,
          screenshot: imageUrl,
          user_id: user.id,
        },
      ]);

    if (error) {

      console.log(error);
      alert(error.message);

    } else {

      alert("Trade Saved Successfully ✅");

      fetchTrades();

      // CLEAR FORM
      setStockName("");
      setStrategyName("");
      setTradeType("BUY");
      setBuyDate("");
      setSellDate("");
      setQuantity("");
      setBuyPrice("");
      setSellPrice("");
      setNotes("");
      setScreenshot(null);
    }
  };

  // LOGOUT
  const logout = async () => {

    await supabase.auth.signOut();

    router.push("/auth");
  };

  // ANALYTICS
  const totalTrades = trades.length;

  const totalPnL = trades.reduce(
    (acc, trade) => {

      const pnl =
        (
          Number(trade.sell_price || 0) -
          Number(trade.buy_price || 0)
        ) *
        Number(trade.quantity || 0);

      return acc + pnl;

    },
    0
  );

  const winningTrades = trades.filter(
    (trade) => {

      const pnl =
        (
          Number(trade.sell_price || 0) -
          Number(trade.buy_price || 0)
        ) *
        Number(trade.quantity || 0);

      return pnl > 0;
    }
  );

  const winRate =
    totalTrades > 0
      ? (
          (winningTrades.length /
            totalTrades) *
          100
        ).toFixed(1)
      : 0;

  return (

    <div className="flex bg-black text-white">

      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN */}
      <main className="flex-1 min-h-screen p-6 md:p-10 pt-24 md:pt-10">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">

          <div>

            <h1 className="text-4xl md:text-5xl font-bold">
              Trading Dashboard
            </h1>

            <p className="text-zinc-400 mt-3">
              Professional trading journal & analytics
            </p>

            {user && (
              <p className="text-violet-400 mt-3 text-sm">
                Logged in as: {user.email}
              </p>
            )}

          </div>

          {/* LOGOUT */}
          <button
            onClick={logout}
            className="flex items-center gap-3 bg-red-600 hover:bg-red-700 transition rounded-2xl px-6 py-4 font-bold"
          >
            <LogOut size={20} />
            Logout
          </button>

        </div>

        {/* MARKET OVERVIEW */}
        <MarketOverview />

        {/* ANALYTICS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">

          {/* TOTAL TRADES */}
          <div className="bg-[#07122b] border border-zinc-800 rounded-3xl p-6">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-zinc-400">
                  Total Trades
                </p>

                <h2 className="text-4xl font-bold mt-3">
                  {totalTrades}
                </h2>

              </div>

              <div className="bg-violet-500/20 p-4 rounded-2xl">
                <Wallet size={32} />
              </div>

            </div>

          </div>

          {/* TOTAL PNL */}
          <div className="bg-[#07122b] border border-zinc-800 rounded-3xl p-6">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-zinc-400">
                  Total P/L
                </p>

                <h2
                  className={`text-4xl font-bold mt-3 ${
                    totalPnL >= 0
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >
                  ₹{totalPnL.toFixed(2)}
                </h2>

              </div>

              <div className="bg-green-500/20 p-4 rounded-2xl">
                <TrendingUp size={32} />
              </div>

            </div>

          </div>

          {/* WIN RATE */}
          <div className="bg-[#07122b] border border-zinc-800 rounded-3xl p-6">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-zinc-400">
                  Win Rate
                </p>

                <h2 className="text-4xl font-bold mt-3 text-yellow-400">
                  {winRate}%
                </h2>

              </div>

              <div className="bg-yellow-500/20 p-4 rounded-2xl">
                <Target size={32} />
              </div>

            </div>

          </div>

        </div>

        {/* ANALYTICS CHART */}
        <AnalyticsChart trades={trades} />

        {/* LIVE CHART */}
        <LiveChart />

        {/* MARKET NEWS */}
        <MarketNews />

        {/* AI ASSISTANT */}
        <AIAssistant />

        {/* ADD TRADE */}
        <div className="mt-14 bg-[#050816] border border-zinc-900 rounded-3xl p-6 md:p-8">

          {/* TITLE */}
          <div className="flex items-center gap-4 mb-10">

            <div className="bg-gradient-to-br from-violet-500 to-fuchsia-500 p-3 rounded-2xl">
              <Plus size={28} />
            </div>

            <h2 className="text-3xl md:text-4xl font-bold">
              Add Trade
            </h2>

          </div>

          {/* FORM */}
          <div className="space-y-6">

            {/* STOCK */}
            <input
              type="text"
              placeholder="Stock / Crypto Name"
              value={stockName}
              onChange={(e) =>
                setStockName(e.target.value)
              }
              className="w-full bg-[#07122b] border border-zinc-800 rounded-2xl p-5 text-lg outline-none"
            />

            {/* STRATEGY */}
            <input
              type="text"
              placeholder="Strategy Name"
              value={strategyName}
              onChange={(e) =>
                setStrategyName(e.target.value)
              }
              className="w-full bg-[#07122b] border border-zinc-800 rounded-2xl p-5 text-lg outline-none"
            />

            {/* TYPE */}
            <select
              value={tradeType}
              onChange={(e) =>
                setTradeType(e.target.value)
              }
              className="w-full bg-[#07122b] border border-zinc-800 rounded-2xl p-5 text-lg outline-none"
            >
              <option>BUY</option>
              <option>SELL</option>
            </select>

            {/* DATES */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <input
                type="date"
                value={buyDate}
                onChange={(e) =>
                  setBuyDate(e.target.value)
                }
                className="w-full bg-[#07122b] border border-zinc-800 rounded-2xl p-5 text-lg outline-none"
              />

              <input
                type="date"
                value={sellDate}
                onChange={(e) =>
                  setSellDate(e.target.value)
                }
                className="w-full bg-[#07122b] border border-zinc-800 rounded-2xl p-5 text-lg outline-none"
              />

            </div>

            {/* PRICE SECTION */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

              <input
                type="number"
                placeholder="Quantity"
                value={quantity}
                onChange={(e) =>
                  setQuantity(e.target.value)
                }
                className="w-full bg-[#07122b] border border-zinc-800 rounded-2xl p-5 text-lg outline-none"
              />

              <input
                type="number"
                placeholder="Buy Price"
                value={buyPrice}
                onChange={(e) =>
                  setBuyPrice(e.target.value)
                }
                className="w-full bg-[#07122b] border border-zinc-800 rounded-2xl p-5 text-lg outline-none"
              />

              <input
                type="number"
                placeholder="Sell Price"
                value={sellPrice}
                onChange={(e) =>
                  setSellPrice(e.target.value)
                }
                className="w-full bg-[#07122b] border border-zinc-800 rounded-2xl p-5 text-lg outline-none"
              />

            </div>

            {/* SCREENSHOT */}
            <input
              type="file"
              onChange={(e) =>
                setScreenshot(e.target.files?.[0])
              }
              className="w-full bg-[#07122b] border border-zinc-800 rounded-2xl p-5"
            />

            {/* NOTES */}
            <textarea
              rows={5}
              placeholder="Trade Notes..."
              value={notes}
              onChange={(e) =>
                setNotes(e.target.value)
              }
              className="w-full bg-[#07122b] border border-zinc-800 rounded-2xl p-5 text-lg outline-none"
            />

            {/* SAVE BUTTON */}
            <button
              onClick={saveTrade}
              className="w-full bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-2xl p-5 text-xl font-bold hover:opacity-90 transition"
            >
              Save Trade
            </button>

          </div>

        </div>

        {/* TRADE HISTORY */}
        <div className="mt-14 bg-[#050816] border border-zinc-900 rounded-3xl p-6 md:p-8 overflow-x-auto">

          <h2 className="text-3xl font-bold mb-8">
            Trade History
          </h2>

          <table className="w-full min-w-[900px]">

            <thead className="border-b border-zinc-800 text-zinc-400">

              <tr>

                <th className="text-left p-4">
                  Stock
                </th>

                <th className="text-left p-4">
                  Strategy
                </th>

                <th className="text-left p-4">
                  Type
                </th>

                <th className="text-left p-4">
                  Qty
                </th>

                <th className="text-left p-4">
                  Buy
                </th>

                <th className="text-left p-4">
                  Sell
                </th>

                <th className="text-left p-4">
                  Screenshot
                </th>

                <th className="text-left p-4">
                  P/L
                </th>

              </tr>

            </thead>

            <tbody>

              {trades.map((trade) => {

                const pnl =
                  (
                    Number(trade.sell_price || 0) -
                    Number(trade.buy_price || 0)
                  ) *
                  Number(trade.quantity || 0);

                return (

                  <tr
                    key={trade.id}
                    className="border-b border-zinc-900 hover:bg-zinc-900/40 transition"
                  >

                    <td className="p-4">
                      {trade.stock_name}
                    </td>

                    <td className="p-4">
                      {trade.strategy_name}
                    </td>

                    <td className="p-4">
                      {trade.trade_type}
                    </td>

                    <td className="p-4">
                      {trade.quantity}
                    </td>

                    <td className="p-4">
                      ₹{trade.buy_price}
                    </td>

                    <td className="p-4">
                      ₹{trade.sell_price}
                    </td>

                    {/* SCREENSHOT */}
                    <td className="p-4">

                      {trade.screenshot ? (

                        <a
                          href={trade.screenshot}
                          target="_blank"
                          className="text-violet-400 underline"
                        >
                          View
                        </a>

                      ) : (

                        "N/A"
                      )}

                    </td>

                    <td
                      className={`p-4 font-bold ${
                        pnl >= 0
                          ? "text-green-400"
                          : "text-red-400"
                      }`}
                    >
                      ₹{pnl.toFixed(2)}
                    </td>

                  </tr>
                );
              })}

            </tbody>

          </table>

        </div>

      </main>

    </div>
  );
}