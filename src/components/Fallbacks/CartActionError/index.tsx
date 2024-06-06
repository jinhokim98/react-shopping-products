import ToastModal from '@components/Modal/ToastModal';
import style from './style.module.css';

interface CartActionErrorProps {
  isError: boolean;
}

function CartActionError({ isError }: CartActionErrorProps) {
  const errorMessage = `오류가 발생했습니다. 잠시 후 다시 시도해 주세요.`;
  return (
    <ToastModal isError={isError} position={{ top: 40 }}>
      <div className={style.cartAction}>{errorMessage}</div>
    </ToastModal>
  );
}

export default CartActionError;
