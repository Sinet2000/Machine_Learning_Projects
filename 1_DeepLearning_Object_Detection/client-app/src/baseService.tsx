// baseService.ts
import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000",
});

export const baseService = {
  post: (url: string, data: any) => instance.post(url, data),
};
