export interface Trade {

  id?: string;

  created_at?: string;

  date: string;

  symbol: string;

  tradeType: string;

  entryPrice: number;

  exitPrice: number;

  quantity: number;

  brokerage: number;

  notes: string;

  grossPnL: number;

  netPnL: number;
}