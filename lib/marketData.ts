import yahooFinance from 'yahoo-finance2'

export async function getMarketData() {

  try {

    const nifty = await yahooFinance.quote('^NSEI')

    const banknifty = await yahooFinance.quote('^NSEBANK')

    const sensex = await yahooFinance.quote('^BSESN')

    return [

      {
        name: 'NIFTY 50',

        value: nifty.regularMarketPrice?.toFixed(2),

        change:
          nifty.regularMarketChangePercent?.toFixed(2),

        positive:
          (nifty.regularMarketChangePercent || 0) > 0,
      },

      {
        name: 'BANKNIFTY',

        value:
          banknifty.regularMarketPrice?.toFixed(2),

        change:
          banknifty.regularMarketChangePercent?.toFixed(2),

        positive:
          (banknifty.regularMarketChangePercent || 0) > 0,
      },

      {
        name: 'SENSEX',

        value:
          sensex.regularMarketPrice?.toFixed(2),

        change:
          sensex.regularMarketChangePercent?.toFixed(2),

        positive:
          (sensex.regularMarketChangePercent || 0) > 0,
      },

    ]

  } catch (error) {

    console.error(error)

    return []

  }

}