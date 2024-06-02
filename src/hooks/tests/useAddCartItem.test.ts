import { fetchPostCartItems } from '@apis/index';
import { waitFor } from '@testing-library/react';

describe('add cart item api test', () => {
  it('장바구니 목록을 추가할 수 있다.', async () => {
    const PRODUCT_ID = 113;

    await waitFor(() => {
      const mutate = () => fetchPostCartItems({ productId: PRODUCT_ID });
      expect(mutate).not.toThrow();
    });
  });
});
