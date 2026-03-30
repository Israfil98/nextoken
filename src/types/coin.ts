// Matches CoinGecko's /coins/markets response shape
export interface ICoin {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  total_volume: number;
  price_change_percentage_24h: number | null;
  price_change_percentage_1h_in_currency: number | null;
  price_change_percentage_7d_in_currency: number | null;
  sparkline_in_7d: {
    price: number[];
  };
  circulating_supply: number;
  total_supply: number | null;
  ath: number;
  atl: number;
}

// Matches CoinGecko's /search/trending response shape
export interface ITrendingCoin {
  item: {
    id: string;
    coin_id: number;
    name: string;
    symbol: string;
    market_cap_rank: number;
    thumb: string;
    small: string;
    large: string;
    slug: string;
    price_btc: number;
    data: {
      price: number;
      price_change_percentage_24h: {
        usd: number;
      };
      market_cap: string;
      sparkline: string; // SVG string from CoinGecko
    };
  };
}

// Matches CoinGecko's /global response shape
export interface IGlobalData {
  data: {
    active_cryptocurrencies: number;
    total_market_cap: { usd: number };
    total_volume: { usd: number };
    market_cap_percentage: { btc: number; eth: number };
    market_cap_change_percentage_24h_usd: number;
  };
}

// Matches CoinGecko's /coins/{id} response shape
export interface ICoinDetail {
  id: string;
  symbol: string;
  name: string;
  image: {
    large: string;
  };
  market_cap_rank: number;
  market_data: {
    current_price: { usd: number };
    price_change_percentage_24h: number;
    price_change_percentage_7d: number;
    price_change_percentage_30d: number;
    price_change_percentage_1y: number;
    market_cap: { usd: number };
    total_volume: { usd: number };
    circulating_supply: number;
    total_supply: number | null;
    max_supply: number | null;
    ath: { usd: number };
    ath_change_percentage: { usd: number };
    ath_date: { usd: string };
    atl: { usd: number };
    atl_change_percentage: { usd: number };
    atl_date: { usd: string };
  };
  description: {
    en: string;
  };
}

// Matches CoinGecko's /coins/{id}/market_chart response shape
export interface ICoinChart {
  prices: [number, number][]; // [timestamp, price][]
}
