import axios from 'axios';

export default async function cloudinary(file: Blob|string) {
    const cloudName = 'dx4g5ugsm';
    const uploadPreset = 'ml_default';

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', uploadPreset);

    try {
        const response = await axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/upload`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        return response.data;
    } catch (error) {
        console.error('Erro no upload:', error);
        throw error;
    }
}
