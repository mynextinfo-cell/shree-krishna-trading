'use client'

export default function MarketNews() {

  const news = [

    {

      title:

        'NIFTY closes flat amid mixed global cues',

      source: 'Economic Times',

      time: '2 mins ago',

      positive: false

    },

    {

      title:

        'Reliance Industries gains over 2% in today’s session',

      source: 'Moneycontrol',

      time: '5 mins ago',

      positive: true

    },

    {

      title:

        'US markets rally as Fed hints at rate stability',

      source: 'Bloomberg',

      time: '12 mins ago',

      positive: true

    },

    {

      title:

        'IT sector under pressure after weak earnings outlook',

      source: 'CNBC TV18',

      time: '20 mins ago',

      positive: false

    },

    {

      title:

        'FIIs continue strong buying in Indian equities',

      source: 'Business Standard',

      time: '28 mins ago',

      positive: true

    }

  ]

  return (

    <div className="mt-8 bg-white rounded-3xl border border-pink-100 shadow-lg p-6">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">

        <div>

          <h2 className="text-3xl font-black text-pink-700">

            Market News

          </h2>

          <p className="text-gray-500 mt-1">

            Live financial headlines & updates

          </p>

        </div>

        {/* LIVE BADGE */}
        <div className="bg-red-100 text-red-600 px-4 py-2 rounded-full font-bold flex items-center gap-2">

          <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>

          LIVE

        </div>

      </div>

      {/* NEWS LIST */}
      <div className="space-y-5">

        {news.map((item, index) => (

          <div
            key={index}
            className="border border-pink-100 rounded-2xl p-5 hover:shadow-md transition-all duration-300 bg-pink-50/40"
          >

            {/* TOP */}
            <div className="flex items-start justify-between gap-4">

              <div>

                <h3 className="text-xl font-bold text-gray-800 leading-relaxed">

                  {item.title}

                </h3>

                <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">

                  <span className="font-semibold">

                    {item.source}

                  </span>

                  <span>

                    {item.time}

                  </span>

                </div>

              </div>

              {/* SENTIMENT */}
              <div
                className={`px-4 py-2 rounded-xl text-sm font-bold ${
                  item.positive

                    ? 'bg-green-100 text-green-700'

                    : 'bg-red-100 text-red-600'
                }`}
              >

                {item.positive

                  ? 'Bullish'

                  : 'Bearish'}

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>

  )

}