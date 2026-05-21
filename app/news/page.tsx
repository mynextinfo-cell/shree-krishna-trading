"use client";

import Sidebar from "@/components/Sidebar";

export default function NewsPage() {

  const news = [

    {
      title: "NIFTY hits fresh all-time high amid strong buying",
      source: "Economic Times",
      time: "10 mins ago",
    },

    {
      title: "US markets rally after strong tech earnings",
      source: "Bloomberg",
      time: "25 mins ago",
    },

    {
      title: "Reliance announces new green energy investment",
      source: "Moneycontrol",
      time: "1 hour ago",
    },

    {
      title: "Bitcoin crosses $75,000 as crypto market surges",
      source: "CNBC",
      time: "2 hours ago",
    },

    {
      title: "FIIs continue aggressive buying in Indian equities",
      source: "Business Standard",
      time: "3 hours ago",
    },
  ];

  return (

    <div className="flex min-h-screen bg-[#f9f5ff]">

      {/* SIDEBAR */}

      <Sidebar />

      {/* MAIN CONTENT */}

      <main className="flex-1 p-6 overflow-y-auto">

        {/* HEADER */}

        <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl p-8 shadow-xl mb-6">

          <h1 className="text-4xl font-bold text-white">

            Market News

          </h1>

          <p className="text-white/90 text-lg mt-3">

            Latest updates from stock market, economy and global finance.

          </p>

        </div>

        {/* TOP NEWS CARD */}

        <div className="bg-white rounded-3xl shadow-lg border border-purple-100 p-8 mb-6">

          <p className="text-purple-500 font-semibold mb-3">

            TOP STORY

          </p>

          <h2 className="text-3xl font-bold text-zinc-800 leading-snug">

            Indian stock market sees record inflows as investors remain bullish on banking and technology sectors.

          </h2>

          <p className="text-zinc-500 mt-4 text-lg">

            Analysts expect strong momentum to continue in upcoming sessions with positive global cues.

          </p>

        </div>

        {/* NEWS LIST */}

        <div className="space-y-4">

          {news.map((item, index) => (

            <div
              key={index}
              className="bg-white rounded-2xl shadow-md border border-purple-100 p-6 hover:shadow-lg transition"
            >

              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

                <div>

                  <h2 className="text-xl font-bold text-zinc-800">

                    {item.title}

                  </h2>

                  <p className="text-zinc-500 mt-2">

                    {item.source}

                  </p>

                </div>

                <div>

                  <span className="bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-semibold">

                    {item.time}

                  </span>

                </div>

              </div>

            </div>
          ))}

        </div>

      </main>

    </div>
  );
}