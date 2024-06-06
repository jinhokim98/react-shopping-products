import { fetchDeleteCartItems } from '@apis/index';
import QUERY_KEYS from '@constants/queryKeys';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useDeleteCartItem = () => {
  const deleteCartItem = async (cartItemId: number) => {
    await fetchDeleteCartItems({ cartItemId });
  };

  const queryClient = useQueryClient();

  const { mutate, isPending, isError } = useMutation({
    mutationKey: [QUERY_KEYS.deleteCartItem],
    mutationFn: deleteCartItem,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.getCartItems],
      });
    },
  });

  return {
    deleteCartItem: mutate,
    isPending,
    isError,
  };
};

export default useDeleteCartItem;
