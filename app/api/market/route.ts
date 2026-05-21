export async function GET() {

  const randomChange = () => {

    return Number(

      (
        Math.random() * 2 - 1
      ).toFixed(2)
    );
  };

  const randomPrice = (

    base: number
  ) => {

    return Number(

      (
        base +

        Math.random() * 100
      ).toFixed(2)
    );
  };

  const data = [

    {
      symbol: "NIFTY",
      price: randomPrice(
        24800
      ),
      change:
        randomChange(),
    },

    {
      symbol: "BANKNIFTY",
      price: randomPrice(
        55200
      ),
      change:
        randomChange(),
    },

    {
      symbol: "SENSEX",
      price: randomPrice(
        81700
      ),
      change:
        randomChange(),
    },

    {
      symbol: "RELIANCE",
      price: randomPrice(
        2950
      ),
      change:
        randomChange(),
    },

    {
      symbol: "TCS",
      price: randomPrice(
        3890
      ),
      change:
        randomChange(),
    },

    {
      symbol: "INFY",
      price: randomPrice(
        1620
      ),
      change:
        randomChange(),
    },

    {
      symbol: "DOW",
      price: randomPrice(
        42100
      ),
      change:
        randomChange(),
    },

    {
      symbol: "NASDAQ",
      price: randomPrice(
        18600
      ),
      change:
        randomChange(),
    },

    {
      symbol: "AAPL",
      price: randomPrice(
        214
      ),
      change:
        randomChange(),
    },

    {
      symbol: "TSLA",
      price: randomPrice(
        348
      ),
      change:
        randomChange(),
    },

    {
      symbol: "NVDA",
      price: randomPrice(
        135
      ),
      change:
        randomChange(),
    },

    {
      symbol: "MSFT",
      price: randomPrice(
        468
      ),
      change:
        randomChange(),
    },
  ];

  return Response.json(
    data
  );
}