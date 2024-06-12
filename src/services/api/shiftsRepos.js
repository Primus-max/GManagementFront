import apiClient from 'src/services/api/apiClient';

export const getShifts = async () => {
    try {
        const response = await apiClient.get('/shifts');
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch shifts');
    };
}

export const postShift  = async  (data)  =>  {
    try {
        const response = await apiClient.post('/shifts/start-shift', data);
        return response;
    } catch (error) {
        throw new Error('Failed to add shift');
    };
}