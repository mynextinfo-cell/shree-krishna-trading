import YahooFinance from 'yahoo-finance2'
import { NextResponse } from 'next/server'

// Create Instance
const yahooFinance = new YahooFinance()

export async function GET(req: Request) {

  try {

    const { searchParams } = new URL(req.url)

    const symbol = searchParams.get('symbol')

    if (!symbol) {

      return NextResponse.json({

        error: 'Stock symbol required'

      })

    }

    // NSE Format
    const stock = `${symbol}.NS`

    // Fetch Data
    const result = await yahooFinance.quote(stock)

    return NextResponse.json({

      symbol: result.symbol,
      name: result.shortName,
      price: result.regularMarketPrice,
      change: result.regularMarketChange,
      percent:
        result.regularMarketChangePercent

    })

  } catch (err: any) {

    console.log(err)

    return NextResponse.json({

      error: err.message

    })

  }

}