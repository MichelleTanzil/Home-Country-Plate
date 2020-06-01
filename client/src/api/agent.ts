import axios, { AxiosResponse } from "axios";
import {IProduct} from "../models/product";
import { request } from "http";

axios.defaults.baseURL = "http://localhost:5000/api";

const Products = {
}