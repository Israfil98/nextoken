import { useState } from 'react';
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { chartRanges } from '../../../../data/chartRanges';
import { useCoinChart } from '../../../../hooks/useCoinData';
import { formatPrice } from '../../../../lib/formatters';
import styles from './PriceChart.module.scss';

interface IPriceChartProps {
  coinId: string;
}

const PriceChart = ({ coinId }: IPriceChartProps) => {
  const [days, setDays] = useState(7);
  const { data, isLoading } = useCoinChart(coinId, days);

  // Transform [timestamp, price] pairs into chart-friendly objects
  const chartData =
    data?.prices.map(([timestamp, price]) => ({
      date: timestamp,
      price,
    })) ?? [];

  // Determine if the price went up or down over the selected range
  const isPositive =
    chartData.length >= 2 &&
    chartData[chartData.length - 1].price >= chartData[0].price;

  const chartColor = isPositive ? 'var(--color-gain)' : 'var(--color-loss)';

  // Format x-axis labels based on the time range
  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    if (days <= 1) {
      return date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
      });
    }
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  // Format tooltip date with more detail
  const formatTooltipDate = (timestamp: number) => {
    const date = new Date(timestamp);
    if (days <= 1) {
      return date.toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    }
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.rangeButtons}>
        {chartRanges.map(({ label, days: d }) => (
          <button
            key={d}
            className={`${styles.rangeBtn} ${days === d ? styles.active : ''}`}
            onClick={() => setDays(d)}
          >
            {label}
          </button>
        ))}
      </div>

      <div className={styles.chart}>
        {isLoading ? (
          <div className={styles.loading}>Loading chart...</div>
        ) : (
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={chartColor} stopOpacity={0.2} />
                  <stop offset="100%" stopColor={chartColor} stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="date"
                tickFormatter={formatDate}
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: 'var(--text-tertiary)' }}
                minTickGap={40}
              />
              <YAxis
                domain={['auto', 'auto']}
                tickFormatter={(val: number) => formatPrice(val)}
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: 'var(--text-tertiary)' }}
                width={80}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--bg-primary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '8px',
                  fontSize: '13px',
                }}
                labelFormatter={(label) => formatTooltipDate(label as number)}
                formatter={(value) => [formatPrice(value as number), 'Price']}
              />
              <Area
                type="monotone"
                dataKey="price"
                stroke={chartColor}
                strokeWidth={2}
                fill="url(#priceGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default PriceChart;
