import { FC, ReactNode, MouseEvent } from 'react';
import css from './Modal.module.css';
import { useModal } from '../../context';
import Icon from '../../shared/Icon/Icon';

interface ModalProps {
  children: ReactNode;
}

const Modal: FC<ModalProps> = ({ children }) => {
  const { closeModal } = useModal();

  const handleCloseModal = (e: MouseEvent<HTMLButtonElement>) => {
    closeModal(e);
  };

  return (
    <div className={css.modalWrapper} aria-modal="true" role="dialog">
      <div className={css.modalContainer}>
        <button
          className={css.modalButtonClose}
          aria-label="close-modal-window-button"
          onClick={handleCloseModal}
        >
          <Icon iconId="icon-x" className={css.iconClose} />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
