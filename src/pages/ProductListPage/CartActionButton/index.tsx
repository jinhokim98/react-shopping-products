import AddIcon from '@assets/addCart.svg';
import DeleteIcon from '@assets/deleteCart.svg';
import style from './style.module.css';
import { useAddCartItem, useDeleteCartItem } from '@hooks/index';
import { CartItem } from '@appTypes/index';
import { ToastModal } from '@src/components';
import { CartActionError } from '@src/components/Fallbacks';

type ButtonType = 'add' | 'delete';

interface CartActionButtonProps {
  cartItem: CartItem;
  productId: number;
  refetch: () => Promise<void>;
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

function CartActionButton({ cartItem, productId, refetch }: CartActionButtonProps) {
  const isInCart = cartItem !== undefined;
  const buttonType = isInCart ? 'delete' : 'add';

  const { src, alt, text } = BUTTON_INFO[buttonType];
  const className = `${style.button} ${style[buttonType]}`;

  const { addCartItem, loading: addLoading, error: addError } = useAddCartItem(refetch);
  const { deleteCarItem, loading: deleteLoading, error: deleteError } = useDeleteCartItem(refetch);

  const onAction = async () => {
    if (isInCart) {
      await deleteCarItem(cartItem);
      return;
    }

    await addCartItem(productId);
  };

  const isPending = addLoading || deleteLoading;
  const isError = addError !== '' || deleteError !== '';

  return (
    <>
      <button onClick={onAction} className={className} disabled={isPending}>
        <img src={src} alt={alt} />
        <span className="button__text">{text}</span>
      </button>
      {isError && (
        <ToastModal isError={isError} position={{ top: 40 }}>
          <CartActionError />
        </ToastModal>
      )}
    </>
  );
}

export default CartActionButton;
