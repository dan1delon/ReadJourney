import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  ReactNode,
  FC,
} from 'react';
import { createPortal } from 'react-dom';
import css from './modal.module.css';
import Modal from '../components/Modal/Modal';

interface ModalContextType {
  modalContent: (() => ReactNode) | null;
  openModal: (content: () => ReactNode) => void;
  closeModal: (
    e?: React.MouseEvent | React.KeyboardEvent | { type: 'submit' }
  ) => void;
}

const modalContext = createContext<ModalContextType | null>(null);

export const useModal = () => {
  const context = useContext(modalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};

interface ModalProviderProps {
  children: ReactNode;
}

export const ModalProvider: FC<ModalProviderProps> = ({ children }) => {
  const [modalContent, setModalContent] = useState<(() => ReactNode) | null>(
    null
  );
  const backdropRef = useRef<HTMLDivElement>(null);

  const closeModal = useCallback(
    (
      e?:
        | MouseEvent
        | KeyboardEvent
        | React.MouseEvent
        | React.KeyboardEvent
        | { type: 'submit' }
    ) => {
      if (
        (e && 'target' in e && e.target === e.currentTarget) ||
        (e && 'code' in e && e.code === 'Escape') ||
        (e && e.type === 'submit')
      ) {
        if (backdropRef.current) {
          backdropRef.current.style.opacity = '0';
          backdropRef.current.style.visibility = 'hidden';
        }

        setTimeout(() => setModalContent(null), 300);
      }
    },
    []
  );

  const openModal = (content: () => ReactNode) => {
    setModalContent(() => content);
    setTimeout(() => {
      if (backdropRef.current) {
        backdropRef.current.style.opacity = '1';
        backdropRef.current.style.visibility = 'visible';
      }
    }, 10);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Escape') closeModal(e);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [closeModal]);

  const modalRoot = document.getElementById('modal-root');
  if (!modalRoot) return null;

  return (
    <modalContext.Provider value={{ modalContent, openModal, closeModal }}>
      {children}
      {modalContent &&
        createPortal(
          <div
            className={css.modalBackdrop}
            ref={backdropRef}
            onClick={closeModal}
          >
            <Modal>{modalContent()}</Modal>
          </div>,
          modalRoot
        )}
    </modalContext.Provider>
  );
};
