import useLoadCartItems from '@queries/cart/useLoadCartItems';
import CartBadgeButton from './CartBadgeButton';
import Logo from './Logo';
import style from './style.module.css';
import { CartActionError } from '@components/Fallbacks';

function Header() {
  const { cartItems, isError } = useLoadCartItems();

  return (
    <>
      <header className={style.header}>
        <Logo />
        <CartBadgeButton cartItemsLength={cartItems?.length ?? 0} />
      </header>
      <CartActionError isError={isError} />
    </>
  );
}

export default Header;
