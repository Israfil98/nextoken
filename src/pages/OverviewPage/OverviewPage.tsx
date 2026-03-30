import { useCoins } from '../../hooks/useCoinData';
import { CoinsTable } from './components/CoinsTable';
import { GlobalStats } from './components/GlobalStats';
import { HighlightCards } from './components/HighlightCards';
import { OverviewSkeleton } from './components/OverviewSkeleton';
import { TrendingCoins } from './components/TrendingCoins';

const OverviewPage = () => {
  const { isLoading } = useCoins(1, 20);

  if (isLoading) return <OverviewSkeleton />;

  return (
    <>
      <GlobalStats />
      <HighlightCards />
      <TrendingCoins />
      <CoinsTable />
    </>
  );
};

export default OverviewPage;
