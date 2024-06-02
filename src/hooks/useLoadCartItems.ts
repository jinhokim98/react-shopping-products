import { useEffect, useState } from 'react';
import { CartItem } from '@appTypes/index';
import { fetchGetCartItems } from '@apis/index';

const useLoadCartItems = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [cartItems, setCartItem] = useState<CartItem[]>([]);

  const getCartItemList = async () => {
    try {
      setLoading(true);
      setError('');
      const firstResult = await fetchGetCartItems();
      if (!firstResult) return;

      const { totalNumbers, cartItems, totalElements } = firstResult;

      if (totalElements === cartItems.length) {
        return setCartItem(cartItems);
      }
      // page-0인 장바구니 목록외에 더 데이터를 불러와야 할 경우
      const result = await fetchGetCartItems(totalNumbers);
      if (!result) return;

      setCartItem(result.cartItems);
    } catch (error) {
      const errorMessage = (error as Error).message;
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCartItemList();
  }, []);

  return {
    refetch: getCartItemList,
    cartItems,
    loading,
    error,
  };
};

export default useLoadCartItems;
