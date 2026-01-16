
export type Currency = 'USD' | 'BDT';
export type TradeMode = 'BUY' | 'SELL';

export interface ExchangeRates {
  USD: {
    BUY: number;
    SELL: number;
  };
  BDT: {
    BUY: number;
    SELL: number;
  };
}

export interface InsightData {
  summary: string;
  recommendation: string;
  marketStatus: 'BULLISH' | 'BEARISH' | 'NEUTRAL';
}
