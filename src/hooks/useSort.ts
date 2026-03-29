import { useMemo, useState } from 'react';
import type { ISortConfig, TSortDirection } from '../types/table';

// Generic sort hook — works with any array of objects
export const useSort = <T extends object>(
  data: T[],
  defaultKey: string,
  defaultDirection: TSortDirection = 'desc',
) => {
  const [sortConfig, setSortConfig] = useState<ISortConfig>({
    key: defaultKey,
    direction: defaultDirection,
  });

  // Toggle sort: click same column → flip direction. Click different column → desc first.
  const handleSort = (key: string) => {
    setSortConfig((prev) => {
      if (prev.key === key) {
        return { key, direction: prev.direction === 'asc' ? 'desc' : 'asc' };
      }
      return { key, direction: 'desc' };
    });
  };

  // Memoized sorted data — only recomputes when data or sortConfig changes
  const sortedData = useMemo(() => {
    const sorted = [...data].sort((a, b) => {
      const aVal = (a as Record<string, unknown>)[sortConfig.key];
      const bVal = (b as Record<string, unknown>)[sortConfig.key];

      if (aVal == null) return 1;
      if (bVal == null) return -1;

      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return sortConfig.direction === 'asc' ? aVal - bVal : bVal - aVal;
      }

      const aStr = String(aVal).toLowerCase();
      const bStr = String(bVal).toLowerCase();
      if (sortConfig.direction === 'asc') {
        return aStr.localeCompare(bStr);
      }
      return bStr.localeCompare(aStr);
    });

    return sorted;
  }, [data, sortConfig]);

  return { sortedData, sortConfig, handleSort };
};
