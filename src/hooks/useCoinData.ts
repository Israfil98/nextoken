import { useQuery } from '@tanstack/react-query';
import {
  fetchCoinChart,
  fetchCoinDetail,
  fetchCoins,
  fetchGlobalData,
  fetchTrendingCoins,
} from '../lib/api';

// Hook for the main coins list
export const useCoins = (page = 1, perPage = 20) => {
  return useQuery({
    queryKey: ['coins', page, perPage],
    queryFn: () => fetchCoins(page, perPage),
  });
};

// Hook for trending coins
export const useTrendingCoins = () => {
  return useQuery({
    queryKey: ['trending'],
    queryFn: fetchTrendingCoins,
  });
};

// Hook for global market stats
export const useGlobalData = () => {
  return useQuery({
    queryKey: ['global'],
    queryFn: fetchGlobalData,
  });
};

// Hook for single coin detail
export const useCoinDetail = (id: string) => {
  return useQuery({
    queryKey: ['coin', id],
    queryFn: () => fetchCoinDetail(id),
    enabled: !!id,
  });
};

// Hook for coin price chart data
export const useCoinChart = (id: string, days: number) => {
  return useQuery({
    queryKey: ['chart', id, days],
    queryFn: () => fetchCoinChart(id, days),
    enabled: !!id,
  });
};
