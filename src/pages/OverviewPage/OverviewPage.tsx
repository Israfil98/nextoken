import { CoinsTable } from './components/CoinsTable';
import { GlobalStats } from './components/GlobalStats';
import { HighlightCards } from './components/HighlightCards';
import { TrendingCoins } from './components/TrendingCoins';

const OverviewPage = () => {
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
