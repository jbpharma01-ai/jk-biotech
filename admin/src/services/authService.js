import api from "./api";

export const authService = {
  login: async (credentials) => {
    const res = await api.post("/auth/login", credentials);
    return res.data;
  },

  getMe: async () => {
    const res = await api.get("/auth/me");
    return res.data;
  },

  changePassword: async (passwordData) => {
    const res = await api.post("/auth/change-password", passwordData);
    return res.data;
  },

   resetPassword: async (passwordData) => {
    const res = await api.post("/auth/reset-password", passwordData);
    return res.data;
  },
};
