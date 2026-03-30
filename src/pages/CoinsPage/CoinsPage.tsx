import { Search } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Pagination } from '../../components/common';
import { useCoins } from '../../hooks/useCoinData';
import { useDebounce } from '../../hooks/useDebounce';
import { useSort } from '../../hooks/useSort';
import type { ICoin } from '../../types/coin';
import styles from './CoinsPage.module.scss';
import { CoinRow } from './components/CoinRow';
import { CoinsTableSkeleton } from './components/CoinsTableSkeleton';
import { TableHeader } from './components/TableHeader';

const COINS_PER_PAGE = 15;
const TOTAL_COINS = 100; // CoinGecko free tier practical limit

// Column definitions — keeps the table header DRY
const COLUMNS = [
  { key: 'star', label: '', sortable: false, className: 'star' },
  { key: 'market_cap_rank', label: '#', sortable: true, className: 'rank' },
  { key: 'market_cap_rank', label: '#', sortable: true, className: 'rank' },
  { key: 'name', label: 'Name', sortable: true, className: 'name' },
  { key: 'current_price', label: 'Price', sortable: true, className: 'right' },
  {
    key: 'price_change_percentage_1h_in_currency',
    label: '1h %',
    sortable: true,
    className: 'right hideLg',
  },
  {
    key: 'price_change_percentage_24h',
    label: '24h %',
    sortable: true,
    className: 'right',
  },
  {
    key: 'price_change_percentage_7d_in_currency',
    label: '7d %',
    sortable: true,
    className: 'right hideMd',
  },
  {
    key: 'market_cap',
    label: 'Market Cap',
    sortable: true,
    className: 'right hideSm',
  },
  {
    key: 'total_volume',
    label: 'Volume (24h)',
    sortable: true,
    className: 'right hideLg',
  },
  {
    key: 'sparkline',
    label: 'Last 7 Days',
    sortable: false,
    className: 'right hideXl',
  },
] as const;

const CoinsPage = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search);

  const { data: coins, isLoading, error } = useCoins(page, COINS_PER_PAGE);

  // Filter by search term (name or symbol)
  const filteredCoins = useMemo(() => {
    if (!coins) return [];
    if (!debouncedSearch.trim()) return coins;

    const term = debouncedSearch.toLowerCase();
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(term) ||
        coin.symbol.toLowerCase().includes(term),
    );
  }, [coins, debouncedSearch]);

  const totalPages = Math.ceil(TOTAL_COINS / COINS_PER_PAGE);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    setSearch(''); // Reset search when changing pages
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Sort the filtered results
  const { sortedData, sortConfig, handleSort } = useSort<ICoin>(
    filteredCoins,
    'market_cap_rank',
    'asc',
  );

  if (error) {
    return (
      <div className={styles.error}>
        <p>Failed to load coin data. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>Cryptocurrency Prices by Market Cap</h1>
        <div className={styles.searchWrapper}>
          <Search size={16} className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search coins..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={styles.searchInput}
          />
        </div>
      </div>

      <div className={styles.tableWrapper}>
        {isLoading ? (
          <CoinsTableSkeleton />
        ) : (
          <table className={styles.table}>
            <table className={styles.table}>
              <TableHeader
                columns={COLUMNS}
                sortConfig={sortConfig}
                onSort={handleSort}
              />
              <tbody>
                {sortedData.map((coin) => (
                  <CoinRow key={coin.id} coin={coin} />
                ))}
              </tbody>
            </table>
          </table>
        )}
      </div>

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default CoinsPage;
