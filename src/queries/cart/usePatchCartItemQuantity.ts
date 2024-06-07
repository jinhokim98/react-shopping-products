import { fetchPatchCartItemQuantity } from '@apis/cartItems';
import { CartItem } from '@appTypes/cartItems';
import QUERY_KEYS from '@constants/queryKeys';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const usePatchCartItemQuantity = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending, isError, isSuccess } = useMutation({
    mutationKey: [QUERY_KEYS.patchCartItemQuantity],
    mutationFn: fetchPatchCartItemQuantity,
    onMutate: async ({ cartItemId, quantity }) => {
      await queryClient.cancelQueries({ queryKey: [QUERY_KEYS.getCartItems] });

      const newQuantity = quantity;
      const prevData = queryClient.getQueryData<CartItem[]>([QUERY_KEYS.getCartItems]);

      queryClient.setQueryData([QUERY_KEYS.getCartItems], (oldData: CartItem[]) => {
        const newData = oldData.map((item) =>
          item.id === cartItemId
            ? {
                ...item,
                quantity: newQuantity,
              }
            : item,
        );

        return newData;
      });

      return { prevData };
    },

    onError: (_, __, context) => {
      if (context?.prevData) {
        queryClient.setQueryData([QUERY_KEYS.getCartItems], context.prevData);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.getCartItems] });
    },
  });

  return {
    changeQuantity: mutate,
    isPending,
    isError,
    isSuccess,
  };
};

export default usePatchCartItemQuantity;
