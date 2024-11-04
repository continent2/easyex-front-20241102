import * as React from 'react';
import { Fade } from '@mui/material';
import MuiModal from '@mui/material/Modal';

import CloseIcon from '@/assets/img/icon-close.png';

import { useModalStore } from '@/store/useModalStore';

const Modal = () => {
  const open = useModalStore((state) => state.open);
  const setOpen = useModalStore((state) => state.setOpen);
  const modalType = useModalStore((state) => state.modalType);
  const title = useModalStore((state) => state.title);
  const content = useModalStore((state) => state.content);
  const okBtnCallback = useModalStore((state) => state.okBtnCallback);
  const cancelBtnCallback = useModalStore((state) => state.cancelBtnCallback);
  const isVisibleOkBtn = useModalStore((state) => state.isVisibleOkBtn);
  const isVisibleCancelBtn = useModalStore((state) => state.isVisibleCancelBtn);
  const handleClose = () => setOpen(false);

  const handleOkBtnClick = () => {
    if (okBtnCallback) {
      okBtnCallback();
    }
    setOpen(false);
  };

  const handleCancelBtnClick = () => {
    if (cancelBtnCallback) {
      cancelBtnCallback();
    }
    setOpen(false);
  };

  return (
    <div>
      <MuiModal
        open={modalType === 'normal' && open}
        onClose={handleClose}
        disableAutoFocus
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Fade in={open}>
          <div id="delete-popup" className="popup active">
            <button
              type="button"
              className="popup-close-button"
              onClick={handleClose}
            >
              <img src={CloseIcon} alt="" />
            </button>

            <div className="popup-hd">{title}</div>
            <div className="popup-middle">
              <p>{content}</p>
            </div>
            <div className="popup-button-grp">
              {isVisibleCancelBtn && (
                <button
                  type="button"
                  className="popup-button cancel"
                  onClick={handleCancelBtnClick}
                >
                  Cancel
                </button>
              )}
              {isVisibleOkBtn && (
                <button
                  onClick={handleOkBtnClick}
                  type="button"
                  className="popup-button confirm"
                >
                  Confirm
                </button>
              )}
            </div>
          </div>
        </Fade>
      </MuiModal>
    </div>
  );
};
export default Modal;
