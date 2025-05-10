import { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { auth } from "@/libs/firebase";
import { signInWithEmailAndPassword, User } from "firebase/auth";

type AuthContextType = {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Firebase 인증 상태 변경 감지
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const token = await user.getIdToken();
        await AsyncStorage.setItem("auth_token", token);
        setUser(user);
        setIsAuthenticated(true);
      } else {
        await AsyncStorage.removeItem("auth_token");
        setUser(null);
        setIsAuthenticated(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const token = await userCredential.user.getIdToken();
      await AsyncStorage.setItem("auth_token", token);
      setUser(userCredential.user);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Error during login:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await auth.signOut();
      await AsyncStorage.removeItem("auth_token");
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error("Error during logout:", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
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
