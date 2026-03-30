import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router';
import { Layout } from './components/Layout';

const OverviewPage = lazy(() => import('./pages/OverviewPage/OverviewPage'));
const CoinsPage = lazy(() => import('./pages/CoinsPage/CoinsPage'));
const CoinDetailPage = lazy(
  () => import('./pages/CoinDetailPage/CoinDetailPage'),
);
const WatchlistPage = lazy(() => import('./pages/WatchlistPage/WatchlistPage'));

const App = () => {
  return (
    <Suspense>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<OverviewPage />} />
          <Route path="coins" element={<CoinsPage />} />
          <Route path="coins/:id" element={<CoinDetailPage />} />
          <Route path="watchlist" element={<WatchlistPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default App;
