import { act, renderHook, waitFor } from '@testing-library/react';
import useLoadProducts from '../useLoadProducts';
import { CATEGORY_OPTIONS } from '@constants/index';
import { Category } from '@appTypes/index';

describe('useLoadProducts test', () => {
  describe('context: 상품 로드, 무한 스크롤 테스트', () => {
    it('처음 데이터를 로드할 때 상품은 20개이다.', async () => {
      const { result } = renderHook(() => useLoadProducts({ category: '', sort: 'price,asc' }));

      act(() => {
        result.current.refreshByFiltering();
      });

      await waitFor(async () => {
        expect(result.current.products).toHaveLength(20);
      });
    });

    it('다음 목록을 불러올 때 상품 4개를 불러오게 된다.', async () => {
      const { result } = renderHook(() => useLoadProducts({ category: '', sort: 'price,asc' }));

      act(() => {
        result.current.refreshByFiltering();
      });

      await waitFor(async () => {
        expect(result.current.products).toHaveLength(20);
      });

      act(() => {
        result.current.loadNextPage();
      });

      await waitFor(async () => {
        expect(result.current.products).toHaveLength(24);
      });
    });

    it('마지막 목록을 불러오고 다음 상품을 불러올 때 상품을 불러오지 않는다.', async () => {
      const { result } = renderHook(() => useLoadProducts({ category: '', sort: 'price,asc' }));

      act(() => {
        result.current.refreshByFiltering();
      });

      await waitFor(async () => {
        expect(result.current.products.length).toBe(20);
      });

      for (let i = 1; i < 21; i++) {
        await waitFor(() => {
          act(() => {
            result.current.loadNextPage();
          });
        });

        const expectedLength = 20 + i * 4;

        await waitFor(() => {
          expect(result.current.products).toHaveLength(expectedLength);
        });
      }

      act(() => {
        result.current.loadNextPage();
      });

      await waitFor(async () => {
        expect(result.current.products).toHaveLength(100);
      });
    });
  });

  describe('상품 필터링 테스트', () => {
    it('전체 선택 시, 모든 상품 목록을 보여준다', async () => {
      const CATEGORY_LENGTH = CATEGORY_OPTIONS.filter((options) => !!options.value).length;
      const { result } = renderHook(() => useLoadProducts({ category: '', sort: 'price,asc' }));

      act(() => {
        result.current.refreshByFiltering();
      });

      await waitFor(async () => {
        const categorySet = new Set(result.current.products.map((product) => product.category));
        expect(categorySet.size).toBe(CATEGORY_LENGTH);
      });
    });

    it('카테고리 선택 시, 해당 카테고리 상품만 보여준다', async () => {
      const category = CATEGORY_OPTIONS[1].value as Category;
      const { result } = renderHook(() => useLoadProducts({ category, sort: 'price,asc' }));

      act(() => {
        result.current.refreshByFiltering();
      });

      await waitFor(async () => {
        const isAllCategory = result.current.products.every((product) => product.category === category);
        expect(isAllCategory).toBeTruthy();
      });
    });
  });

  describe('가격 정렬 테스트', () => {
    it('오름차순 선택 시, 상품 각각의 오름차순으로 목록을 보여준다', async () => {
      const { result } = renderHook(() => useLoadProducts({ category: '', sort: 'price,asc' }));

      act(() => {
        result.current.refreshByFiltering();
      });

      await waitFor(async () => {
        const [first, second] = result.current.products;
        expect(first.price <= second.price).toBeTruthy();
      });
    });
    it('내림차순 선택 시, 상품 각겨의 내림차순으로 목록을 보여준다', async () => {
      const { result } = renderHook(() => useLoadProducts({ category: '', sort: 'price,asc' }));

      act(() => {
        result.current.refreshByFiltering();
      });

      await waitFor(async () => {
        const [first, second] = result.current.products;
        expect(first.price >= second.price).toBeTruthy();
      });
    });
  });
});
