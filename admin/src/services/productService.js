import api, { cachedGet } from "./api";

export const productService = {
  getAll: async (bypassCache = false) => {
    return await cachedGet("/products/all", { ttl: 20000, bypassCache });
  },
  getActive: async (bypassCache = false) => {
    return await cachedGet("/products", { ttl: 20000, bypassCache });
  },
  getById: async (id, bypassCache = false) => {
    return await cachedGet(`/products/${id}`, { ttl: 20000, bypassCache });
  },
  getByCategory: async (catIdOrSlug, bypassCache = false) => {
    return await cachedGet(`/products/category/${catIdOrSlug}`, { ttl: 20000, bypassCache });
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
