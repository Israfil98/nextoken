import { Star } from 'lucide-react';
import { useWatchlistStore } from '../../../stores/watchlistStore';
import styles from './WatchlistButton.module.scss';

interface IWatchlistButtonProps {
  coinId: string;
}

const WatchlistButton = ({ coinId }: IWatchlistButtonProps) => {
  const { toggleCoin, isWatched } = useWatchlistStore();
  const watched = isWatched(coinId);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleCoin(coinId);
  };

  return (
    <button
      className={`${styles.btn} ${watched ? styles.active : ''}`}
      onClick={handleClick}
      aria-label={watched ? 'Remove from watchlist' : 'Add to watchlist'}
    >
      <Star size={16} fill={watched ? 'currentColor' : 'none'} />
    </button>
  );
};

export default WatchlistButton;
