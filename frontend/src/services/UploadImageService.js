const CLOUD_NAME = "dvucvwyaa";
const UPLOAD_PRESET = "majix_img";

export const UploadImageService = async (file) => {
  if (!file) {
    return null; // No file to upload
  }
  
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error("Cloudinary upload failed");
    }

    const data = await response.json();
    return data.secure_url; 

  } catch (error) {
    console.error("Error uploading file:", error);
    return null;
  }
};