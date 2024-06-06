import { act, renderHook, waitFor } from '@testing-library/react';
import { wrapper } from './testUtil';
import usePatchCartItemQuantity from '@queries/cart/usePatchCartItemQuantity';

describe('change cart item quantity api test', () => {
  it('장바구니 목록을 제거할 수 있다.', async () => {
    const CART_ITEM_ID = 113;
    const { result } = renderHook(() => usePatchCartItemQuantity(), { wrapper });

    act(() => {
      result.current.changeQuantity({ cartItemId: CART_ITEM_ID, quantity: 2 });
    });

    await waitFor(() => {
      expect(result.current.isError).not.toBeTruthy();
    });
  });
});
