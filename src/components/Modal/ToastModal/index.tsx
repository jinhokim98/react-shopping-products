import { useToastModalAnimation } from '@hooks/index';

import style from './style.module.css';
import { createPortal } from 'react-dom';

interface ToastModalProps {
  isError: boolean;
  position: {
    top?: number | string;
    left?: number | string;
    right?: number | string;
    bottom?: number | string;
  };
}

const ToastModal = ({ children, isError, position }: React.PropsWithChildren<ToastModalProps>) => {
  const { isOn } = useToastModalAnimation(isError);
  const className = `${style.toastModal} ${isOn ? style.on : ''}`;

  return (
    <>
      {isOn &&
        createPortal(
          <div className={className} style={position}>
            {children}
          </div>,
          document.body,
        )}
    </>
  );
};

export default ToastModal;
