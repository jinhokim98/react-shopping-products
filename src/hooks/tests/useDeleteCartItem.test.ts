import { fetchDeleteCartItems } from '@apis/index';
import { waitFor } from '@testing-library/react';

describe('delete cart item api test', () => {
  it('장바구니 목록을 제거할 수 있다.', async () => {
    const CART_ITEM_ID = 113;

    await waitFor(() => {
      const mutate = () => fetchDeleteCartItems({ cartItemId: CART_ITEM_ID });
      expect(mutate).not.toThrow();
    });
  });
});
