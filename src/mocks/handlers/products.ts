import { END_POINTS } from '@apis/endPoints';
import { Category, PriceSort, Product } from '@appTypes/index';
import products from '@mocks/data/products.json';
import { makeServerResponse } from '@mocks/utils/serverResponse';
import { http, HttpResponse } from 'msw';

const filterProducts = (category: Category | null, products: Product[]) => {
  if (!category) return products;

  return products.filter((product) => product.category === category);
};

const sortProducts = (sort: PriceSort | null, products: Product[]) => {
  if (sort === 'price,asc' || !sort) {
    return products.sort((prev, cur) => prev.price - cur.price);
  }
  return products.sort((prev, cur) => cur.price - prev.price);
};

const INIT_PAGE = 0;
const INITIAL_PAGE_SIZE = 20;
const AFTER_INITIAL_PAGE_SIZE = 4;
const ADJUSTMENT_NUMBER = 5; // initialPageSize / afterInitialPageSize

const productsHandler = [
  http.get(END_POINTS.products, async ({ request }) => {
    const url = new URL(request.url);
    const page = Number(url.searchParams.get('page'));
    const size = Number(url.searchParams.get('size'));
    const category = url.searchParams.get('category') as Category | null;
    const sort = url.searchParams.get('sort') as PriceSort | null;

    const filteredProducts = filterProducts(category, products as Product[]);
    const sortedProducts = sortProducts(sort, filteredProducts);

    const limit = page === INIT_PAGE ? INITIAL_PAGE_SIZE : AFTER_INITIAL_PAGE_SIZE;
    const start = page === INIT_PAGE ? 0 : (page - ADJUSTMENT_NUMBER) * AFTER_INITIAL_PAGE_SIZE + INITIAL_PAGE_SIZE;
    const end = start + limit;

    const response = makeServerResponse<Product[]>({
      page: Number(page),
      size: Number(size),
      content: sortedProducts.slice(start, end),
    });

    return HttpResponse.json(response);
  }),
];

export default productsHandler;
