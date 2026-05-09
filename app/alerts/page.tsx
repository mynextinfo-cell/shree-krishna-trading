'use client'

import {
  Bell,
  Plus,
  TrendingUp,
  TrendingDown,
  Trash2,
} from 'lucide-react'

import {
  useState,
} from 'react'

type AlertType = {
  id: number
  stock: string
  target: number
  current: number
  direction: 'Above' | 'Below'
}

export default function AlertsPage() {

  const [stock, setStock] =
    useState('')

  const [target, setTarget] =
    useState('')

  const [direction, setDirection] =
    useState<'Above' | 'Below'>(
      'Above'
    )

  const [alerts, setAlerts] =
    useState<AlertType[]>([])

  // ADD ALERT
  const handleAddAlert = () => {

    if (
      !stock ||
      !target
    ) return

    const newAlert = {

      id: Date.now(),

      stock,

      target:
        Number(target),

      current:
        Math.floor(
          Math.random() *
            3000
        ) + 1000,

      direction,

    }

    setAlerts([
      newAlert,
      ...alerts,
    ])

    setStock('')
    setTarget('')

    // BROWSER NOTIFICATION
    if (
      Notification.permission ===
      'granted'
    ) {

      new Notification(
        'Price Alert Created 🚀',
        {
          body: `${stock} alert set at ₹${target}`,
        }
      )

    }

  }

  // DELETE ALERT
  const handleDeleteAlert = (
    id: number
  ) => {

    const updated =
      alerts.filter(
        alert =>
          alert.id !== id
      )

    setAlerts(updated)

  }

  // ENABLE NOTIFICATION
  const enableNotifications =
    async () => {

      if (
        Notification.permission !==
        'granted'
      ) {

        await Notification.requestPermission()

      }

    }

  return (

    <div className="min-h-screen bg-[#fff7fa] p-8">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-10">

        <div className="flex items-center gap-5">

          <div className="bg-white p-5 rounded-3xl shadow-md border border-pink-100">

            <Bell
              className="text-pink-600"
              size={42}
            />

          </div>

          <div>

            <h1 className="text-6xl font-black text-pink-700">

              Price Alerts

            </h1>

            <p className="text-pink-500 text-2xl mt-2">

              Monitor Your Trading Levels

            </p>

          </div>

        </div>

        {/* ENABLE NOTIFICATION */}
        <button
          onClick={
            enableNotifications
          }
          className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-6 py-4 rounded-2xl font-bold text-xl shadow-lg"
        >

          Enable Notifications

        </button>

      </div>

      {/* CREATE ALERT */}
      <div className="bg-white rounded-3xl p-8 shadow-md border border-pink-100 mb-10">

        <h2 className="text-4xl font-black text-gray-800 mb-8">

          Create New Alert

        </h2>

        <div className="grid grid-cols-4 gap-6">

          {/* STOCK */}
          <div>

            <label className="font-bold text-lg text-gray-700">

              Stock Name

            </label>

            <input
              type="text"
              value={stock}
              onChange={(e) =>
                setStock(
                  e.target.value
                )
              }
              placeholder="RELIANCE"
              className="w-full mt-3 px-5 py-4 rounded-2xl border border-pink-100 bg-pink-50 outline-none"
            />

          </div>

          {/* TARGET */}
          <div>

            <label className="font-bold text-lg text-gray-700">

              Target Price

            </label>

            <input
              type="number"
              value={target}
              onChange={(e) =>
                setTarget(
                  e.target.value
                )
              }
              placeholder="2500"
              className="w-full mt-3 px-5 py-4 rounded-2xl border border-pink-100 bg-pink-50 outline-none"
            />

          </div>

          {/* DIRECTION */}
          <div>

            <label className="font-bold text-lg text-gray-700">

              Alert Type

            </label>

            <select
              value={direction}
              onChange={(e) =>
                setDirection(
                  e.target
                    .value as
                    'Above' | 'Below'
                )
              }
              className="w-full mt-3 px-5 py-4 rounded-2xl border border-pink-100 bg-pink-50 outline-none"
            >

              <option value="Above">

                Above

              </option>

              <option value="Below">

                Below

              </option>

            </select>

          </div>

          {/* BUTTON */}
          <div className="flex items-end">

            <button
              onClick={
                handleAddAlert
              }
              className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white px-6 py-4 rounded-2xl font-bold text-xl shadow-lg"
            >

              <Plus size={24} />

              Add Alert

            </button>

          </div>

        </div>

      </div>

      {/* ALERTS LIST */}
      <div className="bg-white rounded-3xl shadow-md border border-pink-100 overflow-hidden">

        {/* HEADER */}
        <div className="grid grid-cols-5 bg-pink-50 px-8 py-6 font-black text-xl text-gray-700">

          <p>Stock</p>

          <p>Current Price</p>

          <p>Target Price</p>

          <p>Direction</p>

          <p>Action</p>

        </div>

        {/* ALERT ROWS */}
        {alerts.length > 0 ? (

          alerts.map(
            (
              alert,
              index
            ) => (

              <div
                key={index}
                className="grid grid-cols-5 px-8 py-6 border-t border-pink-100 items-center"
              >

                {/* STOCK */}
                <p className="font-black text-2xl">

                  {alert.stock}

                </p>

                {/* CURRENT */}
                <p className="font-bold text-xl text-blue-600">

                  ₹ {alert.current}

                </p>

                {/* TARGET */}
                <p className="font-bold text-xl text-pink-600">

                  ₹ {alert.target}

                </p>

                {/* DIRECTION */}
                <div>

                  <span
                    className={`flex items-center gap-2 w-fit px-5 py-2 rounded-2xl text-white font-bold text-lg ${
                      alert.direction ===
                      'Above'
                        ? 'bg-green-500'
                        : 'bg-red-500'
                    }`}
                  >

                    {alert.direction ===
                    'Above' ? (

                      <TrendingUp
                        size={20}
                      />

                    ) : (

                      <TrendingDown
                        size={20}
                      />

                    )}

                    {
                      alert.direction
                    }

                  </span>

                </div>

                {/* DELETE */}
                <button
                  onClick={() =>
                    handleDeleteAlert(
                      alert.id
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

            No alerts created yet.

          </div>

        )}

      </div>

    </div>

  )

}