import { get, post } from "./api";

const setTokens = (accessToken: string, refreshToken?: string) => {
  localStorage.setItem("accessToken", accessToken);

  if (refreshToken) {
    localStorage.setItem("refreshToken", refreshToken);
  }
};


export const register = async (data: {
  name: string;
  email: string;
  password: string;
}) => {
  return await post("/auth/register", data);
};


export const login = async (data: {
  email: string;
  password: string;
}) => {
  const res = await post("/auth/login", data);

  if (res?.accessToken) {
    setTokens(res.accessToken, res.refreshToken);
  }

  return res;
};


export const logout = async () => {
  const res = await post("/auth/logout");

  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");

  return res;
};


export const getMe = async () => {
  return await get("/auth/me");
};