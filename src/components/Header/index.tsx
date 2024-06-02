import CartBadgeButton from './CartBadgeButton';
import Logo from './Logo';
import style from './style.module.css';

interface HeaderProps {
  cartItemsLength: number;
}

function Header({ cartItemsLength }: HeaderProps) {
  return (
    <header className={style.header}>
      <Logo />
      <CartBadgeButton cartItemsLength={cartItemsLength} />
    </header>
  );
}

export default Header;
