import '@styles/App.css';
import '@styles/reset.css';
import '@styles/global.css';
import { CartActionError, PageRequest } from '@components/Fallbacks';
import { Header, Layout, ToastModal } from '@components/index';
import { ErrorBoundary } from 'react-error-boundary';
import { ProductListPage } from './pages';
import useLoadCartItems from './hooks/useLoadCartItems';

function App() {
  const { cartItems, refetch, error } = useLoadCartItems();
  const isError = error !== '';

  return (
    <>
      <Header cartItemsLength={cartItems.length} />
      <Layout>
        <ErrorBoundary FallbackComponent={({ error }) => <PageRequest error={error} />}>
          <ProductListPage cartItems={cartItems} refetch={refetch} />
        </ErrorBoundary>
      </Layout>
      {isError && (
        <ToastModal isError={isError} position={{ top: 40 }}>
          <CartActionError />
        </ToastModal>
      )}
    </>
  );
}

export default App;
