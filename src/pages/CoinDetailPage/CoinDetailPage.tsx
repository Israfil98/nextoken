import { useParams } from 'react-router';
import { useCoinDetail } from '../../hooks/useCoinData';
import styles from './CoinDetailPage.module.scss';
import { CoinHeader } from './components/CoinHeader';
import { PriceChart } from './components/PriceChart';
import { StatsGrid } from './components/StatsGrid';

const CoinDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: coin, isLoading, error } = useCoinDetail(id ?? '');

  if (isLoading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (error || !coin) {
    return (
      <div className={styles.error}>
        <p>Failed to load coin data. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <CoinHeader coin={coin} />
      <PriceChart coinId={coin.id} />
      <StatsGrid coin={coin} />
    </div>
  );
};

export default CoinDetailPage;
