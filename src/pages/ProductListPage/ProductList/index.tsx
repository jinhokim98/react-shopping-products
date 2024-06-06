import { Filtering } from '@appTypes/index';
import { useEffect, useRef } from 'react';

import ProductCard from '../ProductCard';

import style from './style.module.css';
import useLoadProducts from '@queries/product/useLoadProducts';
import IntersectionObserverArea from '@components/IntersectionObserverArea';
import useLoadCartItems from '@queries/cart/useLoadCartItems';
import { ProductCardSkeleton } from '@components/Fallbacks';

interface ProductListProps {
  filtering: Filtering;
}

function ProductList({ filtering }: ProductListProps) {
  const productListRef = useRef<HTMLDivElement | null>(null);
  const targetRef = useRef<HTMLDivElement | null>(null);

  const { products, isLoading, fetchNextPage } = useLoadProducts(filtering);
  const { cartItems } = useLoadCartItems();

  const getCartItem = (productId: number) => {
    const cartItem = cartItems?.find((item) => item.product.id === productId);
    return cartItem;
  };

  const getNextPage = async () => {
    await fetchNextPage();
  };

  useEffect(() => {
    if (productListRef.current) {
      productListRef.current.scrollTo({ top: 0 });
    }
  }, [filtering]);

  return (
    <IntersectionObserverArea callback={getNextPage} targetRef={targetRef}>
      <section ref={productListRef} className={style.wrapper}>
        <ul className={style.productList}>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} cartItem={getCartItem(product.id)} />
          ))}
          <div className={style.target} ref={targetRef}>
            <span>target</span>
          </div>
        </ul>
        {isLoading && <ProductCardSkeleton />}
      </section>
    </IntersectionObserverArea>
  );
}

export default ProductList;
