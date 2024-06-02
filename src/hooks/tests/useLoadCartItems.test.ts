import { renderHook, waitFor } from '@testing-library/react';
import useLoadCartItems from '../useLoadCartItems';

describe('useLoadCartItems test', () => {
  it('장바구니 상품 목록을 불러올 수 있다.', async () => {
    const { result } = renderHook(() => useLoadCartItems());

    await waitFor(async () => {
      expect(result.current.cartItems).toHaveLength(1);
    });
  });
});
