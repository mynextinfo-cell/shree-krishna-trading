"use client";

import { useEffect, useState } from "react";

export default function MarketNews() {

  const [news, setNews] = useState<any[]>([]);

  useEffect(() => {

    fetchNews();

  }, []);

  const fetchNews = async () => {

    try {

      const response =
        await fetch("/api/news");

      const data = await response.json();

      setNews(data);

    } catch (error) {

      console.log(error);
    }
  };

  return (

    <div className="bg-[#050816] border border-zinc-900 rounded-3xl p-6 md:p-8 mt-14">

      <div className="flex items-center justify-between mb-8">

        <h2 className="text-3xl font-bold">
          Market News
        </h2>

        <button
          onClick={fetchNews}
          className="bg-violet-600 hover:bg-violet-700 transition px-5 py-3 rounded-2xl"
        >
          Refresh
        </button>

      </div>

      <div className="space-y-6">

        {news.map((item, index) => (

          <a
            key={index}
            href={item.link}
            target="_blank"
            className="block bg-[#07122b] border border-zinc-800 rounded-2xl p-5 hover:border-violet-500 transition"
          >

            <h3 className="text-xl font-semibold">
              {item.title}
            </h3>

            <p className="text-zinc-400 mt-3">
              {item.source}
            </p>

          </a>
        ))}

      </div>

    </div>
  );
}