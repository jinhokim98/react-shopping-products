import style from './style.module.css';

function CartActionError() {
  const errorMessage = `오류가 발생했습니다. ${window.innerWidth <= 500 ? '\n' : ''} 잠시 후 다시 시도해 주세요.`;
  return <div className={style.cartAction}>{errorMessage}</div>;
}

export default CartActionError;
