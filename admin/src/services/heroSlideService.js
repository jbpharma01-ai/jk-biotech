import api from "./api";

export const heroSlideService = {
  getAll: async () => {
    const res = await api.get("/hero-slides/all");
    return res.data;
  },
  getActive: async () => {
    const res = await api.get("/hero-slides");
    return res.data;
  },
  getById: async (id) => {
    const res = await api.get(`/hero-slides/${id}`);
    return res.data;
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
