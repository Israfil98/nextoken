import { Star } from 'lucide-react';
import { useNavigate } from 'react-router';
import { Sparkline, WatchlistButton } from '../../components/common';
import { useCoins } from '../../hooks/useCoinData';
import {
  formatLargeNumber,
  formatPercentage,
  formatPrice,
} from '../../lib/formatters';
import { useWatchlistStore } from '../../stores/watchlistStore';
import { WatchlistSkeleton } from './components/WatchlistSkeleton';
import styles from './WatchlistPage.module.scss';

const WatchlistPage = () => {
  const navigate = useNavigate();
  const { watchlist } = useWatchlistStore();
  const { data: coins, isLoading } = useCoins(1, 100);

  // Filter to only watched coins
  const watchedCoins =
    coins?.filter((coin) => watchlist.includes(coin.id)) ?? [];

  if (isLoading) return <WatchlistSkeleton />;

  if (watchlist.length === 0) {
    return (
      <div className={styles.empty}>
        <Star size={48} className={styles.emptyIcon} />
        <h2 className={styles.emptyTitle}>Your watchlist is empty</h2>
        <p className={styles.emptyText}>
          Click the star icon next to any coin to add it here.
        </p>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Watchlist</h1>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.thStar}></th>
              <th>#</th>
              <th>Name</th>
              <th className={styles.thRight}>Price</th>
              <th className={styles.thRight}>24h %</th>
              <th className={`${styles.thRight} ${styles.hideMd}`}>7d %</th>
              <th className={`${styles.thRight} ${styles.hideSm}`}>
                Market Cap
              </th>
              <th className={`${styles.thRight} ${styles.hideLg}`}>
                Last 7 Days
              </th>
            </tr>
          </thead>
          <tbody>
            {watchedCoins.map((coin) => {
              const change24h = coin.price_change_percentage_24h;
              const change7d = coin.price_change_percentage_7d_in_currency;

              return (
                <tr
                  key={coin.id}
                  className={styles.row}
                  onClick={() => navigate(`/coins/${coin.id}`)}
                  style={{ cursor: 'pointer' }}
                >
                  <td className={styles.star}>
                    <WatchlistButton coinId={coin.id} />
                  </td>
                  <td className={styles.rank}>{coin.market_cap_rank}</td>
                  <td>
                    <div className={styles.nameCell}>
                      <img
                        src={coin.image}
                        alt={coin.name}
                        className={styles.coinImage}
                      />
                      <span className={styles.coinName}>{coin.name}</span>
                      <span className={styles.symbol}>
                        {coin.symbol.toUpperCase()}
                      </span>
                    </div>
                  </td>
                  <td className={styles.right}>
                    {formatPrice(coin.current_price)}
                  </td>
                  <td
                    className={`${styles.right} ${change24h !== null && change24h >= 0 ? styles.gain : styles.loss}`}
                  >
                    {formatPercentage(change24h)}
                  </td>
                  <td
                    className={`${styles.right} ${styles.hideMd} ${change7d !== null && change7d >= 0 ? styles.gain : styles.loss}`}
                  >
                    {formatPercentage(change7d)}
                  </td>
                  <td className={`${styles.right} ${styles.hideSm}`}>
                    {formatLargeNumber(coin.market_cap)}
                  </td>
                  <td className={`${styles.right} ${styles.hideLg}`}>
                    <Sparkline
                      data={coin.sparkline_in_7d.price}
                      positive={change7d !== null && change7d >= 0}
                    />
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

export default WatchlistPage;
