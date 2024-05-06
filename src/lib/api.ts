import axios from "axios";

export const API = axios.create({
  baseURL: process.env.HOST_URL as string,
});
