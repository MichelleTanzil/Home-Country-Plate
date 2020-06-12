import axios, { AxiosResponse } from "axios";
import { IProduct } from "../models/product";
import { history } from "../..";
import { toast } from "react-toastify";

axios.defaults.baseURL = "http://localhost:5000/api";

axios.interceptors.response.use(undefined, (error) => {
  const { status, data, config } = error.response;
  if (error.message === "Network error" && error.response === undefined) {
    toast.error("Network error");
  }
  if (status === 404) {
    history.push("/notfound"); //this works because in index.tsx App is wrapped in Router, makes it accessible in the agent
  }
  if (
    status === 400 &&
    config.method === "get" &&
    data.errors.hasOenProperty("id")
  ) {
    history.push("/notfound");
  }
  if (status === 500) {
    toast.error("Server error - check the terminal for more info");
  }
});

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
  get: (url: string) => axios.get(url).then(responseBody),
  post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
  put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
  delete: (url: string) => axios.delete(url).then(responseBody),
};

const Products = {
  list: (): Promise<IProduct[]> => requests.get("/products"),
  details: (id: string) => requests.get(`/products/${id}`),
  create: (product: IProduct) => requests.post("/products", product),
  update: (product: IProduct) =>
    requests.put(`/products/${product.id}`, product),
  delete: (id: string) => requests.delete(`/products/${id}`),
};

export default {
  Products,
};
