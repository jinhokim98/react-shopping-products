import { renderHook, waitFor } from '@testing-library/react';
import useLoadCartItems from '../cart/useLoadCartItems';
import { wrapper } from './testUtil';

describe('useLoadCartItems test', () => {
  it('장바구니 상품 목록을 불러올 수 있다.', async () => {
    const { result } = renderHook(() => useLoadCartItems(), { wrapper });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    await waitFor(async () => {
      expect(result.current.cartItems).toHaveLength(1);
    });
  });
});
