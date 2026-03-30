import {
  formatLargeNumber,
  formatPercentage,
  formatPrice,
  formatSupply,
} from '../../../../lib/formatters';
import type { ICoinDetail } from '../../../../types/coin';
import styles from './StatsGrid.module.scss';

interface IStatsGridProps {
  coin: ICoinDetail;
}

interface IStat {
  label: string;
  value: string;
  subValue?: string;
}

const StatsGrid = ({ coin }: IStatsGridProps) => {
  const { market_data } = coin;

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const stats: IStat[] = [
    {
      label: 'Market Cap',
      value: formatLargeNumber(market_data.market_cap.usd),
    },
    {
      label: '24h Volume',
      value: formatLargeNumber(market_data.total_volume.usd),
    },
    {
      label: 'Circulating Supply',
      value: formatSupply(market_data.circulating_supply),
      subValue: coin.symbol.toUpperCase(),
    },
    {
      label: 'Total Supply',
      value: market_data.total_supply
        ? formatSupply(market_data.total_supply)
        : '∞',
      subValue: market_data.total_supply
        ? coin.symbol.toUpperCase()
        : undefined,
    },
    {
      label: 'Max Supply',
      value: market_data.max_supply
        ? formatSupply(market_data.max_supply)
        : '∞',
      subValue: market_data.max_supply ? coin.symbol.toUpperCase() : undefined,
    },
    {
      label: 'All-Time High',
      value: formatPrice(market_data.ath.usd),
      subValue: `${formatPercentage(market_data.ath_change_percentage.usd)} · ${formatDate(market_data.ath_date.usd)}`,
    },
    {
      label: 'All-Time Low',
      value: formatPrice(market_data.atl.usd),
      subValue: `${formatPercentage(market_data.atl_change_percentage.usd)} · ${formatDate(market_data.atl_date.usd)}`,
    },
    {
      label: '7d Change',
      value: formatPercentage(market_data.price_change_percentage_7d),
    },
    {
      label: '30d Change',
      value: formatPercentage(market_data.price_change_percentage_30d),
    },
  ];

  return (
    <div className={styles.grid}>
      {stats.map(({ label, value, subValue }) => (
        <div key={label} className={styles.card}>
          <p className={styles.label}>{label}</p>
          <p className={styles.value}>{value}</p>
          {subValue && <p className={styles.subValue}>{subValue}</p>}
        </div>
      ))}
    </div>
  );
};

export default StatsGrid;
