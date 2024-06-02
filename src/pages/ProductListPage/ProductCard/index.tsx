import { CartItem, Product } from '@appTypes/index';

import CartActionButton from '../CartActionButton';

import style from './style.module.css';

interface ProductCardProps {
  product: Product;
  cartItem: CartItem | undefined;
  refetch: () => Promise<void>;
}

function ProductCard({ product, cartItem, refetch }: ProductCardProps) {
  return (
    <li className={style.productCard}>
      <img src={product.imageUrl} alt="" className={style.image} />
      <div className={style.contents}>
        <p className="product-name">{product.name}</p>
        <p className="text">{product.price.toLocaleString()}원</p>
        <CartActionButton cartItem={cartItem!} productId={product.id} refetch={refetch} />
      </div>
    </li>
  );
}

export default ProductCard;
