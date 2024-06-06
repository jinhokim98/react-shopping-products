import { useEffect } from 'react';
import { fetchGetCartItems } from '@apis/index';
import { useQuery } from '@tanstack/react-query';
import QUERY_KEYS from '@constants/queryKeys';

const useLoadCartItems = () => {
  const getCartItemList = async () => {
    const firstResult = await fetchGetCartItems();
    const { totalNumbers, cartItems, totalElements } = firstResult;

    if (totalElements === cartItems.length) {
      return firstResult.cartItems;
    }
    // page-0인 장바구니 목록외에 더 데이터를 불러와야 할 경우
    const result = await fetchGetCartItems(totalNumbers);
    return result.cartItems;
  };

  const { data, isLoading, isSuccess, isError } = useQuery({
    queryKey: [QUERY_KEYS.getCartItems],
    queryFn: getCartItemList,
  });

  useEffect(() => {
    getCartItemList();
  }, []);

  return {
    cartItems: data,
    isLoading,
    isSuccess,
    isError,
  };
};

export default useLoadCartItems;
