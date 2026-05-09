'use client'

import {
  useEffect,
  useState,
} from 'react'

import {
  Newspaper,
  ExternalLink,
} from 'lucide-react'

type Article = {
  title: string
  description: string
  url: string
  urlToImage: string
  source: {
    name: string
  }
  publishedAt: string
}

export default function NewsPage() {

  const [articles, setArticles] =
    useState<Article[]>([])

  const [loading, setLoading] =
    useState(true)

  useEffect(() => {

    const fetchNews =
      async () => {

        try {

          const response =
            await fetch(
              '/api/news'
            )

          const result =
            await response.json()

          if (
            result.success &&
            result.articles
          ) {

            setArticles(
              result.articles
            )

          } else {

            setArticles([])

          }

        } catch (error) {

          console.log(error)

          setArticles([])

        }

        setLoading(false)

      }

    fetchNews()

  }, [])

  return (

    <div className="min-h-screen bg-[#fff7fa] p-8">

      {/* HEADER */}
      <div className="flex items-center gap-5 mb-10">

        <div className="bg-white p-5 rounded-3xl shadow-md border border-pink-100">

          <Newspaper
            className="text-pink-600"
            size={42}
          />

        </div>

        <div>

          <h1 className="text-6xl font-black text-pink-700">

            Market News

          </h1>

          <p className="text-pink-500 text-2xl mt-2">

            Live Financial Headlines

          </p>

        </div>

      </div>

      {/* LOADING */}
      {loading ? (

        <div className="bg-white rounded-3xl p-10 shadow-md border border-pink-100 text-center text-2xl">

          Loading latest market news...

        </div>

      ) : (

        <div className="grid grid-cols-2 gap-8">

          {articles.length > 0 ? (

            articles.map(
              (
                article,
                index
              ) => (

                <div
                  key={index}
                  className="bg-white rounded-3xl overflow-hidden shadow-md border border-pink-100"
                >

                  {/* IMAGE */}
                  {article.urlToImage ? (

                    <img
                      src={
                        article.urlToImage
                      }
                      alt="news"
                      className="w-full h-[260px] object-cover"
                    />

                  ) : (

                    <div className="w-full h-[260px] bg-pink-100 flex items-center justify-center">

                      <Newspaper
                        className="text-pink-500"
                        size={80}
                      />

                    </div>

                  )}

                  {/* CONTENT */}
                  <div className="p-8">

                    <div className="flex items-center justify-between">

                      <p className="text-pink-600 font-bold text-lg">

                        {
                          article.source
                            ?.name
                        }

                      </p>

                      <p className="text-gray-500 text-sm">

                        {new Date(
                          article.publishedAt
                        ).toLocaleDateString()}

                      </p>

                    </div>

                    <h2 className="text-3xl font-black text-gray-800 mt-5 leading-snug">

                      {article.title}

                    </h2>

                    <p className="text-gray-600 text-lg mt-5 leading-relaxed">

                      {
                        article.description
                      }

                    </p>

                    {/* BUTTON */}
                    <a
                      href={article.url}
                      target="_blank"
                      className="mt-8 inline-flex items-center gap-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white px-6 py-4 rounded-2xl font-bold text-lg shadow-lg"
                    >

                      Read Full News

                      <ExternalLink
                        size={20}
                      />

                    </a>

                  </div>

                </div>

              )
            )

          ) : (

            <div className="col-span-2 bg-white rounded-3xl p-10 shadow-md border border-pink-100 text-center">

              <h2 className="text-3xl font-black text-gray-700">

                No News Available

              </h2>

              <p className="text-gray-500 mt-4 text-lg">

                Check your News API key or internet connection.

              </p>

            </div>

          )}

        </div>

      )}

    </div>

  )

}