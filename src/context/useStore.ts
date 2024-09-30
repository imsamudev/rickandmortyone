import { create } from 'zustand';

interface MenuState {
    isMenuOpen: boolean;
    toggleMenu: () => void;
  }
  
  export const useStore = create<MenuState>((set) => ({
    isMenuOpen: false,
    toggleMenu: () => set((state) => ({ isMenuOpen: !state.isMenuOpen })),
  }));