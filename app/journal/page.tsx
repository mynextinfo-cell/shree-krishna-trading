'use client'

import { useState } from 'react'

import nseStocks from '../data/nseStocks'

import { supabase } from '@/lib/supabase'

import DashboardLayout from '@/components/DashboardLayout'

export default function JournalPage() {

  const [trades, setTrades] = useState<any[]>([])

  const [form, setForm] = useState({

    stock: '',
    type: 'BUY',
    quantity: '',
    entryPrice: '',
    exitPrice: '',
    brokerage: '',
    tradeDate: '',
    exitDate: '',
    notes: ''

  })

  // STOCK SEARCH
  const filteredStocks = nseStocks.filter((stock) =>

    stock.toLowerCase().includes(

      form.stock.toLowerCase()

    )

  )

  // SAVE TRADE
  const addTrade = async () => {

    if (

      !form.stock ||

      !form.quantity ||

      !form.entryPrice ||

      !form.exitPrice

    ) {

      alert('Please fill required fields')

      return

    }

    // GET USER
    const {

      data: { user }

    } = await supabase.auth.getUser()

    if (!user) {

      alert('Please login first')

      return

    }

    const qty = Number(form.quantity)

    const entry = Number(form.entryPrice)

    const exit = Number(form.exitPrice)

    const brokerage = Number(

      form.brokerage || 0

    )

    let pnl = 0

    // BUY/SELL PNL
    if (form.type === 'BUY') {

      pnl =

        (exit - entry)

        *

        qty

        -

        brokerage

    } else {

      pnl =

        (entry - exit)

        *

        qty

        -

        brokerage

    }

    // SAVE TO DATABASE
    const { error } = await supabase

      .from('trades')

      .insert([{

        user_id: user.id,

        stock: form.stock,

        type: form.type,

        quantity: qty,

        entry_price: entry,

        exit_price: exit,

        brokerage: brokerage,

        trade_date: form.tradeDate,

        exit_date: form.exitDate,

        notes: form.notes

      }])

    if (error) {

      console.log(error)

      alert(error.message)

      return

    }

    // LOCAL UPDATE
    const newTrade = {

      id: trades.length + 1,

      ...form,

      pnl: pnl.toFixed(2)

    }

    setTrades([newTrade, ...trades])

    alert('Trade Saved Successfully ✅')

    // RESET FORM
    setForm({

      stock: '',
      type: 'BUY',
      quantity: '',
      entryPrice: '',
      exitPrice: '',
      brokerage: '',
      tradeDate: '',
      exitDate: '',
      notes: ''

    })

  }

  // TOTAL PNL
  const totalPNL = trades.reduce(

    (acc, trade) =>

      acc + Number(trade.pnl),

    0

  )

  return (

    <DashboardLayout>

      <main className="min-h-screen bg-black text-white p-6">

        {/* PAGE TITLE */}
        <div className="mb-8">

          <h1 className="text-5xl font-bold text-pink-500 mb-2">

            Trading Journal

          </h1>

          <p className="text-gray-400 text-lg">

            Record and manage your trades professionally

          </p>

        </div>

        {/* SUMMARY */}
        <div className="grid md:grid-cols-3 gap-5 mb-8">

          {/* TOTAL TRADES */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 shadow-lg">

            <p className="text-gray-400 mb-2">

              Total Trades

            </p>

            <h2 className="text-4xl font-bold text-white">

              {trades.length}

            </h2>

          </div>

          {/* TOTAL PNL */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 shadow-lg">

            <p className="text-gray-400 mb-2">

              Total Profit / Loss

            </p>

            <h2
              className={`text-4xl font-bold ${
                totalPNL >= 0

                  ? 'text-green-500'

                  : 'text-red-500'
              }`}
            >

              ₹ {totalPNL.toFixed(2)}

            </h2>

          </div>

          {/* ACTIVE RECORDS */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 shadow-lg">

            <p className="text-gray-400 mb-2">

              Active Records

            </p>

            <h2 className="text-4xl font-bold text-white">

              {trades.length}

            </h2>

          </div>

        </div>

        {/* ADD TRADE */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl shadow-lg p-8 mb-10">

          <h2 className="text-3xl font-bold mb-6 text-pink-400">

            ➕ Add Trade

          </h2>

          <div className="grid md:grid-cols-3 gap-5">

            {/* STOCK SEARCH */}
            <div className="relative">

              <input
                type="text"
                placeholder="Stock Name"
                value={form.stock}
                onChange={(e) =>

                  setForm({

                    ...form,

                    stock: e.target.value

                  })

                }
                className="bg-zinc-800 border border-zinc-700 rounded-2xl p-4 w-full text-white"
              />

              {/* SUGGESTIONS */}
              {form.stock && (

                <div className="absolute z-50 bg-zinc-900 border border-zinc-700 rounded-2xl shadow-lg w-full mt-2 max-h-[250px] overflow-y-auto">

                  {filteredStocks

                    .slice(0, 15)

                    .map((stock) => (

                      <button
                        type="button"
                        key={stock}
                        onClick={() =>

                          setForm({

                            ...form,

                            stock: stock

                          })

                        }
                        className="w-full text-left px-4 py-3 hover:bg-zinc-800 border-b border-zinc-700"
                      >

                        {stock}

                      </button>

                    ))}

                </div>

              )}

            </div>

            {/* BUY/SELL */}
            <select
              value={form.type}
              onChange={(e) =>

                setForm({

                  ...form,

                  type: e.target.value

                })

              }
              className="bg-zinc-800 border border-zinc-700 rounded-2xl p-4 text-white"
            >

              <option value="BUY">

                BUY

              </option>

              <option value="SELL">

                SELL

              </option>

            </select>

            {/* QUANTITY */}
            <input
              type="number"
              placeholder="Quantity"
              value={form.quantity}
              onChange={(e) =>

                setForm({

                  ...form,

                  quantity: e.target.value

                })

              }
              className="bg-zinc-800 border border-zinc-700 rounded-2xl p-4 text-white"
            />

            {/* ENTRY */}
            <input
              type="number"
              placeholder="Entry Price"
              value={form.entryPrice}
              onChange={(e) =>

                setForm({

                  ...form,

                  entryPrice: e.target.value

                })

              }
              className="bg-zinc-800 border border-zinc-700 rounded-2xl p-4 text-white"
            />

            {/* EXIT */}
            <input
              type="number"
              placeholder="Exit Price"
              value={form.exitPrice}
              onChange={(e) =>

                setForm({

                  ...form,

                  exitPrice: e.target.value

                })

              }
              className="bg-zinc-800 border border-zinc-700 rounded-2xl p-4 text-white"
            />

            {/* BROKERAGE */}
            <input
              type="number"
              placeholder="Brokerage"
              value={form.brokerage}
              onChange={(e) =>

                setForm({

                  ...form,

                  brokerage: e.target.value

                })

              }
              className="bg-zinc-800 border border-zinc-700 rounded-2xl p-4 text-white"
            />

            {/* TRADE DATE */}
            <input
              type="date"
              value={form.tradeDate}
              onChange={(e) =>

                setForm({

                  ...form,

                  tradeDate: e.target.value

                })

              }
              className="bg-zinc-800 border border-zinc-700 rounded-2xl p-4 text-white"
            />

            {/* EXIT DATE */}
            <input
              type="date"
              value={form.exitDate}
              onChange={(e) =>

                setForm({

                  ...form,

                  exitDate: e.target.value

                })

              }
              className="bg-zinc-800 border border-zinc-700 rounded-2xl p-4 text-white"
            />

            {/* NOTES */}
            <input
              type="text"
              placeholder="Strategy / Notes"
              value={form.notes}
              onChange={(e) =>

                setForm({

                  ...form,

                  notes: e.target.value

                })

              }
              className="bg-zinc-800 border border-zinc-700 rounded-2xl p-4 text-white"
            />

          </div>

          {/* SAVE BUTTON */}
          <button
            onClick={addTrade}
            className="mt-8 bg-pink-600 hover:bg-pink-700 text-white px-10 py-4 rounded-2xl font-bold"
          >

            Save Trade

          </button>

        </div>

      </main>

    </DashboardLayout>

  )

}