import { createStatisticsStore } from 'src/stores/base/baseStatisticsStore';

export const useClientsStatisticsStore = createStatisticsStore('clientsStatisticsStore', 'clients')