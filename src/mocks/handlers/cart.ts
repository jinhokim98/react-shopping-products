import { CartItem } from '@appTypes/index';
import cartItems from '@mocks/data/cartItems.json';
import { makeServerResponse } from '@mocks/utils/serverResponse';
import { http, HttpResponse } from 'msw';

import { END_POINTS } from '../../apis/endPoints';

const mockCartItems = new Set(cartItems);

const cartHandler = [
  http.get(END_POINTS.cartItems, async () => {
    const response = makeServerResponse<CartItem[]>({
      page: 0,
      size: 10,
      content: Array.from(mockCartItems) as CartItem[],
    });

    return HttpResponse.json(response);
  }),

  http.post(END_POINTS.cartItems, async () => {
    const data = {
      id: 1,
      quantity: 1,
      product: {
        id: 114,
        name: '쑤쑤의카메라',
        price: 7000,
        imageUrl: '',
        category: 'electronics',
      },
    };
    mockCartItems.add(data);
    return HttpResponse.json();
  }),

  http.patch(`${END_POINTS.cartItems}/:cartItemId`, async ({ params, request }) => {
    const { cartItemId } = params;
    const { quantity: newQuantity } = (await request.json()) as { quantity: number };

    const target = Array.from(mockCartItems).find((item) => item.id === Number(cartItemId));
    if (target) {
      mockCartItems.delete(target);
      const newTarget = { ...target, quantity: newQuantity };
      mockCartItems.add(newTarget);
    }

    return HttpResponse.json();
  }),

  http.delete(`${END_POINTS.cartItems}/:cartItemId`, async ({ params }) => {
    const { cartItemId } = params;
    const target = Array.from(mockCartItems).find((item) => item.id === Number(cartItemId));
    if (target) mockCartItems.delete(target);
    return HttpResponse.json();
  }),
];

export default cartHandler;
