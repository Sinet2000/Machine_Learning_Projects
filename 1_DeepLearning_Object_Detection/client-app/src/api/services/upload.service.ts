import axios from 'axios';

class UploadService {
    async uploadImage(imageData: any) {
        try {
            const formData = new FormData();
            formData.append('imageData', imageData);
            const response = await axios.post(`http://127.0.0.1:5000/upload`, formData, {
                headers: {
                  'Content-Type': 'multipart/form-data'
                }
              });
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}

export const uploadService = new UploadService();

