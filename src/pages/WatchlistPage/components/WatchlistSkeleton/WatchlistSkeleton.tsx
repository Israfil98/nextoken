import { Skeleton } from '../../../../components/common';
import styles from './WatchlistSkeleton.module.scss';

const WatchlistSkeleton = () => {
  return (
    <div className={styles.container}>
      <Skeleton width="140px" height="22px" />
      <div className={styles.tableBody}>
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className={styles.row}>
            <Skeleton width="16px" height="16px" borderRadius="50%" />
            <Skeleton width="24px" height="14px" />
            <Skeleton width="24px" height="24px" borderRadius="50%" />
            <Skeleton width="100px" height="14px" />
            <Skeleton width="80px" height="14px" />
            <Skeleton width="60px" height="14px" />
            <Skeleton width="90px" height="14px" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default WatchlistSkeleton;
