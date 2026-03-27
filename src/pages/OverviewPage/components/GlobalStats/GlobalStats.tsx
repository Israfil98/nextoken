import { useGlobalData } from '../../../../hooks/useCoinData';
import { formatLargeNumber } from '../../../../lib/formatters';
import styles from './GlobalStats.module.scss';

const GlobalStats = () => {
  const { data, isLoading } = useGlobalData();

  if (isLoading || !data) return null;

  const {
    active_cryptocurrencies,
    total_market_cap,
    total_volume,
    market_cap_percentage,
    market_cap_change_percentage_24h_usd,
  } = data.data;

  const marketCapChange = market_cap_change_percentage_24h_usd;
  const isPositive = marketCapChange >= 0;

  return (
    <div className={styles.bar}>
      <span className={styles.stat}>
        Cryptos: <strong>{active_cryptocurrencies.toLocaleString()}</strong>
      </span>
      <span className={styles.stat}>
        Market Cap: <strong>{formatLargeNumber(total_market_cap.usd)}</strong>
        <span className={isPositive ? styles.gain : styles.loss}>
          {isPositive ? ' +' : ' '}
          {marketCapChange.toFixed(2)}%
        </span>
      </span>
      <span className={styles.stat}>
        24h Vol: <strong>{formatLargeNumber(total_volume.usd)}</strong>
      </span>
      <span className={styles.stat}>
        BTC: <strong>{market_cap_percentage.btc.toFixed(1)}%</strong>
      </span>
      <span className={styles.stat}>
        ETH: <strong>{market_cap_percentage.eth.toFixed(1)}%</strong>
      </span>
    </div>
  );
};

export default GlobalStats;
