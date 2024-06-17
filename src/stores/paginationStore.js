import { defineStore } from 'pinia';

export const usePagination = () => {
  const state = {
    limit: 10,
    offset: 0,
  };

  const actions = {
    updateLimit(newLimit) {
      state.limit = newLimit;
    },
    updateOffset(newOffset) {
      state.offset = newOffset;
    },
    async resetPagination() {
      state.limit = 10;
      state.offset = 0;
    },
    async paginate(fetchFunction, searchParams) {
      searchParams.limit = state.limit;
      searchParams.offset = state.offset;
      await fetchFunction(searchParams);
    },
  };

  return { state, actions };
};

// Экспортируем метод для использования в сторах
export const useStorePagination = (storeName, fetchFunction) => {
  return defineStore(storeName, () => ({
    state: () => ({
      ...usePagination().state,
    }),
    actions: {
      ...usePagination().actions,
      async paginateWithStore(searchParams) {
        await usePagination().actions.paginate(fetchFunction, searchParams);
      },
    },
  }));
};
