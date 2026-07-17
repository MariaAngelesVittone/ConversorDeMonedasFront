export interface ConversionHistoryItem {
  id: number;
  userId: number;
  fromCurrencyCode: number;
  toCurrencyCode: number;
  amount: number;
  result: number;
  date: string;
}
