import api, { cachedGet } from "./api";

export const heroSlideService = {
  getAll: async (bypassCache = false) => {
    return await cachedGet("/hero-slides/all", { ttl: 20000, bypassCache });
  },
  getActive: async (bypassCache = false) => {
    return await cachedGet("/hero-slides", { ttl: 20000, bypassCache });
  },
  getById: async (id, bypassCache = false) => {
    return await cachedGet(`/hero-slides/${id}`, { ttl: 20000, bypassCache });
  },
  create: async (formData) => {
    const res = await api.post("/hero-slides", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  },
  update: async (id, data) => {
    const isFormData = data instanceof FormData;
    const res = await api.put(`/hero-slides/${id}`, data, {
      headers: isFormData ? { "Content-Type": "multipart/form-data" } : undefined,
    });
    return res.data;
  },
  deactivate: async (id) => {
    const res = await api.patch(`/hero-slides/${id}/deactivate`);
    return res.data;
  },
  activate: async (id) => {
    const res = await api.put(`/hero-slides/${id}`, { isActive: true });
    return res.data;
  },
  delete: async (id) => {
    const res = await api.delete(`/hero-slides/${id}`);
    return res.data;
  },
};
