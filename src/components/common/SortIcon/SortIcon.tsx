import { ChevronDown, ChevronsUpDown, ChevronUp } from 'lucide-react';
import type { TSortDirection } from '../../../types/table';
import styles from './SortIcon.module.scss';

interface ISortIconProps {
  active: boolean;
  direction: TSortDirection;
}

const SortIcon = ({ active, direction }: ISortIconProps) => {
  if (!active) {
    return <ChevronsUpDown size={14} className={styles.inactive} />;
  }

  return direction === 'asc' ? (
    <ChevronUp size={14} className={styles.active} />
  ) : (
    <ChevronDown size={14} className={styles.active} />
  );
};

export default SortIcon;
