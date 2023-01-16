import axios from 'axios';

class UploadService {
    async uploadImage(imageData: any) {
        try {
            const response = await axios.post(`${process.env.BACKEND_URL}/upload`, imageData);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}

export const uploadService = new UploadService();

