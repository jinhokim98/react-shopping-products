import useAddCartItem from '@queries/cart/useAddCartItem';
import { act, renderHook, waitFor } from '@testing-library/react';
import { wrapper } from './testUtil';

describe('add cart item api test', () => {
  it('장바구니 목록을 추가할 수 있다.', async () => {
    const PRODUCT_ID = 113;
    const { result } = renderHook(() => useAddCartItem(), { wrapper });

    act(() => {
      expect(result.current.addCartItem({ productId: PRODUCT_ID }));
    });

    await waitFor(() => {
      expect(result.current.isError).not.toBeTruthy();
    });
  });
});
