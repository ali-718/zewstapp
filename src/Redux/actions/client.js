import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { base_url } from "../../helpers/url";

const request = axios.create({
  baseURL: base_url,
});

request.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("refreshToken");

  config.headers["Content-Type"] = "application/json";
  if (token !== null) config.headers["x-token"] = `Bearer ${token}`;
  return config;
});

request.interceptors.response.use((response) => {
  return response;
});

export const client = request;
