import { ServerResponse } from '@appTypes/index';

interface MakeServerResponseParams<T> {
  page: number;
  size: number;
  content: T;
}
export function makeServerResponse<T>({ page, size, content }: MakeServerResponseParams<T>): ServerResponse<T> {
  return {
    content,
    pageable: {
      sort: {
        sorted: false,
        unsorted: true,
        empty: true,
      },
      pageNumber: page,
      pageSize: size,
      offset: 0,
      paged: true,
      unpaged: false,
    },
    last: page >= 24,
    totalPages: 100,
    totalElements: 100,
    sort: {
      sorted: false,
      unsorted: true,
      empty: true,
    },
    first: true,
    number: 0,
    numberOfElements: 100,
    size,
    empty: false,
  };
}
