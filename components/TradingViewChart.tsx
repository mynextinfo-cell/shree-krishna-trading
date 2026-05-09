'use client'

import {
  AdvancedRealTimeChart,
} from 'react-ts-tradingview-widgets'

export default function TradingViewChart() {

  return (

    <div className="rounded-3xl overflow-hidden shadow-lg border border-pink-100">

      <AdvancedRealTimeChart
        theme="light"
        symbol="NSE:NIFTY"
        width="100%"
        height={650}
        locale="en"
        toolbar_bg="#ffffff"
        enable_publishing={false}
        hide_top_toolbar={false}
        hide_side_toolbar={false}
        allow_symbol_change={true}
      />

    </div>

  )

}