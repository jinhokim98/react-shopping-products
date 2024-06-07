import { act, renderHook, waitFor } from '@testing-library/react';
import { queryClient, wrapper } from './testUtil';
import useLoadCartItems from '@queries/cart/useLoadCartItems';
import usePatchCartItemQuantity from '@queries/cart/usePatchCartItemQuantity';

describe('change cart item quantity api test', () => {
  beforeEach(() => {
    queryClient.clear();
  });

  it('장바구니 수량을 변경하게 되면 변경된 값으로 수정된다.', async () => {
    const CART_ITEM_ID = 3994;
    const NEW_QUANTITY = 2;

    const { result } = renderHook(
      () => {
        const patchQuery = usePatchCartItemQuantity();
        const loadQuery = useLoadCartItems();
        return { patchQuery, loadQuery };
      },
      { wrapper },
    );

    await waitFor(() => {
      expect(result.current.loadQuery.isSuccess).toBeTruthy();
    });

    act(() => {
      result.current.patchQuery.changeQuantity({ cartItemId: CART_ITEM_ID, quantity: NEW_QUANTITY });
    });

    await waitFor(() => {
      expect(result.current.patchQuery.isSuccess).toBeTruthy();
    });

    await waitFor(() => {
      const target = result.current.loadQuery.cartItems?.find((item) => item.id === CART_ITEM_ID);
      expect(target?.quantity).toBe(NEW_QUANTITY);
    });
  });
});
