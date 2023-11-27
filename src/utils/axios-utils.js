import axios from "axios";

const client = axios.create({ baseURL: "http://localhost:4000" });

export const request = ({ ...option }) => {
  client.defaults.headers.common.Authorization = "Bearer token";
  const onSuccess = (response) => response;
  const onError = (error) => {
    return error;
  };
  return client(option).then(onSuccess).catch(onError);
};
