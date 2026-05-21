export default function StatsCards() {

  const stats = [

    {
      title: "Total P&L",
      value: "₹1,25,450",
      change: "+12.5%",
      color: "text-green-500",
    },

    {
      title: "Win Rate",
      value: "68%",
      change: "+4.2%",
      color: "text-blue-500",
    },

    {
      title: "Total Trades",
      value: "245",
      change: "+18",
      color: "text-purple-500",
    },

    {
      title: "Best Trade",
      value: "₹24,500",
      change: "+9.8%",
      color: "text-orange-500",
    },
  ];

  return (

    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">

      {stats.map((stat) => (

        <div
          key={stat.title}
          className="bg-[#fff1f7] rounded-2xl p-4 shadow-md border border-pink-100 hover:shadow-lg transition-all duration-300"
        >

          {/* TITLE */}

          <p className="text-zinc-500 text-xs font-medium">

            {stat.title}

          </p>

          {/* VALUE */}

          <h2 className="text-xl md:text-2xl font-bold text-zinc-800 mt-2">

            {stat.value}

          </h2>

          {/* CHANGE */}

          <p className={`${stat.color} text-sm font-semibold mt-1`}>

            {stat.change}

          </p>

        </div>
      ))}

    </div>
  );
}