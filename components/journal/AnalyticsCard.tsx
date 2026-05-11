interface AnalyticsCardProps {

  title: string;

  value: string | number;

  color: string;
}

export default function AnalyticsCard({

  title,

  value,

  color,

}: AnalyticsCardProps) {

  return (

    <div className="bg-white rounded-2xl p-5 border border-pink-100 shadow-md hover:shadow-xl transition">

      {/* TITLE */}

      <p className="text-zinc-500 text-sm">

        {title}

      </p>

      {/* VALUE */}

      <h2
        className={`text-3xl font-bold mt-2 ${color}`}
      >

        {value}

      </h2>

    </div>
  );
}