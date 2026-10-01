import api from "./api";

export const productService = {
  getAll: async () => {
    const res = await api.get("/products/all");
    return res.data;
  },
  getActive: async () => {
    const res = await api.get("/products");
    return res.data;
  },
  getById: async (id) => {
    const res = await api.get(`/products/${id}`);
    return res.data;
  },
  getByCategory: async (catIdOrSlug) => {
    const res = await api.get(`/products/category/${catIdOrSlug}`);
    return res.data;
  },
  create: async (formData) => {
    const res = await api.post("/products", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  },
  update: async (id, data) => {
    const isFormData = data instanceof FormData;
    const res = await api.put(`/products/${id}`, data, {
      headers: isFormData ? { "Content-Type": "multipart/form-data" } : undefined,
    });
    return res.data;
  },
  deactivate: async (id) => {
    const res = await api.patch(`/products/${id}/deactivate`);
    return res.data;
  },
  activate: async (id) => {
    const res = await api.put(`/products/${id}`, { isActive: true });
    return res.data;
  },
  delete: async (id) => {
    const res = await api.delete(`/products/${id}`);
    return res.data;
  },
};
