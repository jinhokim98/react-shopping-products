import CartIcon from '@assets/cart.svg';

import style from './style.module.css';
import { useReducer } from 'react';
import CartItemModal from '@components/Modal/CartItemModal';

const BADGE_MAX_QUANTITY = 50;

interface CartActionButtonProps {
  cartItemsLength: number;
}

function CartBadgeButton({ cartItemsLength }: CartActionButtonProps) {
  const quantityClassName = `${style.quantity} ${cartItemsLength > BADGE_MAX_QUANTITY ? style.over : ''}`;
  const [isOpen, setIsOpen] = useReducer((prev) => !prev, false);

  return (
    <>
      <button type="button" className={style.button} onClick={setIsOpen}>
        <img src={CartIcon} alt="장바구니 아이콘(장바구니 페이지 이동)" />
        {!!cartItemsLength && (
          <div className={quantityClassName}>
            {cartItemsLength > BADGE_MAX_QUANTITY ? BADGE_MAX_QUANTITY : cartItemsLength}
          </div>
        )}
      </button>
      <CartItemModal isOpen={isOpen} onClose={setIsOpen} />
    </>
  );
}

export default CartBadgeButton;
