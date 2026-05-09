'use client'

export default function RightPanel() {

  const watchlist = [

    {

      name: 'RELIANCE',

      price: '₹ 2,845',

      change: '+1.82%',

      positive: true

    },

    {

      name: 'TCS',

      price: '₹ 4,120',

      change: '+0.94%',

      positive: true

    },

    {

      name: 'INFY',

      price: '₹ 1,585',

      change: '-0.52%',

      positive: false

    },

    {

      name: 'HDFCBANK',

      price: '₹ 1,742',

      change: '+1.12%',

      positive: true

    }

  ]

  const gainers = [

    'ADANIPORTS',

    'SBIN',

    'TATASTEEL',

    'LT',

    'ITC'

  ]

  const losers = [

    'WIPRO',

    'HCLTECH',

    'TECHM',

    'ASIANPAINT',

    'ULTRACEMCO'

  ]

  return (

    <aside className="w-[340px] min-h-screen bg-white border-l border-pink-100 p-5">

      {/* WATCHLIST */}
      <div className="bg-pink-50 rounded-3xl p-5 shadow-sm mb-6">

        <h2 className="text-2xl font-black text-pink-700 mb-5">

          Watchlist

        </h2>

        <div className="space-y-4">

          {watchlist.map((stock, index) => (

            <div
              key={index}
              className="bg-white rounded-2xl p-4 flex items-center justify-between shadow-sm"
            >

              <div>

                <h3 className="font-bold text-gray-800">

                  {stock.name}

                </h3>

                <p className="text-gray-500 text-sm">

                  {stock.price}

                </p>

              </div>

              <div
                className={`font-bold ${
                  stock.positive

                    ? 'text-green-600'

                    : 'text-red-500'
                }`}
              >

                {stock.change}

              </div>

            </div>

          ))}

        </div>

      </div>

      {/* TOP GAINERS */}
      <div className="bg-green-50 rounded-3xl p-5 shadow-sm mb-6">

        <h2 className="text-2xl font-black text-green-700 mb-5">

          Top Gainers

        </h2>

        <div className="space-y-3">

          {gainers.map((stock, index) => (

            <div
              key={index}
              className="bg-white rounded-2xl p-4 flex items-center justify-between"
            >

              <h3 className="font-bold text-gray-800">

                {stock}

              </h3>

              <span className="text-green-600 font-bold">

                ▲

              </span>

            </div>

          ))}

        </div>

      </div>

      {/* TOP LOSERS */}
      <div className="bg-red-50 rounded-3xl p-5 shadow-sm">

        <h2 className="text-2xl font-black text-red-600 mb-5">

          Top Losers

        </h2>

        <div className="space-y-3">

          {losers.map((stock, index) => (

            <div
              key={index}
              className="bg-white rounded-2xl p-4 flex items-center justify-between"
            >

              <h3 className="font-bold text-gray-800">

                {stock}

              </h3>

              <span className="text-red-500 font-bold">

                ▼

              </span>

            </div>

          ))}

        </div>

      </div>

    </aside>

  )

}