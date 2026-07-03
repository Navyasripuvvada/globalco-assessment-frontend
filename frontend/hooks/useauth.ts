import { useEffect, useState } from "react";
import { login, logout } from "@/services/auth.service";

type User = {
  name?: string;
  email?: string;
};

const decodeJwt = (token: string) => {
  try {
    const payload = token.split(".")[1];
    if (!payload) return null;

    const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
    const padded = base64.padEnd(base64.length + (4 - (base64.length % 4)) % 4, "=");
    const decoded = typeof window !== "undefined"
      ? atob(padded)
      : Buffer.from(padded, "base64").toString("utf-8");

    return JSON.parse(decoded);
  } catch {
    return null;
  }
};

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const initializeUser = async () => {
    setLoading(true);

    const token = localStorage.getItem("accessToken");

    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      const decoded: any = decodeJwt(token);
      const profile = decoded?.user ?? decoded;
      const email = profile?.email || profile?.sub || profile?.username;
      const name = profile?.name || profile?.fullName || profile?.username;

      if (email || name) {
        setUser({
          email,
          name,
        });
      } else {
        setUser({ email: "logged-in-user" });
      }
    } catch (error) {
      console.warn("Failed to decode auth token:", error);
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    initializeUser();

    const handleAuthChange = () => {
      initializeUser();
    };

    window.addEventListener("authChanged", handleAuthChange);
    window.addEventListener("storage", handleAuthChange);

    return () => {
      window.removeEventListener("authChanged", handleAuthChange);
      window.removeEventListener("storage", handleAuthChange);
    };
  }, []);


  const handleLogin = async (data: {
    email: string;
    password: string;
  }) => {
    const res = await login(data);

    if (res?.accessToken) {
      setUser({ email: data.email });
    }

    return res;
  };


  const handleRegister = async (data: {
    name: string;
    email: string;
    password: string;
  }) => {
    return await register(data);
  };

  const handleLogout = async () => {
    await logout();

    setUser(null);
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("authChanged"));
    }

    window.location.href = "/login";
  };

  return {
    user,
    loading,
    isAuthenticated: !!user,
    handleLogin,
    handleRegister,
    handleLogout,
  };
};