import { useStorageState } from "@/hooks/useStorageState";
import {
  use,
  createContext,
  type PropsWithChildren,
  useEffect,
  useCallback,
  useMemo,
  useState,
} from "react";
const AuthContext = createContext<{
  signIn: (token: string, tokenExpiry?: number | null) => void;
  signOut: () => void;
  session?: string | null;
  isLoading: boolean;
  tokenExpiresInMs: number | null;
}>({
  signIn: () => null,
  signOut: () => null,
  session: null,
  isLoading: false,
  tokenExpiresInMs: null,
});

// Use this hook to access the user info.
export function useSession() {
  const value = use(AuthContext);
  if (!value) {
    throw new Error("useSession must be wrapped in a <SessionProvider />");
  }

  return value;
}

export function SessionProvider({ children }: PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState("token");
  const [[isLoadingExpiry, tokenExpiry], setTokenExpiry] =
    useStorageState("tokenExpiry");
  const [tokenExpiresInMs, setTokenExpiresInMs] = useState<number | null>(null);
  const signOut = useCallback(() => {
    setSession(null);
    setTokenExpiry(null);
  }, [setSession, setTokenExpiry]);

  useEffect(() => {
    if (!session) return;
    if (!tokenExpiry) return;

    const expiry = Number(tokenExpiry);
    if (!Number.isFinite(expiry) || expiry <= 0) return;

    const expiresIn = expiry - Date.now();
    if (expiresIn <= 0) {
      signOut();
      return;
    }

    if (expiresIn > 0) {
      const timeoutId = setTimeout(() => {
        signOut();
      }, expiresIn);
      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [session, tokenExpiry, isLoading, isLoadingExpiry, signOut]);

  useEffect(() => {
    if (!session || !tokenExpiry) {
      setTokenExpiresInMs(null);
      return;
    }

    const expiry = Number(tokenExpiry);
    if (!Number.isFinite(expiry) || expiry <= 0) {
      setTokenExpiresInMs(null);
      return;
    }

    const updateRemaining = () => {
      const remaining = Math.max(0, expiry - Date.now());
      setTokenExpiresInMs(remaining);
    };

    updateRemaining();
    const intervalId = setInterval(updateRemaining, 1000);
    return () => clearInterval(intervalId);
  }, [session, tokenExpiry]);

  const value = useMemo(
    () => ({
      signIn: (token: string, expiry?: number | null) => {
        setSession(token);
        if (typeof expiry === "number" && Number.isFinite(expiry) && expiry > 0) {
          setTokenExpiry(String(expiry));
        } else {
          // Avoid keeping stale expiry from older sessions/responses.
          setTokenExpiry(null);
        }
      },
      signOut,
      session,
      isLoading: isLoading || isLoadingExpiry,
      tokenExpiresInMs,
    }),
    [setSession, setTokenExpiry, signOut, session, isLoading, isLoadingExpiry, tokenExpiresInMs]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
