import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router';
import { useCoins } from '../../../../hooks/useCoinData';
import {
  formatLargeNumber,
  formatPercentage,
  formatPrice,
} from '../../../../lib/formatters';
import styles from './CoinsTable.module.scss';

const CoinsTable = () => {
  const { data: coins, isLoading } = useCoins(1, 10);

  if (isLoading || !coins) return null;

  return (
    <div className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>Top Cryptocurrencies by Market Cap</h2>
        <Link to="/coins" className={styles.viewAll}>
          View all <ArrowRight size={16} />
        </Link>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.thRank}>#</th>
              <th className={styles.thName}>Name</th>
              <th className={styles.thRight}>Price</th>
              <th className={styles.thRight}>24h %</th>
              <th className={`${styles.thRight} ${styles.hideMd}`}>7d %</th>
              <th className={`${styles.thRight} ${styles.hideSm}`}>
                Market Cap
              </th>
            </tr>
          </thead>
          <tbody>
            {coins.map((coin) => {
              const change24h = coin.price_change_percentage_24h;
              const change7d = coin.price_change_percentage_7d_in_currency;
              const is24hPositive = change24h !== null && change24h >= 0;
              const is7dPositive = change7d !== null && change7d >= 0;

              return (
                <tr key={coin.id} className={styles.row}>
                  <td className={styles.rank}>{coin.market_cap_rank}</td>
                  <td className={styles.name}>
                    <img
                      src={coin.image}
                      alt={coin.name}
                      className={styles.coinImage}
                    />
                    <span className={styles.coinName}>{coin.name}</span>
                    <span className={styles.symbol}>
                      {coin.symbol.toUpperCase()}
                    </span>
                  </td>
                  <td className={styles.right}>
                    {formatPrice(coin.current_price)}
                  </td>
                  <td
                    className={`${styles.right} ${is24hPositive ? styles.gain : styles.loss}`}
                  >
                    {formatPercentage(change24h)}
                  </td>
                  <td
                    className={`${styles.right} ${styles.hideMd} ${is7dPositive ? styles.gain : styles.loss}`}
                  >
                    {formatPercentage(change7d)}
                  </td>
                  <td className={`${styles.right} ${styles.hideSm}`}>
                    {formatLargeNumber(coin.market_cap)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CoinsTable;
