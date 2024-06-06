import '@styles/App.css';
import '@styles/reset.css';
import '@styles/global.css';
import { PageRequest } from '@components/Fallbacks';
import { Header, Layout } from '@components/index';
import { ErrorBoundary } from 'react-error-boundary';
import { ProductListPage } from './pages';

function App() {
  return (
    <>
      <Header />
      <Layout>
        <ErrorBoundary FallbackComponent={({ error }) => <PageRequest error={error} />}>
          <ProductListPage />
        </ErrorBoundary>
      </Layout>
    </>
  );
}

export default App;
