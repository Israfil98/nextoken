import { Route, Routes } from 'react-router';
import { Layout } from './components/Layout';
import { CoinsPage } from './pages/CoinsPage';
import { OverviewPage } from './pages/OverviewPage';
import { WatchlistPage } from './pages/WatchlistPage';

const App = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<OverviewPage />} />
        <Route path="coins" element={<CoinsPage />} />
        <Route path="watchlist" element={<WatchlistPage />} />
      </Route>
    </Routes>
  );
};

export default App;
