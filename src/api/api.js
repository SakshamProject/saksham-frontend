import { appApi } from "./config";

export const getApiService = async (path) => {
  return await appApi.get(path);
};

export const getByIdApiService = async (path, id) => {
  return await appApi.get(`${path}/${id}`);
};

export const postApiService = async (path, value = {}, params = {}) => {
  return await appApi.post(path, value, { params: { ...params } });
};

export const postUpdateApiService = async (path, id, value = {}) => {
  return await appApi.post(`${path}/${id}`, value);
};

export const putApiService = async (path, value = {}) => {
  return await appApi.put(path, value);
};

export const updateApiService = async (path, id, value = {}) => {
  return await appApi.put(`${path}/${id}`, value);
};

export const deleteApiService = async (path, id) => {
  return await appApi.delete(`${path}/${id}`);
};
