import axios, { AxiosResponse } from "axios";
import { IProduct } from "../models/product";

axios.defaults.baseURL = "http://localhost:5000/api";

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
  get: (url: string) => axios.get(url).then(responseBody),
  post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
  put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
  delete: (url: string) => axios.delete(url).then(responseBody),
};

const Products = {
  list: () :Promise<IProduct[]>=> requests.get("/products"),
  details: (id: string) => requests.get(`/products/${id}`),
  create: (product: IProduct) => requests.post("/activities", product),
  update: (id: string, product: IProduct) =>
    requests.put(`/products/${id}`, product),
  delete: (id: string) => requests.delete(`/products/${id}`),
};

export default {
  Products,
};
