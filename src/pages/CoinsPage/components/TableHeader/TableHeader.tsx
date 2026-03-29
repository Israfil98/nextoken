import { SortIcon } from '../../../../components/common';
import type { ISortConfig } from '../../../../types/table';
import styles from './TableHeader.module.scss';

interface IColumn {
  key: string;
  label: string;
  sortable: boolean;
  className: string;
}

interface ITableHeaderProps {
  columns: readonly IColumn[];
  sortConfig: ISortConfig;
  onSort: (key: string) => void;
}

const TableHeader = ({ columns, sortConfig, onSort }: ITableHeaderProps) => {
  const getCellClass = (className: string) => {
    return className
      .split(' ')
      .map((cls) => styles[cls])
      .filter(Boolean)
      .join(' ');
  };

  return (
    <thead>
      <tr>
        {columns.map(({ key, label, sortable, className }) => (
          <th
            key={key}
            className={`${getCellClass(className)} ${sortable ? styles.sortable : ''}`}
            onClick={sortable ? () => onSort(key) : undefined}
          >
            <span className={styles.thContent}>
              {label}
              {sortable && (
                <SortIcon
                  active={sortConfig.key === key}
                  direction={sortConfig.direction}
                />
              )}
            </span>
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
