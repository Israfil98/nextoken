import { Skeleton } from '../../../../components/common';
import styles from './CoinDetailSkeleton.module.scss';

const CoinDetailSkeleton = () => {
  return (
    <div className={styles.container}>
      {/* Back link */}
      <Skeleton width="60px" height="14px" />

      {/* Header */}
      <div className={styles.header}>
        <Skeleton width="56px" height="56px" borderRadius="50%" />
        <div className={styles.headerText}>
          <div className={styles.nameRow}>
            <Skeleton width="160px" height="24px" />
            <Skeleton width="50px" height="20px" />
            <Skeleton width="40px" height="22px" borderRadius="4px" />
          </div>
          <div className={styles.priceRow}>
            <Skeleton width="180px" height="28px" />
            <Skeleton width="80px" height="20px" />
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className={styles.chart}>
        <div className={styles.rangeButtons}>
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} width="48px" height="32px" borderRadius="8px" />
          ))}
        </div>
        <Skeleton width="100%" height="400px" borderRadius="8px" />
      </div>

      {/* Stats grid */}
      <div className={styles.statsGrid}>
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} className={styles.statCard}>
            <Skeleton width="100px" height="12px" />
            <Skeleton width="140px" height="18px" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoinDetailSkeleton;
