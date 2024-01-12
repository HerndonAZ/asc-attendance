import { create } from "zustand"
interface RealTimeStore {
    data: any;
    initialDataLoaded: boolean;
    loading: boolean;
    day: string;
    setRealTimeData: (data: any) => void;
    setInitialDataLoaded: (loaded: boolean) => void;
    setLoading: (loading: boolean) => void;
    setDay: (day: string) => void;
  }
  
  export const useRealTimeStore = create<RealTimeStore>((set) => ({
    data: null,
    initialDataLoaded: false,
    loading: false,
    day: 'today',
    setRealTimeData: (data) => set({ data }),
    setInitialDataLoaded: (loaded) => set({ initialDataLoaded: loaded }),
    setLoading: (loading) => set({ loading }),
    setDay: (day) => set({ day }),
  }));