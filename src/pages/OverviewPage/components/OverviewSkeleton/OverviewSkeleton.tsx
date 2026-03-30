import { Skeleton } from '../../../../components/common';
import styles from './OverviewSkeleton.module.scss';

const OverviewSkeleton = () => {
  return (
    <div className={styles.container}>
      {/* Global stats skeleton */}
      <div className={styles.statsBar}>
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} width="120px" height="14px" />
        ))}
      </div>

      {/* Highlight cards skeleton */}
      <div className={styles.cardsGrid}>
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className={styles.card}>
            <div className={styles.cardHeader}>
              <Skeleton width="36px" height="36px" borderRadius="50%" />
              <div className={styles.cardHeaderText}>
                <Skeleton width="60px" height="12px" />
                <Skeleton width="100px" height="14px" />
              </div>
            </div>
            <div className={styles.cardBody}>
              <Skeleton width="120px" height="24px" />
              <Skeleton width="60px" height="16px" />
            </div>
          </div>
        ))}
      </div>

      {/* Trending skeleton */}
      <div className={styles.trendingSection}>
        <Skeleton width="120px" height="18px" />
        <div className={styles.trendingRow}>
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} width="110px" height="36px" borderRadius="12px" />
          ))}
        </div>
      </div>

      {/* Table skeleton */}
      <div className={styles.tableSection}>
        <div className={styles.tableHeader}>
          <Skeleton width="300px" height="18px" />
          <Skeleton width="80px" height="16px" />
        </div>
        <div className={styles.tableBody}>
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className={styles.tableRow}>
              <Skeleton width="24px" height="14px" />
              <Skeleton width="24px" height="24px" borderRadius="50%" />
              <Skeleton width="120px" height="14px" />
              <Skeleton width="80px" height="14px" />
              <Skeleton width="60px" height="14px" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OverviewSkeleton;
