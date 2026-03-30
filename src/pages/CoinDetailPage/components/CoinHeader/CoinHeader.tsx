import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router';
import { WatchlistButton } from '../../../../components/common';
import { formatPercentage, formatPrice } from '../../../../lib/formatters';
import type { ICoinDetail } from '../../../../types/coin';
import styles from './CoinHeader.module.scss';

interface ICoinHeaderProps {
  coin: ICoinDetail;
}

const CoinHeader = ({ coin }: ICoinHeaderProps) => {
  const { market_data } = coin;
  const price = market_data.current_price.usd;
  const change24h = market_data.price_change_percentage_24h;
  const isPositive = change24h >= 0;

  return (
    <div className={styles.header}>
      <Link to="/coins" className={styles.backLink}>
        <ArrowLeft size={18} />
        <span>Back</span>
      </Link>

      <div className={styles.coinInfo}>
        <img
          src={coin.image.large}
          alt={coin.name}
          className={styles.coinImage}
        />
        <div>
          <div className={styles.nameRow}>
            <h1 className={styles.name}>{coin.name}</h1>
            <span className={styles.symbol}>{coin.symbol.toUpperCase()}</span>
            <span className={styles.rank}>#{coin.market_cap_rank}</span>
            <WatchlistButton coinId={coin.id} />
          </div>
          <div className={styles.priceRow}>
            <span className={styles.price}>{formatPrice(price)}</span>
            <span className={isPositive ? styles.gain : styles.loss}>
              {formatPercentage(change24h)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoinHeader;
