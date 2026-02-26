import api from './api';

export const fetchTasks = async ({ page, limit, status, search }) => {
  const params = {};
  if (page) params.page = page;
  if (limit) params.limit = limit;
  if (status) params.status = status;
  if (search) params.search = search;

  const res = await api.get('/tasks', { params });
  return res.data;
};

export const fetchTaskById = async (id) => {
  const res = await api.get(`/tasks/${id}`);
  return res.data;
};

export const createTask = async (payload) => {
  const res = await api.post('/tasks', payload);
  return res.data;
};

export const updateTask = async (id, payload) => {
  const res = await api.put(`/tasks/${id}`, payload);
  return res.data;
};

export const deleteTask = async (id) => {
  const res = await api.delete(`/tasks/${id}`);
  return res.data;
};
