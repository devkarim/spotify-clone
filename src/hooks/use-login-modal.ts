import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type ModalStatus = 'login' | 'register';

interface LoginModalState {
  isOpen: boolean;
  status: ModalStatus;
  show: (status?: ModalStatus) => void;
  hide: () => void;
  setStatus: (status: ModalStatus) => void;
  toggleStatus: () => void;
}

const useLoginModal = create<LoginModalState>()(
  devtools((set) => ({
    status: 'login',
    isOpen: false,
    show: (status = 'login') => set({ status, isOpen: true }),
    hide: () => set({ isOpen: false }),
    toggleStatus: () =>
      set((state) => ({
        status: state.status === 'login' ? 'register' : 'login',
      })),
    setStatus: (status) => set({ status }),
  }))
);

export default useLoginModal;
