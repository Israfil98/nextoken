import { Sparkline } from '../../../../components/common';
import {
  formatLargeNumber,
  formatPercentage,
  formatPrice,
} from '../../../../lib/formatters';
import type { ICoin } from '../../../../types/coin';
import styles from './CoinRow.module.scss';

interface ICoinRowProps {
  coin: ICoin;
}

const CoinRow = ({ coin }: ICoinRowProps) => {
  const change1h = coin.price_change_percentage_1h_in_currency;
  const change24h = coin.price_change_percentage_24h;
  const change7d = coin.price_change_percentage_7d_in_currency;

  return (
    <tr className={styles.row}>
      <td className={styles.rank}>{coin.market_cap_rank}</td>
      <td>
        <div className={styles.nameCell}>
          <img src={coin.image} alt={coin.name} className={styles.coinImage} />
          <span className={styles.coinName}>{coin.name}</span>
          <span className={styles.symbol}>{coin.symbol.toUpperCase()}</span>
        </div>
      </td>
      <td className={styles.right}>{formatPrice(coin.current_price)}</td>
      <td
        className={`${styles.right} ${styles.hideLg} ${change1h !== null && change1h >= 0 ? styles.gain : styles.loss}`}
      >
        {formatPercentage(change1h)}
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
        {formatLargeNumber(coin.total_volume)}
      </td>
      <td className={`${styles.right} ${styles.hideXl}`}>
        <Sparkline
          data={coin.sparkline_in_7d.price}
          positive={change7d !== null && change7d >= 0}
        />
      </td>
    </tr>
  );
};

export default CoinRow;
