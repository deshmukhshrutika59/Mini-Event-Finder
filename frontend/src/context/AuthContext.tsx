// src/context/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { loginUser, registerUser } from "../api/authApi";

interface AuthContextType {
  user: any;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem("me_token"));

  useEffect(() => {
    const storedUser = localStorage.getItem("me_user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const login = async (email: string, password: string) => {
    const data = await loginUser({ email, password });
    setUser(data.user);
    setToken(data.token);
    localStorage.setItem("me_user", JSON.stringify(data.user));
    localStorage.setItem("me_token", data.token);
  };

  const register = async (name: string, email: string, password: string) => {
    const data = await registerUser({ name, email, password });
    setUser(data.user);
    setToken(data.token);
    localStorage.setItem("me_user", JSON.stringify(data.user));
    localStorage.setItem("me_token", data.token);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("me_user");
    localStorage.removeItem("me_token");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, signOut : logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext)!;
