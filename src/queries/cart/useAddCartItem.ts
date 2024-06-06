import { fetchPostCartItems } from '@apis/index';
import QUERY_KEYS from '@constants/queryKeys';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useAddCartItem = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending, isError } = useMutation({
    mutationKey: [QUERY_KEYS.postCartItem],
    mutationFn: fetchPostCartItems,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.getCartItems],
      });
    },
  });

  return {
    addCartItem: mutate,
    isPending,
    isError,
  };
};

export default useAddCartItem;
