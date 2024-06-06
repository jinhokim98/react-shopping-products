import { act, renderHook, waitFor } from '@testing-library/react';
import useDeleteCartItem from '../cart/useDeleteCartItem';
import { wrapper } from './testUtil';

describe('delete cart item api test', () => {
  it('장바구니 목록을 제거할 수 있다.', async () => {
    const CART_ITEM_ID = 113;
    const { result } = renderHook(() => useDeleteCartItem(), { wrapper });

    act(() => {
      result.current.deleteCartItem(CART_ITEM_ID);
    });

    await waitFor(() => {
      expect(result.current.isError).not.toBeTruthy();
    });
  });
});
