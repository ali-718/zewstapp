import axios from "axios";
import { base_url } from "../../helpers/url";
import store from "../../../store";

const request = axios.create({
  baseURL: 'https://ea14-59-103-213-13.ngrok.io/dev/',
});

request.interceptors.response.use((response) => {
  return response;
});

export const client = request;
