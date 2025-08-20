import api from "./api";

const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append("image", file); // the backend expects "image"

  const resp = await api.post(`/packages/upload-image`, formData, {
    headers: { "Content-Type": "multipart/form-data" }
  });
  return resp.data.imageUrl; // the URL S3 returns
};

export default uploadImage;
