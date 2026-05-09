import { NextResponse } from 'next/server'

export async function GET() {

  try {

    const response = await fetch(

      'https://newsapi.org/v2/top-headlines?category=business&country=in&apiKey=603d7bd090c4435eab6cb9b24e31096d',

      {
        cache: 'no-store',
      }

    )

    const data =
      await response.json()

    return NextResponse.json({

      success: true,

      articles:
        data.articles || [],

    })

  } catch (error) {

    console.log(error)

    return NextResponse.json({

      success: false,

      articles: [],

      message:
        'Failed to fetch news',

    })

  }

}