'use client'

import {
  Wallet,
  ArrowDownCircle,
  ArrowUpCircle,
  Plus,
  Trash2,
  Landmark,
} from 'lucide-react'

import {
  useState,
} from 'react'

type Transaction = {
  id: number
  type: 'Income' | 'Expense'
  category: string
  amount: number
  note: string
  date: string
}

export default function LedgerPage() {

  const [transactions, setTransactions] =
    useState<Transaction[]>([])

  const [type, setType] =
    useState<'Income' | 'Expense'>(
      'Income'
    )

  const [category, setCategory] =
    useState('')

  const [amount, setAmount] =
    useState('')

  const [note, setNote] =
    useState('')

  // ADD TRANSACTION
  const handleAddTransaction =
    () => {

      if (
        !category ||
        !amount
      ) return

      const newTransaction = {

        id: Date.now(),

        type,

        category,

        amount:
          Number(amount),

        note,

        date:
          new Date().toLocaleDateString(),

      }

      setTransactions([
        newTransaction,
        ...transactions,
      ])

      setCategory('')
      setAmount('')
      setNote('')

    }

  // DELETE TRANSACTION
  const handleDelete =
    (id: number) => {

      const updated =
        transactions.filter(
          item =>
            item.id !== id
        )

      setTransactions(updated)

    }

  // CALCULATIONS
  const totalIncome =
    transactions
      .filter(
        item =>
          item.type ===
          'Income'
      )
      .reduce(
        (acc, item) =>
          acc + item.amount,
        0
      )

  const totalExpense =
    transactions
      .filter(
        item =>
          item.type ===
          'Expense'
      )
      .reduce(
        (acc, item) =>
          acc + item.amount,
        0
      )

  const balance =
    totalIncome -
    totalExpense

  return (

    <div className="min-h-screen bg-[#fff7fa] p-8">

      {/* HEADER */}
      <div className="flex items-center gap-5 mb-10">

        <div className="bg-white p-5 rounded-3xl shadow-md border border-pink-100">

          <Wallet
            className="text-pink-600"
            size={42}
          />

        </div>

        <div>

          <h1 className="text-6xl font-black text-pink-700">

            Trading Ledger

          </h1>

          <p className="text-pink-500 text-2xl mt-2">

            Track Trading Income & Expenses

          </p>

        </div>

      </div>

      {/* STATS */}
      <div className="grid grid-cols-3 gap-6 mb-10">

        {/* INCOME */}
        <div className="bg-white rounded-3xl p-8 shadow-md border border-pink-100">

          <div className="flex items-center gap-4">

            <ArrowDownCircle
              className="text-green-600"
              size={36}
            />

            <p className="text-xl font-bold text-gray-600">

              Total Income

            </p>

          </div>

          <h2 className="text-5xl font-black text-green-600 mt-6">

            ₹ {totalIncome}

          </h2>

        </div>

        {/* EXPENSE */}
        <div className="bg-white rounded-3xl p-8 shadow-md border border-pink-100">

          <div className="flex items-center gap-4">

            <ArrowUpCircle
              className="text-red-500"
              size={36}
            />

            <p className="text-xl font-bold text-gray-600">

              Total Expense

            </p>

          </div>

          <h2 className="text-5xl font-black text-red-500 mt-6">

            ₹ {totalExpense}

          </h2>

        </div>

        {/* BALANCE */}
        <div className="bg-white rounded-3xl p-8 shadow-md border border-pink-100">

          <div className="flex items-center gap-4">

            <Landmark
              className="text-blue-600"
              size={36}
            />

            <p className="text-xl font-bold text-gray-600">

              Net Balance

            </p>

          </div>

          <h2
            className={`text-5xl font-black mt-6 ${
              balance >= 0
                ? 'text-blue-600'
                : 'text-red-500'
            }`}
          >

            ₹ {balance}

          </h2>

        </div>

      </div>

      {/* ADD TRANSACTION */}
      <div className="bg-white rounded-3xl p-8 shadow-md border border-pink-100 mb-10">

        <h2 className="text-4xl font-black text-gray-800 mb-8">

          Add Transaction

        </h2>

        <div className="grid grid-cols-5 gap-6">

          {/* TYPE */}
          <div>

            <label className="font-bold text-lg text-gray-700">

              Type

            </label>

            <select
              value={type}
              onChange={(e) =>
                setType(
                  e.target
                    .value as
                    'Income' | 'Expense'
                )
              }
              className="w-full mt-3 px-5 py-4 rounded-2xl border border-pink-100 bg-pink-50 outline-none"
            >

              <option value="Income">

                Income

              </option>

              <option value="Expense">

                Expense

              </option>

            </select>

          </div>

          {/* CATEGORY */}
          <div>

            <label className="font-bold text-lg text-gray-700">

              Category

            </label>

            <input
              type="text"
              value={category}
              onChange={(e) =>
                setCategory(
                  e.target.value
                )
              }
              placeholder="Brokerage"
              className="w-full mt-3 px-5 py-4 rounded-2xl border border-pink-100 bg-pink-50 outline-none"
            />

          </div>

          {/* AMOUNT */}
          <div>

            <label className="font-bold text-lg text-gray-700">

              Amount

            </label>

            <input
              type="number"
              value={amount}
              onChange={(e) =>
                setAmount(
                  e.target.value
                )
              }
              placeholder="1000"
              className="w-full mt-3 px-5 py-4 rounded-2xl border border-pink-100 bg-pink-50 outline-none"
            />

          </div>

          {/* NOTE */}
          <div>

            <label className="font-bold text-lg text-gray-700">

              Note

            </label>

            <input
              type="text"
              value={note}
              onChange={(e) =>
                setNote(
                  e.target.value
                )
              }
              placeholder="Trade profit"
              className="w-full mt-3 px-5 py-4 rounded-2xl border border-pink-100 bg-pink-50 outline-none"
            />

          </div>

          {/* BUTTON */}
          <div className="flex items-end">

            <button
              onClick={
                handleAddTransaction
              }
              className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white px-6 py-4 rounded-2xl font-bold text-xl shadow-lg"
            >

              <Plus size={24} />

              Add

            </button>

          </div>

        </div>

      </div>

      {/* TRANSACTION TABLE */}
      <div className="bg-white rounded-3xl shadow-md border border-pink-100 overflow-hidden">

        {/* HEADER */}
        <div className="grid grid-cols-6 bg-pink-50 px-8 py-6 font-black text-xl text-gray-700">

          <p>Type</p>

          <p>Category</p>

          <p>Amount</p>

          <p>Note</p>

          <p>Date</p>

          <p>Delete</p>

        </div>

        {/* ROWS */}
        {transactions.length > 0 ? (

          transactions.map(
            (
              item,
              index
            ) => (

              <div
                key={index}
                className="grid grid-cols-6 px-8 py-6 border-t border-pink-100 items-center"
              >

                {/* TYPE */}
                <div>

                  <span
                    className={`px-5 py-2 rounded-2xl text-white font-bold text-lg ${
                      item.type ===
                      'Income'
                        ? 'bg-green-500'
                        : 'bg-red-500'
                    }`}
                  >

                    {item.type}

                  </span>

                </div>

                {/* CATEGORY */}
                <p className="font-bold text-xl">

                  {item.category}

                </p>

                {/* AMOUNT */}
                <p
                  className={`font-black text-2xl ${
                    item.type ===
                    'Income'
                      ? 'text-green-600'
                      : 'text-red-500'
                  }`}
                >

                  ₹ {item.amount}

                </p>

                {/* NOTE */}
                <p className="text-lg text-gray-600">

                  {item.note}

                </p>

                {/* DATE */}
                <p className="font-bold text-lg">

                  {item.date}

                </p>

                {/* DELETE */}
                <button
                  onClick={() =>
                    handleDelete(
                      item.id
                    )
                  }
                  className="text-red-500 hover:text-red-700"
                >

                  <Trash2
                    size={26}
                  />

                </button>

              </div>

            )
          )

        ) : (

          <div className="p-10 text-center text-gray-500 text-2xl">

            No transactions added yet.

          </div>

        )}

      </div>

    </div>

  )

}