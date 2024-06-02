import { CartItem, Product } from '@appTypes/index';
import { useEffect, useRef } from 'react';

import ProductCard from '../ProductCard';

import style from './style.module.css';

interface ProductListProps {
  products: Product[];
  targetRef: React.MutableRefObject<HTMLDivElement | null>;
  loading: boolean;
  refetch: () => Promise<void>;
  cartItems: CartItem[];
}
function ProductList({ products, targetRef, refetch, loading, cartItems }: ProductListProps) {
  const productListRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (products.length <= 20) {
      productListRef.current?.scrollTo({ top: 0 });
    }
  }, [productListRef, products]);

  const getCartItem = (productId: number) => {
    const cartItem = cartItems.find((item) => item.product.id === productId);
    return cartItem;
  };

  return (
    <section ref={productListRef} className={style.wrapper}>
      <ul className={style.productList}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} cartItem={getCartItem(product.id)} refetch={refetch} />
        ))}
        {loading && <div>로딩중....</div>}
        <div className={style.target} ref={targetRef}>
          <span>target</span>
        </div>
      </ul>
    </section>
  );
}

export default ProductList;
