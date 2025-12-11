import axios from 'axios';

export const UploadImageService = async (file) => {
  const formData = new FormData();
  formData.append('file', file); 

  const response = await axios.post('http://localhost:8081/api/images/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });

  return response.data.imageUrl;
};