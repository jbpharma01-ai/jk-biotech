import api from "./api";

export const documentCategoryService = {
  getAll: async () => {
    const res = await api.get("/document-categories/all");
    return res.data;
  },
  getActive: async () => {
    const res = await api.get("/document-categories");
    return res.data;
  },
  create: async (data) => {
    const res = await api.post("/document-categories", data);
    return res.data;
  },
  update: async (id, data) => {
    const res = await api.put(`/document-categories/${id}`, data);
    return res.data;
  },
  deactivate: async (id) => {
    const res = await api.patch(`/document-categories/${id}/deactivate`);
    return res.data;
  },
  activate: async (id) => {
    const res = await api.put(`/document-categories/${id}`, { isActive: true });
    return res.data;
  },
  delete: async (id) => {
    const res = await api.delete(`/document-categories/${id}`);
    return res.data;
  },
};
