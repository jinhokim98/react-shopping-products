import '@styles/App.css';
import '@styles/reset.css';
import '@styles/global.module.css';
import { Header, Layout } from '@components/index';
import { useEffect } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { useCartAction } from './hooks';
import { ProductListPage } from './pages';

function App() {
  const { cartItems, getCartItemList, handleCartAction } = useCartAction();

  // const getCartItemList = async () => {
  //   const firstResult = await fetch();
  //   if (!firstResult) return;
  //   const { totalNumbers, cartItems, isTotalCartItems } = firstResult;

  //   if (isTotalCartItems) {
  //     return setCartItem(cartItems);
  //   }
  //   // page-0인 장바구니 목록외에 더 데이터를 불러와야 할 경우
  //   const result = await fetch(totalNumbers);
  //   if (!result) return;

  //   setCartItem(result.cartItems);
  // };

  useEffect(() => {
    getCartItemList();
  }, []);

  return (
    <>
      <Header cartItemsLength={cartItems.length} />
      <Layout>
        <ErrorBoundary fallback={<div> 오류.....</div>}>
          <ProductListPage cartItems={cartItems} getCartItemList={getCartItemList} />
        </ErrorBoundary>
      </Layout>
    </>
  );
}

export default App;
