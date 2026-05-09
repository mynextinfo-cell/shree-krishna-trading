'use client'

export default function HeatmapSection() {

  const heatmapData = [

    {

      name: 'NIFTY 50',

      value: '24,326.65',

      change: '-0.02%',

      positive: false

    },

    {

      name: 'NIFTY NEXT 50',

      value: '71,852.90',

      change: '+0.23%',

      positive: true

    },

    {

      name: 'NIFTY MIDCAP 50',

      value: '17,617.55',

      change: '+1.41%',

      positive: true

    },

    {

      name: 'NIFTY MIDCAP 100',

      value: '62,003.15',

      change: '+1.10%',

      positive: true

    },

    {

      name: 'NIFTY MIDCAP 150',

      value: '22,804.95',

      change: '+1.10%',

      positive: true

    },

    {

      name: 'NIFTY SMLCAP 50',

      value: '9,168.60',

      change: '+0.92%',

      positive: true

    },

    {

      name: 'NIFTY SMLCAP 100',

      value: '18,695.65',

      change: '+0.87%',

      positive: true

    },

    {

      name: 'NIFTY SMLCAP 250',

      value: '17,409.00',

      change: '+1.02%',

      positive: true

    },

    {

      name: 'NIFTY MIDSMALL 400',

      value: '20,825.60',

      change: '+1.07%',

      positive: true

    },

    {

      name: 'NIFTY 100',

      value: '25,319.50',

      change: '+0.03%',

      positive: true

    },

    {

      name: 'NIFTY 200',

      value: '13,991.90',

      change: '+0.24%',

      positive: true

    },

    {

      name: 'NIFTY500 MULTICAP',

      value: '16,340.15',

      change: '+0.56%',

      positive: true

    }

  ]

  return (

    <div className="flex gap-6 mt-6">

      {/* LEFT PANEL */}
      <div className="w-[260px] bg-white rounded-3xl border border-pink-100 shadow-sm p-5 h-fit">

        <h2 className="text-pink-600 text-xl font-bold border-l-4 border-pink-500 pl-3 mb-6">

          Broad Market Indices

        </h2>

        <div className="space-y-5 text-gray-700 font-medium">

          <div className="pb-4 border-b">

            Sectoral Indices

          </div>

          <div className="pb-4 border-b">

            Thematic Indices

          </div>

          <div className="pb-4 border-b">

            Strategy Indices

          </div>

        </div>

      </div>

      {/* RIGHT HEATMAP */}
      <div className="flex-1">

        {/* TOP BAR */}
        <div className="flex items-center justify-between mb-6">

          {/* STREAMING */}
          <div className="flex items-center gap-4">

            <h2 className="text-2xl font-bold text-gray-800">

              Streaming

            </h2>

            <div className="flex items-center gap-3">

              <span className="font-semibold">

                Off

              </span>

              <div className="w-14 h-8 bg-pink-500 rounded-full flex items-center px-1">

                <div className="w-6 h-6 bg-white rounded-full ml-auto"></div>

              </div>

              <span className="font-semibold text-pink-600">

                On

              </span>

            </div>

          </div>

          {/* DATE */}
          <div className="text-gray-600 font-medium">

            As on 07-May-2026 15:39:59 IST

          </div>

        </div>

        {/* HEATMAP GRID */}
        <div className="grid grid-cols-4 gap-4">

          {heatmapData.map((item, index) => (

            <div
              key={index}
              className={`rounded-2xl p-5 text-white shadow-md hover:scale-[1.03] transition-all duration-300 ${
                item.positive

                  ? 'bg-gradient-to-r from-green-400 to-green-600'

                  : 'bg-gradient-to-r from-red-400 to-pink-500'
              }`}
            >

              <h2 className="font-bold text-lg mb-5">

                {item.name}

              </h2>

              <div className="flex items-end justify-between">

                <div>

                  <p className="text-2xl font-black">

                    {item.value}

                  </p>

                </div>

                <div className="text-lg font-bold">

                  {item.change}

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>

  )

}