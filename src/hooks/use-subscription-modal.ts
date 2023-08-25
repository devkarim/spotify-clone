import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface SubscriptionModalState {
  isOpen: boolean;
  show: () => void;
  hide: () => void;
}

const useSubscriptionModal = create<SubscriptionModalState>()(
  devtools((set) => ({
    isOpen: false,
    show: () => set({ isOpen: true }),
    hide: () => set({ isOpen: false }),
  }))
);

export default useSubscriptionModal;
