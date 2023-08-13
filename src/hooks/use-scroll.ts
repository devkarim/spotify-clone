import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface ScrollState {
  offset: number;
  setOffset: (offset: number) => void;
}

const useScroll = create<ScrollState>()(
  devtools((set) => ({
    offset: 0,
    setOffset: (offset) => set({ offset }),
  }))
);

export default useScroll;
