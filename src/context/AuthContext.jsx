import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminEmail, setAdminEmail] = useState("");

  // Fungsi dipanggil saat login admin sukses
  const loginAsAdmin = (email) => {
    setIsAdmin(true);
    setAdminEmail(email);
  };

  // Fungsi logout admin
  const logoutAdmin = () => {
    setIsAdmin(false);
    setAdminEmail("");
  };

  return (
    <AuthContext.Provider value={{ isAdmin, adminEmail, loginAsAdmin, logoutAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}

// hook supaya gampang dipakai
export function useAuth() {
  return useContext(AuthContext);
}
