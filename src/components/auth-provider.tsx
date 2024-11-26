"use client";

import { type Session, type User } from "@supabase/supabase-js";
import React, { createContext } from "react";

interface AuthContextType {
  user?: User;
  session?: Session;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export const AuthProvider: React.FC<{
  children: React.ReactNode;
  user?: User;
  session?: Session;
}> = ({ children, user, session }) => {
  return (
    <AuthContext.Provider value={{ user, session }}>
      {children}
    </AuthContext.Provider>
  );
};
