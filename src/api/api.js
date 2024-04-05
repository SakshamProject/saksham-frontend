import { appApi } from "./config";

// get service
export const getApiService = (path) => {
  return appApi.get(path);
};

export const getByIdApiService = (path, id) => {
  return appApi.get(`${path}/${id}`);
};

// post service
export const postApiService = (path, value = {}) => {
  return appApi.post(`${path}`, value);
};

export const postUpdateApiService = (path, id, value = {}) => {
  return appApi.post(`${path}/${id}`, value);
};

// update service
export const putApiService = (path, value = {}) => {
  return appApi.put(`${path}`, value);
};

export const updateApiService = (path, id, value = {}) => {
  return appApi.put(`${path}/${id}`, value);
};

// delete service
export const deleteApiService = (path, id) => {
  return appApi.delete(`${path}/${id}`);
};
