import axios from "axios";
import { base_url } from "../../helpers/url";
import store from "../../../store";

const request = axios.create({
  baseURL: base_url,
});

request.interceptors.response.use((response) => {
  return response;
});

export const client = request;
