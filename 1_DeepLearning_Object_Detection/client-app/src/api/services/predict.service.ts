import axios from 'axios';


class PredictService {
    async predict(imageData: any) {
        try {
            const response = await axios.post(`${process.env.BACKEND_URL}/predict`, imageData);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}

export const predictService = new PredictService();
