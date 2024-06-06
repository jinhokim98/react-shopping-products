import style from './style.module.css';

function ProductCardSkeleton() {
  return (
    <ul className={style.productList}>
      {Array.from({ length: 4 }).map((_, index) => (
        <ProductCard key={index} />
      ))}
    </ul>
  );
}

function ProductCard() {
  return (
    <li className={style.productCard}>
      <div className={style.image} />
      <div className={style.contents}>
        <p className={style.productName}></p>
        <p className={style.price}></p>
      </div>
    </li>
  );
}

export default ProductCardSkeleton;
