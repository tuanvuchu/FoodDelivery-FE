"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type User = {
  id: string;
  name: string;
  email: string;
  phone: string;
  image: string | null;
  address: string;
};

type UserContextType = {
  user: User | null;
  accessToken: string | null;
  setUser: (user: User | null) => void;
  setAccessToken: (token: string | null) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    const authData = localStorage.getItem("auth");
    if (authData) {
      try {
        const parsedAuth: { access_token: string; user: User } =
          JSON.parse(authData);
        setUser(parsedAuth.user);
        setAccessToken(parsedAuth.access_token);
      } catch (err) {
        console.error(err);
      }
    }
  }, []);

  return (
    <UserContext.Provider
      value={{ user, accessToken, setUser, setAccessToken }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("Opps");
  }
  return context;
}
