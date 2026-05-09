import yahooFinance from "yahoo-finance2";

export async function getMarketData() {

  try {

    // FETCH DATA
    const nifty: any =
      await yahooFinance.quote("^NSEI");

    const banknifty: any =
      await yahooFinance.quote("^NSEBANK");

    const sensex: any =
      await yahooFinance.quote("^BSESN");

    const bitcoin: any =
      await yahooFinance.quote("BTC-USD");

    // RETURN FORMATTED DATA
    return [

      {
        name: "NIFTY 50",

        value: Number(
          nifty?.regularMarketPrice || 0
        ).toFixed(2),

        change: Number(
          nifty?.regularMarketChangePercent || 0
        ).toFixed(2),
      },

      {
        name: "BANK NIFTY",

        value: Number(
          banknifty?.regularMarketPrice || 0
        ).toFixed(2),

        change: Number(
          banknifty?.regularMarketChangePercent || 0
        ).toFixed(2),
      },

      {
        name: "SENSEX",

        value: Number(
          sensex?.regularMarketPrice || 0
        ).toFixed(2),

        change: Number(
          sensex?.regularMarketChangePercent || 0
        ).toFixed(2),
      },

      {
        name: "BITCOIN",

        value: Number(
          bitcoin?.regularMarketPrice || 0
        ).toFixed(2),

        change: Number(
          bitcoin?.regularMarketChangePercent || 0
        ).toFixed(2),
      },

    ];

  } catch (error) {

    console.log(error);

    return [

      {
        name: "NIFTY 50",
        value: "0.00",
        change: "0.00",
      },

      {
        name: "BANK NIFTY",
        value: "0.00",
        change: "0.00",
      },

      {
        name: "SENSEX",
        value: "0.00",
        change: "0.00",
      },

      {
        name: "BITCOIN",
        value: "0.00",
        change: "0.00",
      },

    ];
  }
}