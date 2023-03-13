import * as React from "react";
import lodash from 'lodash'
import { FaStar } from "react-icons/fa";
import styles from "./product-list-components.module.css";

type IPostsProps = {
  products: any;
  onFav: (index: number) => void;
}


export const ProductList: React.FC<IPostsProps> = ({products, onFav}) => {

  let productsarr = []
  for (const [i, p] of products.entries()) {
    productsarr.push(
      <Product key={i} index={i} product={p} onFav={onFav} />
     );
  }
  return <div>{lodash.reverse(productsarr)}</div>;
}

export const Product: React.FC<{
  index: number;
  product: { title: string; description: string; price: number; isFavorite: boolean; rating: {rate: number; count: number} };
  onFav: (index: number) => void;
}> = ({ index, product, onFav }) => {
  const {product: productClass, productTitle, productBody, actionBar, actionBarItem, actionBarItemLabel} = styles
  return (
    <span className={productClass}>
      <span className={productTitle}>{product.title}</span>

      <p><strong>Rating: {product.rating ? `${product.rating.rate}/5` : ''}</strong></p>

      <p><b>Price: ${+product.price}</b></p>

      <p className={productBody}>
        <span><b>Description:</b></span>
        <br/>
        {product.description}
     </p>

      <span className={actionBar}>
        <span
          className={`${actionBarItem} ${
            product.isFavorite ? "active" : ""
          }`}
          role="button"
          onClick={() => {
              onFav(index);
          }}
        >
          <FaStar /> <span className={actionBarItemLabel}>{(product.isFavorite) ? 'Remove from favorites' : 'Add to favorites'}</span>
        </span>
      </span>
    </span>
  );
};
