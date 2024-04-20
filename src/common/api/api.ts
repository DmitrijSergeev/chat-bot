import axios from "axios";

let baseURL;

if (process.env.NODE_ENV === "development") {
  baseURL = "http://localhost:8200/api/v1/";
} else if (process.env.NODE_ENV === "production") {
  baseURL = "https://cbhelper.admsoft-it.ru/api/v1/";
}

export const instance = axios.create({
  baseURL: baseURL,
});
