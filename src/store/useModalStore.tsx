import { ReactNode } from 'react';
import { create } from 'zustand';

interface ModalStore {
  open: boolean;
  modalType: 'normal';
  severity: 'success' | 'error';
  setModalType: (modalType: 'normal') => void;
  setSeverity: (severity: 'success' | 'error') => void;
  toggleOpen: () => void;
  setOpen: (open: boolean) => void;

  title: string;
  setTitle: (title: string) => void;
  content: ReactNode;
  setContent: (content: ReactNode) => void;
  okBtnCallback: () => void;
  setOkBtnCallback: (okBtnCallback: () => void) => void;
  cancelBtnCallback: () => void;
  setCancelBtnCallback: (cancelBtnCallback: () => void) => void;
  isVisibleOkBtn: boolean;
  setIsVisibleOkBtn: (isVisibleOkBtn: boolean) => void;
  isVisibleCancelBtn: boolean;
  setIsVisibleCancelBtn: (isVisibleCancelBtn: boolean) => void;
}

export const useModalStore = create<ModalStore>((set) => ({
  open: false,
  modalType: 'normal',
  severity: 'success',
  setModalType: (modalType) => set({ modalType }),
  setSeverity: (severity) => set({ severity }),
  toggleOpen: () => set((state) => ({ open: !state.open })),
  setOpen: (open) => set({ open }),
  title: '',
  setTitle: (title) => set({ title }),
  content: <div></div>,
  setContent: (content) => set({ content }),
  okBtnCallback: () => {},
  setOkBtnCallback: (okBtnCallback) => set({ okBtnCallback }),
  cancelBtnCallback: () => {},
  setCancelBtnCallback: (cancelBtnCallback) => set({ cancelBtnCallback }),
  isVisibleOkBtn: true,
  setIsVisibleOkBtn: (isVisibleOkBtn) => set({ isVisibleOkBtn }),
  isVisibleCancelBtn: false,
  setIsVisibleCancelBtn: (isVisibleCancelBtn) => set({ isVisibleCancelBtn }),
}));
