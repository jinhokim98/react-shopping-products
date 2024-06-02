import { CartItem, Filtering } from '@appTypes/index';
import { Dropdown, IntersectionObserverArea } from '@components/index';
import { CATEGORY_OPTIONS, PRICE_SORT_OPTIONS } from '@constants/index';
import { useEffect, useRef, useState } from 'react';

import style from './style.module.css';
import useLoadProducts from '@src/hooks/useLoadProducts';
import ProductList from './ProductList';

interface ProductListPageProps {
  cartItems: CartItem[];
  refetch: () => Promise<void>;
}

function ProductListPage({ cartItems, refetch }: ProductListPageProps) {
  const [filtering, setFiltering] = useState<Filtering>({ category: '', sort: 'price,asc' });
  const { products, loading, error, loadNextPage, refreshByFiltering } = useLoadProducts(filtering);
  const targetRef = useRef<HTMLDivElement | null>(null);

  const handleChangeOption = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;

    setFiltering((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (error) {
      throw new Error('예기치 못한 에러 발생');
    }
  }, [error]);

  useEffect(() => {
    refreshByFiltering();
  }, [filtering]);

  return (
    <div>
      <h1 className="page__title">bpple 상품 목록</h1>
      <div className={style.dropdownGroup}>
        <Dropdown label="카테고리" name="category" options={CATEGORY_OPTIONS} onChange={handleChangeOption} />
        <Dropdown label="가격순" name="sort" options={PRICE_SORT_OPTIONS} onChange={handleChangeOption} />
      </div>
      <IntersectionObserverArea callback={loadNextPage} targetRef={targetRef}>
        <ProductList
          products={products}
          targetRef={targetRef}
          loading={loading}
          cartItems={cartItems}
          refetch={refetch}
        />
      </IntersectionObserverArea>
    </div>
  );
}

export default ProductListPage;
