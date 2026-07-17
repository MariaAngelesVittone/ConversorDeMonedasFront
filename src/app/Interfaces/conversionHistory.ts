export interface ConversionHistoryItem {
  id: number;
  userId: number;
  fromCurrencyCode: number;
  toCurrencyCode: number;
  fromCurrencyLeyend: string;
  toCurrencyLeyend: string;
  amount: number;
  result: number;
  date: string;
}
