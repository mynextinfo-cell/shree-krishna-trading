'use client'

import { useState } from 'react'

import { X } from 'lucide-react'

type Trade = {
  stock: string
  type: string
  entry: number
  exit: number
  quantity: number
  pnl: number
  profit: boolean
  emotion: string
  strategy: string
  notes: string
}

type Props = {
  open: boolean
  onClose: () => void
  onAddTrade: (trade: Trade) => void
}

export default function AddTradeModal({
  open,
  onClose,
  onAddTrade,
}: Props) {

  const [stock, setStock] = useState('')
  const [type, setType] = useState('BUY')
  const [entry, setEntry] = useState('')
  const [exit, setExit] = useState('')
  const [quantity, setQuantity] = useState('')
  const [emotion, setEmotion] =
    useState('Confident')
  const [strategy, setStrategy] =
    useState('Swing')
  const [notes, setNotes] =
    useState('')

  if (!open) return null

  const handleSave = () => {

    const entryPrice = Number(entry)

    const exitPrice = Number(exit)

    const qty = Number(quantity)

    let pnlValue = 0

    if (type === 'BUY') {

      pnlValue =
        (exitPrice - entryPrice) * qty

    } else {

      pnlValue =
        (entryPrice - exitPrice) * qty

    }

    const trade = {
      stock,
      type,
      entry: entryPrice,
      exit: exitPrice,
      quantity: qty,
      pnl: pnlValue,
      profit: pnlValue >= 0,
      emotion,
      strategy,
      notes,
    }

    onAddTrade(trade)

    onClose()

    // RESET
    setStock('')
    setType('BUY')
    setEntry('')
    setExit('')
    setQuantity('')
    setEmotion('Confident')
    setStrategy('Swing')
    setNotes('')
  }

  return (

    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 overflow-y-auto p-5">

      <div className="bg-white w-[700px] rounded-3xl shadow-2xl p-8">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-8">

          <h2 className="text-4xl font-black text-pink-700">

            Add Trade

          </h2>

          <button onClick={onClose}>

            <X size={28} />

          </button>

        </div>

        {/* FORM */}
        <div className="grid grid-cols-2 gap-5">

          {/* STOCK */}
          <div>

            <label className="font-semibold">

              Stock Name

            </label>

            <input
              type="text"
              value={stock}
              onChange={(e) =>
                setStock(e.target.value)
              }
              placeholder="RELIANCE"
              className="w-full mt-2 px-4 py-3 rounded-2xl border border-pink-100 bg-pink-50 outline-none"
            />

          </div>

          {/* TYPE */}
          <div>

            <label className="font-semibold">

              Trade Type

            </label>

            <select
              value={type}
              onChange={(e) =>
                setType(e.target.value)
              }
              className="w-full mt-2 px-4 py-3 rounded-2xl border border-pink-100 bg-pink-50 outline-none"
            >

              <option>BUY</option>

              <option>SELL</option>

            </select>

          </div>

          {/* ENTRY */}
          <div>

            <label className="font-semibold">

              Entry Price

            </label>

            <input
              type="number"
              value={entry}
              onChange={(e) =>
                setEntry(e.target.value)
              }
              className="w-full mt-2 px-4 py-3 rounded-2xl border border-pink-100 bg-pink-50 outline-none"
            />

          </div>

          {/* EXIT */}
          <div>

            <label className="font-semibold">

              Exit Price

            </label>

            <input
              type="number"
              value={exit}
              onChange={(e) =>
                setExit(e.target.value)
              }
              className="w-full mt-2 px-4 py-3 rounded-2xl border border-pink-100 bg-pink-50 outline-none"
            />

          </div>

          {/* QTY */}
          <div>

            <label className="font-semibold">

              Quantity

            </label>

            <input
              type="number"
              value={quantity}
              onChange={(e) =>
                setQuantity(e.target.value)
              }
              className="w-full mt-2 px-4 py-3 rounded-2xl border border-pink-100 bg-pink-50 outline-none"
            />

          </div>

          {/* EMOTION */}
          <div>

            <label className="font-semibold">

              Emotion

            </label>

            <select
              value={emotion}
              onChange={(e) =>
                setEmotion(e.target.value)
              }
              className="w-full mt-2 px-4 py-3 rounded-2xl border border-pink-100 bg-pink-50 outline-none"
            >

              <option>Confident</option>

              <option>Fear</option>

              <option>Greed</option>

              <option>FOMO</option>

            </select>

          </div>

          {/* STRATEGY */}
          <div>

            <label className="font-semibold">

              Strategy

            </label>

            <select
              value={strategy}
              onChange={(e) =>
                setStrategy(e.target.value)
              }
              className="w-full mt-2 px-4 py-3 rounded-2xl border border-pink-100 bg-pink-50 outline-none"
            >

              <option>Swing</option>

              <option>Intraday</option>

              <option>Scalping</option>

              <option>Breakout</option>

            </select>

          </div>

        </div>

        {/* NOTES */}
        <div className="mt-5">

          <label className="font-semibold">

            Notes

          </label>

          <textarea
            rows={4}
            value={notes}
            onChange={(e) =>
              setNotes(e.target.value)
            }
            placeholder="Write your trading notes..."
            className="w-full mt-2 px-4 py-3 rounded-2xl border border-pink-100 bg-pink-50 outline-none"
          />

        </div>

        {/* BUTTON */}
        <button
          onClick={handleSave}
          className="w-full mt-8 bg-gradient-to-r from-pink-500 to-rose-500 text-white py-4 rounded-2xl font-black text-lg shadow-lg"
        >

          Save Trade

        </button>

      </div>

    </div>

  )

}