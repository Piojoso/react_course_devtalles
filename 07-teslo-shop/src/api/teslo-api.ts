import axios from "axios";

const tesloApi = axios.create({
  baseURL: import.meta.env.VITE_BACK_API_URL,
});

export { tesloApi };
