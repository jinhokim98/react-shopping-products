import { act, renderHook, waitFor } from '@testing-library/react';
import useDeleteCartItem from '../cart/useDeleteCartItem';
import { queryClient, wrapper } from './testUtil';
import useLoadCartItems from '@queries/cart/useLoadCartItems';

describe('delete cart item api test', () => {
  beforeEach(() => {
    queryClient.clear();
  });

  it('장바구니 목록을 제거하면 장바구니에서 해당 상품이 사라진다.', async () => {
    const CART_ITEM_ID = 3994;
    const { result } = renderHook(
      () => {
        const deleteQuery = useDeleteCartItem();
        const loadQuery = useLoadCartItems();
        return { deleteQuery, loadQuery };
      },
      { wrapper },
    );

    act(() => {
      result.current.deleteQuery.deleteCartItem(CART_ITEM_ID);
    });

    await waitFor(() => {
      expect(result.current.deleteQuery.isError).not.toBeTruthy();
    });

    await waitFor(() => {
      expect(result.current.loadQuery.cartItems?.find((item) => item.id === CART_ITEM_ID)).toBeUndefined();
    });
  });
});
