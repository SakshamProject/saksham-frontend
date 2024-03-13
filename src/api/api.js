import { appApi } from "./config";

// Get service
export const getApiServices = (path) => {
  return appApi.get(path);
};

export const getByIdApiServices = (path, id) => {
  return appApi.get(`${path}/${id}`);
};

// Post service
export const postApiServices = (path, value = {}) => {
  return appApi.post(`${path}`, value);
};

export const postUpdateApiServices = (path, id, value) => {
  return appApi.post(`${path}/${id}`, value);
};

// Update service
export const putApiServices = (path, value) => {
  return appApi.put(`${path}`, value);
};

export const updateApiServices = (path, id, value) => {
  return appApi.put(`${path}/${id}`, value);
};

// Delete service
export const deleteApiServices = (path, id) => {
  return appApi.delete(`${path}/${id}`);
};
