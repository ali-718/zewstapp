import axios from "axios";
import { auth_base_url } from "../../helpers/url";
import store from "../../../store";

const request = axios.create({
  baseURL: auth_base_url,
});

request.interceptors.request.use(async (config) => {
  const token = store.getState().auth.user?.token?.accessToken.jwtToken || null;

  config.headers["Content-Type"] = "application/json";
  if (token !== null) config.headers["accessToken"] = token;
  return config;
});

request.interceptors.response.use((response) => {
  return response;
});

export const authClient = request;
