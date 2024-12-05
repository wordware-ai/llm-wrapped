"use client";

import React, {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

interface StreamContextType {
  results: Record<string, unknown>;
  isLoading: boolean;
  setResults: (results: Record<string, unknown>) => void;
  setIsLoading: (loading: boolean) => void;
  profileData: Record<string, string | null>;
  setProfileData: (profileData: Record<string, string | null>) => void;
}

const StreamContext = createContext<StreamContextType | undefined>(undefined);

interface StreamProviderProps {
  children: ReactNode;
}

export function StreamProvider({ children }: StreamProviderProps) {
  const [results, setResults] = useState<Record<string, unknown>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [profileData, setProfileData] = useState<Record<string, string | null>>(
    {},
  );
  return (
    <StreamContext.Provider
      value={{
        results,
        isLoading,
        setResults,
        setIsLoading,
        profileData,
        setProfileData,
      }}
    >
      {children}
    </StreamContext.Provider>
  );
}

export function useStreamContext() {
  const context = useContext(StreamContext);
  if (context === undefined) {
    throw new Error("useStream must be used within a StreamProvider");
  }
  return context;
}
