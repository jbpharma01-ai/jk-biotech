import api from "./api";

export const categoryService = {
  getAll: async () => {
    const res = await api.get("/categories/all");
    return res.data;
  },
  getActive: async () => {
    const res = await api.get("/categories");
    return res.data;
  },
  getById: async (id) => {
    const res = await api.get(`/categories/${id}`);
    return res.data;
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
