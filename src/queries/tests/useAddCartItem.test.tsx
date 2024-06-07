import useAddCartItem from '@queries/cart/useAddCartItem';
import { act, renderHook, waitFor } from '@testing-library/react';
import { wrapper } from './testUtil';
import useLoadCartItems from '@queries/cart/useLoadCartItems';

describe('add cart item api test', () => {
  it('장바구니 목록에 114번을 담으면 장바구니 목록에 114번이 담기게 된다.', async () => {
    const PRODUCT_ID = 114;
    const { result } = renderHook(
      () => {
        const addQuery = useAddCartItem();
        const loadQuery = useLoadCartItems();
        return { addQuery, loadQuery };
      },
      { wrapper },
    );

    act(() => {
      expect(result.current.addQuery.addCartItem({ productId: PRODUCT_ID }));
    });

    await waitFor(() => {
      expect(result.current.addQuery.isError).not.toBeTruthy();
    });

    await waitFor(() => {
      expect(result.current.loadQuery.cartItems?.find((item) => item.product.id === PRODUCT_ID)).not.toBeUndefined();
    });
  });
});
