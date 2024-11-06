import { ReactNode } from 'react';

import { useModalStore } from '@/store/useModalStore';

const useModal = () => {
  const open = useModalStore((state) => state.open);
  const setOpen = useModalStore((state) => state.setOpen);
  const setOkBtnCallback = useModalStore((state) => state.setOkBtnCallback);
  const setCancelBtnCallback = useModalStore(
    (state) => state.setCancelBtnCallback,
  );
  const setIsVisibleOkBtn = useModalStore((state) => state.setIsVisibleOkBtn);
  const setIsVisibleCancelBtn = useModalStore(
    (state) => state.setIsVisibleCancelBtn,
  );

  const setTitle = useModalStore((state) => state.setTitle);
  const setContent = useModalStore((state) => state.setContent);
  const setModalType = useModalStore((state) => state.setModalType);
  const setSeverity = useModalStore((state) => state.setSeverity);

  const openModal = ({
    isVisibleOkBtn,
    isVisibleCancelBtn,
    okBtnCallback,
    cancelBtnCallback,
    modalType,
    title,
    content,
    severity,
  }: {
    isVisibleOkBtn?: boolean;
    isVisibleCancelBtn?: boolean;
    okBtnCallback?: () => void;
    cancelBtnCallback?: () => void;
    modalType?: 'normal';
    title?: string;
    content?: ReactNode;
    severity?: 'success' | 'error';
  }) => {
    setIsVisibleOkBtn(isVisibleOkBtn || false);
    setIsVisibleCancelBtn(isVisibleCancelBtn || false);
    if (okBtnCallback) setOkBtnCallback(okBtnCallback);
    if (cancelBtnCallback) setCancelBtnCallback(cancelBtnCallback);
    setModalType(modalType || 'normal');
    setTitle(title || 'example');
    setContent(content || 'example');
    setSeverity(severity || 'success');
    setOpen(true);
  };

  return { open, openModal };
};

export default useModal;
