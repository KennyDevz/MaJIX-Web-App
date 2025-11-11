import axios from "axios";

const CLOUD_NAME = "dvucvwyaa";
const UPLOAD_PRESET = "majix_img";

const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

export const UploadImageService = async (file) => {
  if (!file) {
    return null;
  }
  
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);

  try {
    const response = await axios.post(UPLOAD_URL, formData);
    return response.data.secure_url;
  } catch (error) {
    console.error("Error uploading file:", error.response?.data || error.message);
    return null;
  }
};