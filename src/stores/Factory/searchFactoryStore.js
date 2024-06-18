// src/factories/searchFactory.js
import {
  onMounted,
  ref,
} from 'vue';

import { PAGE_ITEMS_LIMIT } from 'src/constants';
import { useSearchStatisticsStore } from 'src/stores/operatorsStore';
import { useShiftsStore } from 'src/stores/shiftsStore';

// Дополнительно импортируйте другие store, если потребуется.

export function useSearchFactory(searchType) {
  const date = ref(null);
  const selectedUser = ref(null);
  let store = null;
  let fetchItemsMethod = null;
  let searchMethod = null;
  let resetPaginationMethod = null;

  switch (searchType) {
    case 'operators':
      store = useSearchStatisticsStore();
      fetchItemsMethod = store.fetchItems;
      searchMethod = store.searchItems; 
      resetPaginationMethod = store.resetPagination;
      break;

    case 'shifts':
      store = useShiftsStore();
      fetchItemsMethod = store.fetchShiftsWithDetails;
      searchMethod = store.searchItems;
      resetPaginationMethod = store.resetPagination;
      break;

    // Добавьте другие кейсы для 'girls', 'clients' и т.д.

    default:
      throw new Error(`Unknown search type: ${searchType}`);
  }

  onMounted(async () => {
    if (fetchItemsMethod) {
      await fetchItemsMethod();
    }
  });

  const updateDate = (value) => {
    date.value = value;
  };

  const updateUser = (value) => {
    selectedUser.value = value;
  };

  const search = async () => {
    const searchParams = {
      startDate: date.value ? date.value[0] : null,
      endDate: date.value ? date.value[1] : null,
      limit: PAGE_ITEMS_LIMIT,
      offset: 0,
      operator: selectedUser.value,
    };

    if (searchMethod) {
      await searchMethod(searchParams);
    }
  };

  const reset = async () => {
    if (resetPaginationMethod) {
      await resetPaginationMethod();
    }
    date.value = null;
    selectedUser.value = null;
  };

  return {
    date,
    selectedUser,
    updateDate,
    updateUser,
    search,
    reset,
    store,
  };
}
