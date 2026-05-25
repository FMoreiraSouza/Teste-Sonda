import api from "./client/api";

export const login = async (username, password) => {
  const response = await api.post("/auth/login", { username, password });
  return response.data; // { token, username, role }
};

export const register = async (username, password) => {
  const response = await api.post("/auth/register", { username, password });
  return response.data;
};
