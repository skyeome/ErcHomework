import { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type AuthContextType = {
  isAuthenticated: boolean;
  login: (token: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // 앱 시작시 토큰 확인
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = await AsyncStorage.getItem("auth_token");
      setIsAuthenticated(!!token);
    } catch (error) {
      console.error("Error checking auth status:", error);
      setIsAuthenticated(false);
    }
  };

  const login = async (token: string) => {
    try {
      await AsyncStorage.setItem("auth_token", token);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Error saving auth token:", error);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem("auth_token");
      setIsAuthenticated(false);
    } catch (error) {
      console.error("Error removing auth token:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
