import { TrendingUp } from 'lucide-react';
import { useTrendingCoins } from '../../../../hooks/useCoinData';
import styles from './TrendingCoins.module.scss';

const TrendingCoins = () => {
  const { data, isLoading } = useTrendingCoins();

  if (isLoading || !data) return null;

  // CoinGecko returns up to 15 trending coins, take the top 7
  const trending = data.coins.slice(0, 7);

  return (
    <div className={styles.section}>
      <div className={styles.header}>
        <TrendingUp size={18} className={styles.headerIcon} />
        <h2 className={styles.title}>Trending</h2>
      </div>
      <div className={styles.row}>
        {trending.map(({ item }) => {
          const change = item.data?.price_change_percentage_24h?.usd;
          const isPositive = change !== undefined && change >= 0;

          return (
            <div key={item.id} className={styles.chip}>
              <img
                src={item.thumb}
                alt={item.name}
                className={styles.chipImage}
              />
              <span className={styles.chipName}>
                {item.symbol.toUpperCase()}
              </span>
              {change !== undefined && (
                <span className={isPositive ? styles.gain : styles.loss}>
                  {isPositive ? '+' : ''}
                  {change.toFixed(1)}%
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TrendingCoins;
