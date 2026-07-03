import api from "@/lib/axios";

const cleanParams = (params?: any) => {
  if (!params || typeof params !== "object") {
    return undefined;
  }

  const cleaned = Object.entries(params).reduce(
    (acc, [key, value]) => {
      if (value === undefined || value === null) return acc;
      if (typeof value === "string" && value.trim() === "") return acc;
      if (Array.isArray(value) && value.length === 0) return acc;

      acc[key] = value;
      return acc;
    },
    {} as Record<string, any>
  );

  return Object.keys(cleaned).length ? cleaned : undefined;
};

export const get = async (url: string, params?: any) => {
  try {
    const response = await api.get(url, { params: cleanParams(params) });
    return response.data;
  } catch (error: any) {
    console.error("API GET failed:", url, params, error?.message ?? error);
    throw error;
  }
};

export const post = async (url: string, data?: any) => {
  try {
    const response = await api.post(url, data);
    return response.data;
  } catch (error: any) {
    const message =
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.response?.statusText ||
      error.message ||
      "Request failed";
    console.error("API POST failed:", url, data, message);
    const apiError = new Error(message);
    throw apiError;
  }
};


export const patch = async (url: string, data?: any) => {
  const response = await api.patch(url, data);
  return response.data;
};


export const remove = async (url: string) => {
  const response = await api.delete(url);
  return response.data;
};