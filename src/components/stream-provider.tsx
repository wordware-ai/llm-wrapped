import React, {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

interface StreamContextType {
  results: Record<string, string>;
  isLoading: boolean;
  setResults: (results: Record<string, string>) => void;
  setIsLoading: (loading: boolean) => void;
}

const StreamContext = createContext<StreamContextType | undefined>(undefined);

interface StreamProviderProps {
  children: ReactNode;
}

export function StreamProvider({ children }: StreamProviderProps) {
  const [results, setResults] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  return (
    <StreamContext.Provider
      value={{
        results,
        isLoading,
        setResults,
        setIsLoading,
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
