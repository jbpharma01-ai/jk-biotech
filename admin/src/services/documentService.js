// import api, { cachedGet } from "./api";

// export const documentService = {
//   getAll: async (bypassCache = false) => {
//     return await cachedGet("/documents/all", { ttl: 20000, bypassCache });
//   },
//   getActive: async (bypassCache = false) => {
//     return await cachedGet("/documents", { ttl: 20000, bypassCache });
//   },
//   getByCategory: async (idOrSlug, bypassCache = false) => {
//     return await cachedGet(`/documents/category/${idOrSlug}`, { ttl: 20000, bypassCache });
//   },
//   create: async (formData) => {
//     const res = await api.post("/documents", formData, {
//       headers: { "Content-Type": "multipart/form-data" },
//     });
//     return res.data;
//   },
//   update: async (id, data) => {
//     const isFormData = data instanceof FormData;
//     const res = await api.put(`/documents/${id}`, data, {
//       headers: isFormData ? { "Content-Type": "multipart/form-data" } : undefined,
//     });
//     return res.data;
//   },
//   deactivate: async (id) => {
//     const res = await api.patch(`/documents/${id}/deactivate`);
//     return res.data;
//   },
//   activate: async (id) => {
//     const res = await api.put(`/documents/${id}`, { isActive: true });
//     return res.data;
//   },
//   delete: async (id) => {
//     const res = await api.delete(`/documents/${id}`);
//     return res.data;
//   },
// };
