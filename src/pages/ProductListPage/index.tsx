import { Filtering } from '@appTypes/index';
import { Dropdown } from '@components/index';
import { CATEGORY_OPTIONS, PRICE_SORT_OPTIONS } from '@constants/index';
import { Suspense, useState } from 'react';

import style from './style.module.css';
import ProductList from './ProductList';
import { ProductCardSkeleton } from '@components/Fallbacks';

function ProductListPage() {
  const [filtering, setFiltering] = useState<Filtering>({ category: '', sort: 'price,asc' });

  const handleChangeOption = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;

    setFiltering((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <h1 className="page__title">bpple 상품 목록</h1>
      <div className={style.dropdownGroup}>
        <Dropdown label="카테고리" name="category" options={CATEGORY_OPTIONS} onChange={handleChangeOption} />
        <Dropdown label="가격순" name="sort" options={PRICE_SORT_OPTIONS} onChange={handleChangeOption} />
      </div>
      <Suspense fallback={<ProductCardSkeleton />}>
        <ProductList filtering={filtering} />
      </Suspense>
    </div>
  );
}

export default ProductListPage;
