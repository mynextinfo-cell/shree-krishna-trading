'use client'

import {
  useEffect,
  useState,
} from 'react'

import {
  Plus,
  Trash2,
  Pencil,
  BookOpen,
} from 'lucide-react'

import Sidebar from '@/components/Sidebar'

import { supabase } from '@/lib/supabase'

type Trade = {
  id: number
  stock: string
  type: string
  entry: number
  exit: number
  quantity: number
  notes: string
}

export default function JournalPage() {

  const [trades, setTrades] =
    useState<Trade[]>([])

  const [stock, setStock] =
    useState('')

  const [type, setType] =
    useState('BUY')

  const [entry, setEntry] =
    useState('')

  const [exit, setExit] =
    useState('')

  const [quantity, setQuantity] =
    useState('')

  const [notes, setNotes] =
    useState('')

  const [editingId, setEditingId] =
    useState<number | null>(
      null
    )

  // FETCH TRADES
  const fetchTrades =
    async () => {

      const {
        data,
      } = await supabase
        .from('trades')
        .select('*')
        .order(
          'id',
          {
            ascending: false,
          }
        )

      if (data) {

        setTrades(data)

      }

    }

  useEffect(() => {

    fetchTrades()

  }, [])

  // ADD / UPDATE TRADE
  const handleSaveTrade =
    async () => {

      if (
        !stock ||
        !entry ||
        !exit ||
        !quantity
      ) return

      if (editingId) {

        await supabase
          .from('trades')
          .update({

            stock,

            type,

            entry:
              Number(entry),

            exit:
              Number(exit),

            quantity:
              Number(quantity),

            notes,

          })
          .eq(
            'id',
            editingId
          )

      } else {

        await supabase
          .from('trades')
          .insert([{

            stock,

            type,

            entry:
              Number(entry),

            exit:
              Number(exit),

            quantity:
              Number(quantity),

            notes,

          }])

      }

      // RESET FORM
      setStock('')
      setType('BUY')
      setEntry('')
      setExit('')
      setQuantity('')
      setNotes('')
      setEditingId(null)

      fetchTrades()

    }

  // DELETE TRADE
  const handleDelete =
    async (
      id: number
    ) => {

      await supabase
        .from('trades')
        .delete()
        .eq('id', id)

      fetchTrades()

    }

  // EDIT TRADE
  const handleEdit =
    (trade: Trade) => {

      setEditingId(
        trade.id
      )

      setStock(
        trade.stock
      )

      setType(
        trade.type
      )

      setEntry(
        String(
          trade.entry
        )
      )

      setExit(
        String(
          trade.exit
        )
      )

      setQuantity(
        String(
          trade.quantity
        )
      )

      setNotes(
        trade.notes
      )

    }

  return (

    <div className="min-h-screen bg-[#fff7fa] flex">

      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN CONTENT */}
      <div className="flex-1 p-8 overflow-y-auto">

        {/* HEADER */}
        <div className="flex items-center gap-5 mb-10">

          <div className="bg-white p-5 rounded-3xl shadow-md border border-pink-100">

            <BookOpen
              className="text-pink-600"
              size={42}
            />

          </div>

          <div>

            <h1 className="text-6xl font-black text-pink-700">

              Trading Journal

            </h1>

            <p className="text-pink-500 text-2xl mt-2">

              Track & Analyze Your Trades

            </p>

          </div>

        </div>

        {/* FORM */}
        <div className="bg-white rounded-3xl p-8 shadow-md border border-pink-100 mb-10">

          <h2 className="text-4xl font-black text-gray-800 mb-8">

            {editingId
              ? 'Edit Trade'
              : 'Add New Trade'}

          </h2>

          <div className="grid grid-cols-3 gap-6">

            {/* STOCK */}
            <input
              type="text"
              placeholder="Stock Name"
              value={stock}
              onChange={(e) =>
                setStock(
                  e.target.value
                )
              }
              className="px-5 py-4 rounded-2xl border border-pink-100 bg-pink-50 outline-none"
            />

            {/* TYPE */}
            <select
              value={type}
              onChange={(e) =>
                setType(
                  e.target.value
                )
              }
              className="px-5 py-4 rounded-2xl border border-pink-100 bg-pink-50 outline-none"
            >

              <option value="BUY">

                BUY

              </option>

              <option value="SELL">

                SELL

              </option>

            </select>

            {/* ENTRY */}
            <input
              type="number"
              placeholder="Entry Price"
              value={entry}
              onChange={(e) =>
                setEntry(
                  e.target.value
                )
              }
              className="px-5 py-4 rounded-2xl border border-pink-100 bg-pink-50 outline-none"
            />

            {/* EXIT */}
            <input
              type="number"
              placeholder="Exit Price"
              value={exit}
              onChange={(e) =>
                setExit(
                  e.target.value
                )
              }
              className="px-5 py-4 rounded-2xl border border-pink-100 bg-pink-50 outline-none"
            />

            {/* QUANTITY */}
            <input
              type="number"
              placeholder="Quantity"
              value={quantity}
              onChange={(e) =>
                setQuantity(
                  e.target.value
                )
              }
              className="px-5 py-4 rounded-2xl border border-pink-100 bg-pink-50 outline-none"
            />

            {/* NOTES */}
            <input
              type="text"
              placeholder="Trade Notes"
              value={notes}
              onChange={(e) =>
                setNotes(
                  e.target.value
                )
              }
              className="px-5 py-4 rounded-2xl border border-pink-100 bg-pink-50 outline-none"
            />

          </div>

          {/* BUTTON */}
          <button
            onClick={
              handleSaveTrade
            }
            className="mt-8 flex items-center gap-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white px-8 py-4 rounded-2xl font-bold text-xl shadow-lg"
          >

            <Plus size={24} />

            {editingId
              ? 'Update Trade'
              : 'Add Trade'}

          </button>

        </div>

        {/* TABLE */}
        <div className="bg-white rounded-3xl shadow-md border border-pink-100 overflow-hidden">

          {/* HEADER */}
          <div className="grid grid-cols-8 bg-pink-50 px-8 py-6 font-black text-lg text-gray-700">

            <p>Stock</p>
            <p>Type</p>
            <p>Entry</p>
            <p>Exit</p>
            <p>Qty</p>
            <p>P/L</p>
            <p>Edit</p>
            <p>Delete</p>

          </div>

          {/* ROWS */}
          {trades.length > 0 ? (

            trades.map(
              (
                trade,
                index
              ) => {

                const pnl =
                  (
                    trade.exit -
                    trade.entry
                  ) *
                  trade.quantity

                return (

                  <div
                    key={index}
                    className="grid grid-cols-8 px-8 py-6 border-t border-pink-100 items-center"
                  >

                    <p className="font-black text-xl">

                      {trade.stock}

                    </p>

                    <p
                      className={`font-bold ${
                        trade.type ===
                        'BUY'
                          ? 'text-green-600'
                          : 'text-red-500'
                      }`}
                    >

                      {trade.type}

                    </p>

                    <p>

                      ₹ {trade.entry}

                    </p>

                    <p>

                      ₹ {trade.exit}

                    </p>

                    <p>

                      {trade.quantity}

                    </p>

                    <p
                      className={`font-black ${
                        pnl >= 0
                          ? 'text-green-600'
                          : 'text-red-500'
                      }`}
                    >

                      ₹ {pnl}

                    </p>

                    {/* EDIT */}
                    <button
                      onClick={() =>
                        handleEdit(
                          trade
                        )
                      }
                      className="text-blue-600 hover:text-blue-800"
                    >

                      <Pencil
                        size={24}
                      />

                    </button>

                    {/* DELETE */}
                    <button
                      onClick={() =>
                        handleDelete(
                          trade.id
                        )
                      }
                      className="text-red-500 hover:text-red-700"
                    >

                      <Trash2
                        size={24}
                      />

                    </button>

                  </div>

                )

              }
            )

          ) : (

            <div className="p-10 text-center text-gray-500 text-2xl">

              No trades added yet.

            </div>

          )}

        </div>

      </div>

    </div>

  )

}