import { cachedGet } from "./api";

export const dashboardService = {
  getStats: async (bypassCache = false) => {
    return await cachedGet("/dashboard/stats", { ttl: 15000, bypassCache });
  },
};
