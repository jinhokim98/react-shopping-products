import '@styles/App.css';
import '@styles/reset.css';
import '@styles/global.css';
import { CartAction, PageRequest } from '@components/Fallbacks';
import { Header, Layout, ToastModal } from '@components/index';
import { useEffect, useRef, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { CartItemsContext } from './contexts';
import { useCartAction } from './hooks';
import { ProductListPage } from './pages';

interface HeaderPosition {
  top: number;
  left: number;
}

function App() {
  const { cartItems, getCartItemList, handleCartAction, error, setCartActionError } = useCartAction();
  const [headerPosition, setHeaderPosition] = useState<HeaderPosition | null>(null);

  const headerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    getCartItemList();
  }, []);

  useEffect(() => {
    if (!headerRef.current) return;

    const domRect = headerRef.current.getClientRects()[0];

    setHeaderPosition({
      top: domRect.top,
      left: domRect.left,
    });
  }, [headerRef]);

  return (
    <>
      <Header cartItemsLength={cartItems.length} headerRef={headerRef} />
      <Layout>
        <ErrorBoundary FallbackComponent={({ error }) => <PageRequest error={error} />}>
          <CartItemsContext.Provider value={{ handleCartAction }}>
            <ProductListPage cartItems={cartItems} />
          </CartItemsContext.Provider>
        </ErrorBoundary>
      </Layout>
      {headerPosition && (
        <ToastModal isOpen={error} closeModal={() => setCartActionError(false)} position={headerPosition}>
          <CartAction />
        </ToastModal>
      )}
    </>
  );
}

export default App;
