import Stepper from '@components/Stepper';
import style from './style.module.css';
import { CartItem } from '@appTypes/cartItems';
import useDeleteCartItem from '@queries/cart/useDeleteCartItem';
import usePatchCartItemQuantity from '@queries/cart/usePatchCartItemQuantity';
import { CartActionError } from '@components/Fallbacks';

interface EachCartItemProps {
  cartItem: CartItem;
}

function EachCartItem({ cartItem }: EachCartItemProps) {
  const { deleteCartItem, isPending, isError } = useDeleteCartItem();
  const { changeQuantity } = usePatchCartItemQuantity();

  const onDelete = () => {
    if (!cartItem) return;
    deleteCartItem(cartItem.id);
  };

  const handleDecrement = () => {
    if (!cartItem) return;
    if (cartItem.quantity <= 1) {
      deleteCartItem(cartItem.id);
      return;
    }

    const newQuantity = cartItem.quantity - 1;
    changeQuantity({ cartItemId: cartItem.id, quantity: newQuantity });
  };

  const handleIncrement = () => {
    if (!cartItem) return;
    const newQuantity = cartItem.quantity + 1;
    changeQuantity({ cartItemId: cartItem.id, quantity: newQuantity });
  };

  return (
    <>
      <div className={style.container}>
        <hr className={style.hr} />
        <button type="button" onClick={onDelete} className={style.button} disabled={isPending}>
          삭제
        </button>
        <div className={style.contents}>
          <img className={style.productImage} src={cartItem.product.imageUrl} alt="product" />
          <div className={style.description}>
            <p className={style.productName}>{cartItem.product.name}</p>
            <p className={`${style.price} text`}>{cartItem.product.price.toLocaleString()}원</p>
            <Stepper value={cartItem.quantity} handleIncrement={handleIncrement} handleDecrement={handleDecrement} />
          </div>
        </div>
      </div>
      <CartActionError isError={isError} />
    </>
  );
}

export default EachCartItem;
