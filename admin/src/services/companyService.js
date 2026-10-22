import api, { cachedGet } from "./api";

export const companyService = {
  get: async (bypassCache = false) => {
    return await cachedGet("/company", { ttl: 60000, bypassCache });
  },
  update: async (data) => {
    const res = await api.put("/company", data);
    return res.data;
  },
};
