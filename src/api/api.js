import { appApi } from "./config";

// Get services
export const getApiService = (path) => {
  return appApi.get(path);
};

export const getByIdApiService = (path, id) => {
  return appApi.get(`${path}/${id}`);
};

// Post services
export const postApiService = (path, value = {}) => {
  return appApi.post(`${path}`, value);
};

export const postUpdateApiService = (path, id, value = {}) => {
  return appApi.post(`${path}/${id}`, value);
};

// Update services
export const putApiService = (path, value = {}) => {
  return appApi.put(`${path}`, value);
};

export const updateApiService = (path, id, value = {}) => {
  return appApi.put(`${path}/${id}`, value);
};

// Delete service
export const deleteApiService = (path, id) => {
  return appApi.delete(`${path}/${id}`);
};
