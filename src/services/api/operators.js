import apiClient from '@/services/api/apiClient';

export const getOperators = async() => {
    try {
    const response = await apiClient.get('/operators');
    return response.data;
    } catch (error) {
        throw new Error('Failed to fetch operators');
    }
}

//export default { getOperators };