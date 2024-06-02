import { CartItem, ServerResponse } from '@appTypes/index';
import { fetchWithToken } from '@utils/index';

import { END_POINTS } from './endPoints';

export async function fetchPostCartItems({ productId }: { productId: number }) {
  await fetchWithToken({
    url: `${END_POINTS.cartItems}`,
    method: 'POST',
    body: JSON.stringify({
      productId: productId,
      quantity: 1,
    }),
  });
}

export async function fetchGetCartItems(totalNumbers: number = 20) {
  const searchParams = new URLSearchParams({
    size: `${totalNumbers}`,
  });
  const data = await fetchWithToken({
    url: END_POINTS.cartItems + '?' + searchParams,
    method: 'GET',
  });

  const result = (await data.json()) as ServerResponse<CartItem[]>;

  return {
    totalNumbers: result.totalElements,
    cartItems: result.content,
    totalElements: result.totalElements,
  };
}

export async function fetchDeleteCartItems({ cartItemId }: { cartItemId: number }) {
  await fetchWithToken({
    url: `${END_POINTS.cartItems}/${cartItemId}`,
    method: 'DELETE',
  });
}
