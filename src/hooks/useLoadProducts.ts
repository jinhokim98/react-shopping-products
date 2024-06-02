import { Filtering, Product } from '@appTypes/index';
import { fetchProduct } from '@apis/index';
import { useEffect, useState } from 'react';

const useLoadProducts = (filtering: Filtering) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(0);
  const [isLast, setIsLast] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const updateState = ({
    isLast,
    newProducts,
    newPage,
  }: {
    isLast: boolean;
    newProducts: Product[];
    newPage: number;
  }) => {
    setIsLast(isLast);
    setProducts(newProducts);
    setPage(newPage);
  };

  const loadNextPage = async () => {
    try {
      if (isLast || !products.length) return;
      setLoading(true);
      const newPage = page + 1;
      const result = await fetchProduct({ filtering, page: newPage });
      if (!result) return;
      updateState({ newPage, ...result, newProducts: [...products, ...result.products], isLast: result.isLast });
      setError('');
    } catch (error) {
      const errorMessage = (error as Error).message;
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleFilteringProducts = async () => {
    try {
      setProducts([]);
      setLoading(true);
      const result = await fetchProduct({ filtering });
      updateState({ isLast: result.isLast, newProducts: result.products, newPage: 0 });
    } catch (error) {
      const errorMessage = (error as Error).message;
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleFilteringProducts();
  }, [filtering]);

  return {
    products,
    loadNextPage,
    loading,
    error,
  };
};

export default useLoadProducts;
