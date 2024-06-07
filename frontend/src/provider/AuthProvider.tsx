import { createContext, useEffect, useState, ReactNode } from "react";
import { getFromCache, storeInCache, removeFromCache } from "utils/util";

interface IContextInitial {
  token: string;
  login: (val?: string) => void;
  logout: () => void;
  isLoading: boolean;
}

export const AuthContext = createContext<IContextInitial>({
  token: "",
  login: () => {},
  logout: () => {},
  isLoading: true,
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [token, setToken] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    try {
      const token = getFromCache("token");
      if (token) setToken(token);
    } catch (error) {
      console.log("AuthProvider: Token Access Error ", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = (val: string = "session") => {
    storeInCache("token", val);
    setToken(val);
  };

  const logout = () => {
    removeFromCache("token");
    setToken("");
  };

  return (
    <AuthContext.Provider value={{ token, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
