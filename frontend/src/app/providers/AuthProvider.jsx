import { useMemo, useState } from "react";
import { loginUser } from "../../api/authApi";
import { AuthContext } from "./AuthContext";

const USER_KEY = "rc_user";
const TOKEN_KEY = "rc_token";

const bootUser = () => {
  const rawUser = localStorage.getItem(USER_KEY);
  const token = localStorage.getItem(TOKEN_KEY);
  if (rawUser && token) {
    return JSON.parse(rawUser);
  }
  return null;
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(bootUser);
  const isReady = true;

  const signIn = async (payload) => {
    const data = await loginUser(payload);
    const nextUser = { id: data.userId, role: data.role, tokenType: data.tokenType };
    localStorage.setItem(TOKEN_KEY, data.token);
    localStorage.setItem(USER_KEY, JSON.stringify(nextUser));
    setUser(nextUser);
    return nextUser;
  };

  const signOut = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    setUser(null);
  };

  const value = useMemo(
    () => ({ user, isReady, isAuthenticated: Boolean(user), signIn, signOut }),
    [user, isReady]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
