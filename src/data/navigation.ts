import { Coins, LayoutDashboard, Star } from 'lucide-react';
import { type INavItem } from '../types/navigation';

export const navItems: INavItem[] = [
  { label: 'Overview', path: '/', icon: LayoutDashboard },
  { label: 'Coins', path: '/coins', icon: Coins },
  { label: 'Watchlist', path: '/watchlist', icon: Star },
];
