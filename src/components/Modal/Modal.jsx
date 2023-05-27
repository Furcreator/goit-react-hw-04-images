import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Overlay, ModalWrap } from './Modal.styled';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ togleModal, imageLink }) => {
  useEffect(() => {
    const clickEsc = e => {
      window.addEventListener('keydown', clickEsc);
      if (e.code === 'Escape') {
        togleModal();
      }
    };
    window.addEventListener('keydown', clickEsc);
    return () => {
      window.removeEventListener('keydown', clickEsc);
    };
  }, [togleModal]);

  const hideModal = e => {
    if (e.currentTarget === e.target) {
      togleModal();
    }
  };

  return createPortal(
    <Overlay onClick={hideModal}>
      <ModalWrap>
        <img src={imageLink} alt="#" />
      </ModalWrap>
    </Overlay>,
    modalRoot
  );
};

export default Modal;

Modal.propTypes = {
  togleModal: PropTypes.func.isRequired,
  imageLink: PropTypes.string.isRequired,
};
