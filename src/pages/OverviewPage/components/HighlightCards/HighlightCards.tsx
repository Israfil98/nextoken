import { useCoins } from '../../../../hooks/useCoinData';
import { formatPercentage, formatPrice } from '../../../../lib/formatters';
import type { ICoin } from '../../../../types/coin';
import styles from './HighlightCards.module.scss';

interface ICardData {
  label: string;
  coin: ICoin;
}

const HighlightCards = () => {
  const { data: coins, isLoading } = useCoins(1, 20);

  if (isLoading || !coins) return null;

  // Find top gainer and loser by 24h change
  const sorted = [...coins].sort(
    (a, b) =>
      (b.price_change_percentage_24h ?? 0) -
      (a.price_change_percentage_24h ?? 0),
  );

  const btc = coins.find((c) => c.id === 'bitcoin');
  const eth = coins.find((c) => c.id === 'ethereum');
  const topGainer = sorted[0];
  const topLoser = sorted[sorted.length - 1];

  // Guard against missing data
  if (!btc || !eth) return null;

  const cards: ICardData[] = [
    { label: 'Bitcoin', coin: btc },
    { label: 'Ethereum', coin: eth },
    { label: 'Top Gainer (24h)', coin: topGainer },
    { label: 'Top Loser (24h)', coin: topLoser },
  ];

  return (
    <div className={styles.grid}>
      {cards.map(({ label, coin }) => {
        const change = coin.price_change_percentage_24h;
        const isPositive = change !== null && change >= 0;

        return (
          <div key={coin.id} className={styles.card}>
            <div className={styles.cardHeader}>
              <img
                src={coin.image}
                alt={coin.name}
                className={styles.coinImage}
              />
              <div>
                <p className={styles.cardLabel}>{label}</p>
                <p className={styles.coinName}>
                  {coin.name}
                  <span className={styles.symbol}>
                    {coin.symbol.toUpperCase()}
                  </span>
                </p>
              </div>
            </div>
            <div className={styles.cardBody}>
              <p className={styles.price}>{formatPrice(coin.current_price)}</p>
              <p className={isPositive ? styles.gain : styles.loss}>
                {formatPercentage(change)}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default HighlightCards;
