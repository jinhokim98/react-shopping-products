import { Filtering, Product, ServerResponse } from '@appTypes/index';
import { fetchWithToken } from '@utils/index';

import { END_POINTS } from './endPoints';

interface FetchProductParameter {
  filtering: Filtering;
  page?: number;
}

const getSearchParams = ({ filtering, page }: FetchProductParameter): URLSearchParams => {
  const searchParams = new URLSearchParams();

  if (filtering.category !== '') {
    searchParams.append('category', filtering.category);
  }

  searchParams.append('sort', filtering.sort);
  searchParams.append('page', String(page));

  if (page !== 0) {
    searchParams.append('size', '4');
  }

  return searchParams;
};

export async function fetchProduct(params: FetchProductParameter): Promise<{ products: Product[]; isLast: boolean }> {
  const searchParams = '?' + getSearchParams({ ...params, page: params.page ?? 0 }).toString();

  const data = await fetchWithToken({
    url: END_POINTS.products + searchParams,
    method: 'GET',
  });
  const result = (await data.json()) as ServerResponse<Product[]>;

  return { products: result.content, isLast: result.last };
}
