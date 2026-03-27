import type { ICoin, IGlobalData, ITrendingCoin } from '../types/coin';

const BASE_URL = 'https://api.coingecko.com/api/v3';

// Generic fetch helper with error handling
const fetchFromApi = async <T>(endpoint: string): Promise<T> => {
  const response = await fetch(`${BASE_URL}${endpoint}`);

  if (!response.ok) {
    // CoinGecko returns 429 when rate limited
    if (response.status === 429) {
      throw new Error('Rate limited — please wait a moment and try again');
    }
    throw new Error(`API error: ${response.status}`);
  }

  return response.json();
};

// Fetch top coins by market cap
// This is the main endpoint — powers the overview cards and coins table
export const fetchCoins = (page = 1, perPage = 20): Promise<ICoin[]> => {
  return fetchFromApi<ICoin[]>(
    `/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${perPage}&page=${page}&sparkline=true&price_change_percentage=1h,7d`,
  );
};

// Fetch trending coins (what people are searching for)
export const fetchTrendingCoins = (): Promise<{ coins: ITrendingCoin[] }> => {
  return fetchFromApi<{ coins: ITrendingCoin[] }>('/search/trending');
};

// Fetch global market data (total market cap, volume, dominance)
export const fetchGlobalData = (): Promise<IGlobalData> => {
  return fetchFromApi<IGlobalData>('/global');
};
