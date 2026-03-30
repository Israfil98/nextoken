import { create } from 'zustand';

interface IWatchlistStore {
  watchlist: string[];
  toggleCoin: (id: string) => void;
  isWatched: (id: string) => boolean;
}

const getStoredWatchlist = (): string[] => {
  const stored = localStorage.getItem('nextoken-watchlist');
  if (!stored) return [];

  try {
    return JSON.parse(stored);
  } catch {
    return [];
  }
};

const saveWatchlist = (watchlist: string[]) => {
  localStorage.setItem('nextoken-watchlist', JSON.stringify(watchlist));
};

export const useWatchlistStore = create<IWatchlistStore>((set, get) => ({
  watchlist: getStoredWatchlist(),

  toggleCoin: (id: string) => {
    const current = get().watchlist;
    const next = current.includes(id)
      ? current.filter((coinId) => coinId !== id)
      : [...current, id];

    saveWatchlist(next);
    set({ watchlist: next });
  },

  isWatched: (id: string) => {
    return get().watchlist.includes(id);
  },
}));
