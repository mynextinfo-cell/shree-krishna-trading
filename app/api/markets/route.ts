import { NextResponse } from 'next/server'

const symbols = [
  '^NSEI',        // NIFTY 50
  '^NSEBANK',    // BANKNIFTY
  'RELIANCE.NS',
  'TCS.NS',
  'INFY.NS',
  'HDFCBANK.NS',
]

export async function GET() {

  try {

    const url =
      `https://query1.finance.yahoo.com/v7/finance/quote?symbols=${symbols.join(',')}`

    const response =
      await fetch(url, {
        cache: 'no-store',
      })

    const data =
      await response.json()

    const results =
      data.quoteResponse.result

    const formattedData =
      results.map((item: any) => ({

        symbol:
          item.symbol,

        name:
          item.shortName,

        price:
          item.regularMarketPrice,

        change:
          item.regularMarketChangePercent,

        high:
          item.regularMarketDayHigh,

        low:
          item.regularMarketDayLow,

        open:
          item.regularMarketOpen,

        previousClose:
          item.regularMarketPreviousClose,

      }))

    return NextResponse.json({
      success: true,
      data: formattedData,
    })

  } catch (error) {

    return NextResponse.json({

      success: false,

      message:
        'Failed to fetch market data',

    })

  }

}