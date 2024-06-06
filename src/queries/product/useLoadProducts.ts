import { Filtering } from '@appTypes/index';
import { fetchProduct } from '@apis/index';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import QUERY_KEYS from '@constants/queryKeys';

const useLoadProducts = (filtering: Filtering) => {
  const { data, isFetchingNextPage, isError, isSuccess, fetchNextPage } = useSuspenseInfiniteQuery({
    queryKey: [QUERY_KEYS.getProducts, { filtering }],
    queryFn: ({ pageParam }) => fetchProduct({ filtering, page: pageParam }),
    initialPageParam: 0,
    getNextPageParam: (data) => {
      if (data.isLast) return null;
      if (data.page === 0) return 5;
      return data.page + 1;
    },
  });

  return {
    products: data.pages.map((page) => page.products).flat(),
    fetchNextPage,
    isLoading: isFetchingNextPage,
    isError,
    isSuccess,
  };
};

export default useLoadProducts;
