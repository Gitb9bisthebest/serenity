"use client";

import { createContext, useContext, useEffect, useState } from "react";

interface Session {
  user: {
    id: string;
    name: string;
    email: string;
    image?: string;
  };
}

interface SessionContextType {
  session: Session | null;
  isLoading: boolean;
  refetch: () => Promise<void>;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  const fetchSession = async () => {
    try {
      const response = await fetch("/api/auth/session");
      if (response.ok) {
        const data = await response.json();
        console.log("Session API response:", data); // Debug log

        // Check if data exists and has a user property
        if (data && data.user) {
          setSession(data);
        } else {
          console.log("No user found in session data"); // Debug log
          setSession(null);
        }
      } else {
        console.log("Session API response not ok:", response.status); // Debug log
        setSession(null);
      }
    } catch (error) {
      console.error("Error fetching session:", error);
      setSession(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setMounted(true);
    fetchSession();
  }, []);

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return (
      <SessionContext.Provider
        value={{ session: null, isLoading: true, refetch: fetchSession }}
      >
        <div suppressHydrationWarning>{children}</div>
      </SessionContext.Provider>
    );
  }

  return (
    <SessionContext.Provider
      value={{ session, isLoading, refetch: fetchSession }}
    >
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return context;
}
