import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

const defaultUser = {
  name: "Aniket",
  role: "Developer",
};

export function UserProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("devtrack-user");

    return savedUser
      ? JSON.parse(savedUser)
      : defaultUser;
  });

  useEffect(() => {
    localStorage.setItem(
      "devtrack-user",
      JSON.stringify(user)
    );
  }, [user]);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}