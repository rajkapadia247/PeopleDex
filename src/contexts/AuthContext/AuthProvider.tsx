import { useEffect, useState, type FunctionComponent } from "react";
import api from "../../api/axios";
import AuthContext from "./AuthContext";

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider: FunctionComponent<AuthProviderProps> = ({
  children,
}) =>{
  const [user, setUser] = useState<object | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return setLoading(false);

    api
      .get("/api/me")
      .then((res) => {
        setUser(res.data);
      })
      .catch(() => {
        localStorage.removeItem("token");
      })
      .finally(() => setLoading(false));
  }, []);

  const login = ({ token, user }: { token: string, user: object}) => {
    localStorage.setItem("token", token);
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;