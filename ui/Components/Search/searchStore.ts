import { AttendanceRecord } from 'lib/types';
import { create } from 'zustand';

export interface SearchState {
  searchTerm: string;
  searchResults: {
    perfs: AttendanceRecord[];
  };
  isOpen: boolean;
  isInputFocused: boolean;
  setSearchTerm: (newSearchTerm: string) => void;
  setSearchResults: (newResults: { perfs: AttendanceRecord[] }) => void;
  setIsOpen: (newIsOpen: boolean) => void;
  setIsInputFocused: (newIsInputFocused: boolean) => void;
}

// Create the searchStore
export const useSearchStore = create<SearchState>((set) => ({
  searchTerm: '',
  searchResults: {
    perfs: []
  },
  isOpen: false,
  isInputFocused: false,
  setSearchTerm: (newSearchTerm: string) => set({ searchTerm: newSearchTerm }),
  setSearchResults: (newResults: { perfs: AttendanceRecord[] }) =>
    set({ searchResults: newResults || [] }),
  setIsOpen: (newIsOpen: boolean) => set({ isOpen: newIsOpen }),
  setIsInputFocused: (newIsInputFocused: boolean) =>
    set({ isInputFocused: newIsInputFocused })
}));

// Usage in your component
