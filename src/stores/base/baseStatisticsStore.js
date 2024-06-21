import { defineStore } from 'pinia';
import { PAGE_ITEMS_LIMIT } from 'src/constants';
import { getStatistics } from 'src/services/api/base/baseStatisticsRepos';

export function createStatisticsStore(storeName, endpoint) {
  return defineStore(storeName, {
    state: () => ({
      date: null,
      operator: '',
      statistics: [],
      totalItems: 0,
    }),
    actions: {
      async searchItems(params) {
        try {
          const response = await getStatistics(`${endpoint}/statistics`, { params });
          if (response.status === 200) {
            this.statistics = response.data.items;
            this.totalItems = response.data.totalCount;
          }
        } catch (error) {
          //throw new Error('Failed to search statistics');
        }
      },

      async resetPagination() {
        const searchParams  = {
          limit: PAGE_ITEMS_LIMIT,
          offset: 0,
        }
        await this.searchItems(searchParams);
      },
    }
  });
}
