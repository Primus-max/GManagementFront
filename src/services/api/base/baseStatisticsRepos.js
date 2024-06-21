import apiClient from 'src/services/api/apiClient';

export const getStatistics = async(endpoint, params) => {
    try {
    const response = await apiClient.get(endpoint, params);
    return response;
    } catch (error) {
        //throw new Erro('Failed to fetch statistics');
    }
};