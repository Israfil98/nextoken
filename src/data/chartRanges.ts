export interface IChartRange {
  label: string;
  days: number;
}

export const chartRanges: IChartRange[] = [
  { label: '24h', days: 1 },
  { label: '7d', days: 7 },
  { label: '30d', days: 30 },
  { label: '90d', days: 90 },
  { label: '1y', days: 365 },
];
