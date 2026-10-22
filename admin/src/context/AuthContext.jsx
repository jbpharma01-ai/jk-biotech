import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { authService } from "../services/authService";
import { clearApiCache } from "../services/api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem("admin");
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const [token, setToken] = useState(() => localStorage.getItem("token") || null);
  // If we already have stored credentials, don't block the UI!
  const [loading, setLoading] = useState(() => {
    const hasToken = !!localStorage.getItem("token");
    const hasAdmin = !!localStorage.getItem("admin");
    return !(hasToken && hasAdmin);
  });
  const [serverStatus, setServerStatus] = useState("ready"); // "ready" | "connecting" | "offline"

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("admin");
    clearApiCache();
    setToken(null);
    setUser(null);
  }, []);

  useEffect(() => {
    let isMounted = true;

    const verifyAuth = async () => {
      const storedToken = localStorage.getItem("token");
      if (!storedToken) {
        if (isMounted) {
          setUser(null);
          setLoading(false);
        }
        return;
      }

      try {
        const res = await authService.getMe();
        if (!isMounted) return;

        if (res?.success && res?.data) {
          setUser(res.data);
          setToken(storedToken);
          localStorage.setItem("admin", JSON.stringify(res.data));
          setServerStatus("ready");
        } else {
          logout();
        }
      } catch (err) {
        if (!isMounted) return;
        // Only log out if backend explicitly rejected with 401/403
        if (err.response?.status === 401 || err.response?.status === 403) {
          console.warn("Session expired or invalid, logging out.");
          logout();
        } else {
          // Network error or Render cold start timeout: keep local session valid!
          console.warn("Backend server connection pending (cold start or offline). Keeping local session active.");
          setServerStatus("connecting");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    verifyAuth();

    return () => {
      isMounted = false;
    };
  }, [logout]);

  const login = async (email, password) => {
    clearApiCache();
    const res = await authService.login({ email, password });
    if (res.success && res.data) {
      const { admin, token: newToken } = res.data;
      localStorage.setItem("token", newToken);
      localStorage.setItem("admin", JSON.stringify(admin));
      setToken(newToken);
      setUser(admin);
      setServerStatus("ready");
      return admin;
    }
    throw new Error(res.message || "Invalid email or password");
  };

  const updateUser = (updatedFields) => {
    setUser((prev) => {
      const next = { ...prev, ...updatedFields };
      localStorage.setItem("admin", JSON.stringify(next));
      return next;
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        serverStatus,
        isAuthenticated: !!token && !!user,
        login,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
