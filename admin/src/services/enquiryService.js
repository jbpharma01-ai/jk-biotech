import api, { cachedGet } from "./api";

export const enquiryService = {
  getAll: async (status = "", bypassCache = false) => {
    const params = status ? { status } : {};
    return await cachedGet("/enquiries", { params, ttl: 15000, bypassCache });
  },
  getById: async (id, bypassCache = false) => {
    return await cachedGet(`/enquiries/${id}`, { ttl: 15000, bypassCache });
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
