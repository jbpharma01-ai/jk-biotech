import api from "./api";

export const enquiryService = {
  getAll: async (status = "") => {
    const params = status ? { status } : {};
    const res = await api.get("/enquiries", { params });
    return res.data;
  },
  getById: async (id) => {
    const res = await api.get(`/enquiries/${id}`);
    return res.data;
  },
  updateStatus: async (id, payload) => {
    const res = await api.patch(`/enquiries/${id}/status`, payload);
    return res.data;
  },
  delete: async (id) => {
    const res = await api.delete(`/enquiries/${id}`);
    return res.data;
  },
};
