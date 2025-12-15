import axios from "axios";

export const uploadImage = async (photo) => {
  const formData = new FormData();
  formData.append("image", photo);
  const imgURL = `https://api.imgbb.com/1/upload?key=${
    import.meta.env.VITE_IMG
  }`;
  const res = await axios.post(imgURL, formData);
  return res.data.data.url;
};
