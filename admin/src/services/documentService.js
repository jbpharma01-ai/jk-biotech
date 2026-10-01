import api from "./api";

export const documentService = {
  getAll: async () => {
    const res = await api.get("/documents/all");
    return res.data;
  },
  getActive: async () => {
    const res = await api.get("/documents");
    return res.data;
  },
  getByCategory: async (idOrSlug) => {
    const res = await api.get(`/documents/category/${idOrSlug}`);
    return res.data;
  },
  create: async (formData) => {
    const res = await api.post("/documents", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  },
  update: async (id, data) => {
    const isFormData = data instanceof FormData;
    const res = await api.put(`/documents/${id}`, data, {
      headers: isFormData ? { "Content-Type": "multipart/form-data" } : undefined,
    });
    return res.data;
  },
  deactivate: async (id) => {
    const res = await api.patch(`/documents/${id}/deactivate`);
    return res.data;
  },
  activate: async (id) => {
    const res = await api.put(`/documents/${id}`, { isActive: true });
    return res.data;
  },
  delete: async (id) => {
    const res = await api.delete(`/documents/${id}`);
    return res.data;
  },
};
