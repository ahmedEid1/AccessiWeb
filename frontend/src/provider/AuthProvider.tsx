import { createContext, useEffect, useState } from "react";
import { getFromCache, storeInCache } from "utils/util";

interface IContextInitial {
  token: string;
  login: (val?: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<IContextInitial>({
  token: "",
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: JSX.Element }) => {
  const [token, setToken] = useState<string>("");

  useEffect(() => {
    try {
      const token = getFromCache("token");
      if (token) setToken(token);
    } catch (error) {
      console.log("AuthProvider: Token Access Error ", error);
    }
  }, []);

  const login = (val: string = 'session') => {
    storeInCache("token", val);
    setToken(val);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
