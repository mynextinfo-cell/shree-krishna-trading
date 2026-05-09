'use client'

import {
  CalendarDays,
  Clock3,
  Globe2,
  TrendingUp,
  AlertTriangle,
} from 'lucide-react'

type EventType = {
  country: string
  event: string
  time: string
  impact: 'High' | 'Medium' | 'Low'
  forecast: string
  previous: string
}

export default function CalendarPage() {

  const events: EventType[] = [

    {
      country: 'India',
      event: 'RBI Interest Rate Decision',
      time: '10:00 AM',
      impact: 'High',
      forecast: '6.50%',
      previous: '6.50%',
    },

    {
      country: 'United States',
      event: 'FED Chair Speech',
      time: '07:30 PM',
      impact: 'High',
      forecast: 'Hawkish',
      previous: 'Neutral',
    },

    {
      country: 'India',
      event: 'CPI Inflation Rate',
      time: '05:30 PM',
      impact: 'Medium',
      forecast: '5.1%',
      previous: '5.4%',
    },

    {
      country: 'United States',
      event: 'Non Farm Payrolls',
      time: '06:00 PM',
      impact: 'High',
      forecast: '215K',
      previous: '195K',
    },

    {
      country: 'China',
      event: 'GDP Growth Rate',
      time: '08:00 AM',
      impact: 'Medium',
      forecast: '4.8%',
      previous: '4.6%',
    },

    {
      country: 'Japan',
      event: 'BoJ Monetary Policy',
      time: '09:00 AM',
      impact: 'Low',
      forecast: 'No Change',
      previous: 'No Change',
    },

  ]

  return (

    <div className="min-h-screen bg-[#fff7fa] p-8">

      {/* HEADER */}
      <div className="flex items-center gap-5 mb-10">

        <div className="bg-white p-5 rounded-3xl shadow-md border border-pink-100">

          <CalendarDays
            className="text-pink-600"
            size={42}
          />

        </div>

        <div>

          <h1 className="text-6xl font-black text-pink-700">

            Economic Calendar

          </h1>

          <p className="text-pink-500 text-2xl mt-2">

            Global Market Moving Events

          </p>

        </div>

      </div>

      {/* TOP STATS */}
      <div className="grid grid-cols-3 gap-6 mb-10">

        {/* TOTAL EVENTS */}
        <div className="bg-white rounded-3xl p-8 shadow-md border border-pink-100">

          <div className="flex items-center gap-4">

            <CalendarDays
              className="text-pink-600"
              size={38}
            />

            <p className="text-2xl font-bold text-gray-600">

              Total Events

            </p>

          </div>

          <h2 className="text-6xl font-black text-pink-700 mt-6">

            {events.length}

          </h2>

        </div>

        {/* HIGH IMPACT */}
        <div className="bg-white rounded-3xl p-8 shadow-md border border-pink-100">

          <div className="flex items-center gap-4">

            <AlertTriangle
              className="text-red-500"
              size={38}
            />

            <p className="text-2xl font-bold text-gray-600">

              High Impact

            </p>

          </div>

          <h2 className="text-6xl font-black text-red-500 mt-6">

            {
              events.filter(
                item =>
                  item.impact ===
                  'High'
              ).length
            }

          </h2>

        </div>

        {/* GLOBAL MARKETS */}
        <div className="bg-white rounded-3xl p-8 shadow-md border border-pink-100">

          <div className="flex items-center gap-4">

            <Globe2
              className="text-blue-600"
              size={38}
            />

            <p className="text-2xl font-bold text-gray-600">

              Countries

            </p>

          </div>

          <h2 className="text-6xl font-black text-blue-600 mt-6">

            4

          </h2>

        </div>

      </div>

      {/* EVENTS TABLE */}
      <div className="bg-white rounded-3xl shadow-md border border-pink-100 overflow-hidden">

        {/* TABLE HEADER */}
        <div className="grid grid-cols-6 bg-pink-50 px-8 py-6 font-black text-xl text-gray-700">

          <p>Country</p>

          <p>Event</p>

          <p>Time</p>

          <p>Impact</p>

          <p>Forecast</p>

          <p>Previous</p>

        </div>

        {/* EVENTS */}
        {events.map(
          (
            item,
            index
          ) => (

            <div
              key={index}
              className="grid grid-cols-6 px-8 py-6 border-t border-pink-100 items-center"
            >

              {/* COUNTRY */}
              <div className="flex items-center gap-3">

                <Globe2
                  className="text-pink-600"
                  size={24}
                />

                <p className="font-bold text-lg">

                  {item.country}

                </p>

              </div>

              {/* EVENT */}
              <div>

                <p className="font-black text-xl text-gray-800">

                  {item.event}

                </p>

              </div>

              {/* TIME */}
              <div className="flex items-center gap-3">

                <Clock3
                  className="text-blue-600"
                  size={22}
                />

                <p className="font-bold text-lg">

                  {item.time}

                </p>

              </div>

              {/* IMPACT */}
              <div>

                <span
                  className={`px-5 py-2 rounded-2xl text-white font-bold text-lg ${
                    item.impact ===
                    'High'
                      ? 'bg-red-500'
                      : item.impact ===
                        'Medium'
                      ? 'bg-yellow-500'
                      : 'bg-green-500'
                  }`}
                >

                  {item.impact}

                </span>

              </div>

              {/* FORECAST */}
              <div>

                <p className="font-black text-green-600 text-xl">

                  {item.forecast}

                </p>

              </div>

              {/* PREVIOUS */}
              <div className="flex items-center gap-3">

                <TrendingUp
                  className="text-pink-600"
                  size={22}
                />

                <p className="font-bold text-lg">

                  {item.previous}

                </p>

              </div>

            </div>

          )
        )}

      </div>

      {/* FOOTER NOTE */}
      <div className="mt-10 bg-white rounded-3xl p-8 shadow-md border border-pink-100">

        <h2 className="text-3xl font-black text-gray-800">

          Trading Insight

        </h2>

        <p className="text-xl text-gray-600 mt-4 leading-relaxed">

          High impact events such as RBI rate decisions,
          FED speeches, inflation data, and employment
          reports can create strong volatility in stock,
          forex, and crypto markets. Always monitor
          economic events before taking large positions.

        </p>

      </div>

    </div>

  )

}