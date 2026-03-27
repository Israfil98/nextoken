import { create } from 'zustand';

interface ISidebarStore {
  isExpanded: boolean;
  isMobileOpen: boolean;
  toggleExpanded: () => void;
  openMobile: () => void;
  closeMobile: () => void;
}

export const useSidebarStore = create<ISidebarStore>((set) => ({
  isExpanded: true,
  isMobileOpen: false,
  toggleExpanded: () => set((state) => ({ isExpanded: !state.isExpanded })),
  openMobile: () => set({ isMobileOpen: true }),
  closeMobile: () => set({ isMobileOpen: false }),
}));
