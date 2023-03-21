import React, { useContext, useRef, useState, useEffect, ReactNode } from 'react';
import ReactDOM from 'react-dom';
import './Modal.css';

type ModalContextProps = {
  modalRef: React.RefObject<HTMLDivElement>;
}

const ModalContext = React.createContext<Partial<ModalContextProps>>({});

type ModalProviderProps = {
  children: ReactNode;
}

type ModalProps = {
  onClose: () => void;
  children: ReactNode;
}

export function ModalProvider({ children }: ModalProviderProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  
  const [value, setValue] = useState<Partial<ModalContextProps>>({});

  useEffect(() => {
    setValue({ modalRef });
  }, []);

  return (
    <>
      <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
      <div ref={modalRef} />
    </>
  );
}

export function Modal({ onClose, children }: ModalProps) {
  const { modalRef } = useContext(ModalContext);
  const modalNode = modalRef?.current;
  if (!modalNode) return null;

  return ReactDOM.createPortal(
    <div id='modal'>
      <div id='modal-background' onClick={onClose} />
      <div id='modal-content'>{children}</div>
    </div>,
    modalNode
  );
}
