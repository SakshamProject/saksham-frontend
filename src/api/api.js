import { appApi } from "./config";

// Get services
export const getApiService = async (path) => {
  return await appApi.get(path);
};

export const getByIdApiService = async (path, id) => {
  return await appApi.get(`${path}/${id}`);
};

// Post services
export const postApiService = async (path, value = {}) => {
  return await appApi.post(path, value);
};

export const postUpdateApiService = async (path, id, value = {}) => {
  return await appApi.post(`${path}/${id}`, value);
};

// Update services
export const putApiService = async (path, value = {}) => {
  return await appApi.put(path, value);
};

export const updateApiService = async (path, id, value = {}) => {
  return await appApi.put(`${path}/${id}`, value);
};

// Delete service
export const deleteApiService = async (path, id) => {
  return await appApi.delete(`${path}/${id}`);
};
