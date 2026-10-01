import api from "./api";

export const companyService = {
  get: async () => {
    const res = await api.get("/company");
    return res.data;
  },
  update: async (data) => {
    const res = await api.put("/company", data);
    return res.data;
  },
};
