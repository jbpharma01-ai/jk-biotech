import api, { cachedGet } from "./api";

export const categoryService = {
  getAll: async (bypassCache = false) => {
    return await cachedGet("/categories/all", { ttl: 30000, bypassCache });
  },
  getActive: async (bypassCache = false) => {
    return await cachedGet("/categories", { ttl: 30000, bypassCache });
  },
  getById: async (id, bypassCache = false) => {
    return await cachedGet(`/categories/${id}`, { ttl: 30000, bypassCache });
  },
  create: async (formData) => {
    const res = await api.post("/categories", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  },
  update: async (id, data) => {
    const isFormData = data instanceof FormData;
    const res = await api.put(`/categories/${id}`, data, {
      headers: isFormData ? { "Content-Type": "multipart/form-data" } : undefined,
    });
    return res.data;
  },
  deactivate: async (id) => {
    const res = await api.patch(`/categories/${id}/deactivate`);
    return res.data;
  },
  activate: async (id) => {
    const res = await api.put(`/categories/${id}`, { isActive: true });
    return res.data;
  },
  delete: async (id) => {
    const res = await api.delete(`/categories/${id}`);
    return res.data;
  },
};
