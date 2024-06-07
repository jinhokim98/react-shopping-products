import AddIcon from '@assets/addCart.svg';
import DeleteIcon from '@assets/deleteCart.svg';
import style from './style.module.css';
import { CartItem } from '@appTypes/index';
import { CartActionError } from '@components/Fallbacks';
import useAddCartItem from '@queries/cart/useAddCartItem';
import useDeleteCartItem from '@queries/cart/useDeleteCartItem';
import usePatchCartItemQuantity from '@queries/cart/usePatchCartItemQuantity';
import Stepper from '@components/Stepper';

type ButtonType = 'add' | 'delete';

interface CartActionButtonProps {
  cartItem: CartItem | undefined;
  productId: number;
}

interface ButtonInfo {
  src: string;
  alt: string;
  text: string;
}

const BUTTON_INFO: Record<ButtonType, ButtonInfo> = {
  add: {
    src: AddIcon,
    alt: '상품 담기',
    text: '담기',
  },
  delete: {
    src: DeleteIcon,
    alt: '상품 빼기',
    text: '빼기',
  },
};

function CartActionButton({ cartItem, productId }: CartActionButtonProps) {
  const isInCart = cartItem !== undefined;
  const buttonType = isInCart ? 'delete' : 'add';

  const { src, alt, text } = BUTTON_INFO[buttonType];
  const className = `${style.button} ${style[buttonType]}`;

  const { addCartItem, isPending: addLoading, isError: addError } = useAddCartItem();
  const { deleteCartItem, isPending: deleteLoading, isError: deleteError } = useDeleteCartItem();
  const { changeQuantity, isError: changeQuantityError } = usePatchCartItemQuantity();

  const isPending = addLoading || deleteLoading;
  const isError = addError || deleteError || changeQuantityError;

  const onDecrement = () => {
    if (!cartItem) return;
    if (cartItem.quantity <= 1) {
      deleteCartItem(cartItem.id);
      return;
    }

    const newQuantity = cartItem.quantity - 1;
    changeQuantity({ cartItemId: cartItem.id, quantity: newQuantity });
  };
  const onIncrement = () => {
    if (!cartItem) return;
    const newQuantity = cartItem.quantity + 1;
    changeQuantity({ cartItemId: cartItem.id, quantity: newQuantity });
  };

  return (
    <>
      {cartItem ? (
        <div className={style.stepperPosition}>
          <Stepper value={cartItem.quantity} handleDecrement={onDecrement} handleIncrement={onIncrement} />
        </div>
      ) : (
        <button type="button" onClick={() => addCartItem({ productId })} className={className} disabled={isPending}>
          <img src={src} alt={alt} />
          <span className="button__text">{text}</span>
        </button>
      )}
      <CartActionError isError={isError} />
    </>
  );
}

export default CartActionButton;
