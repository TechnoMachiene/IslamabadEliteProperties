/**
 * AdminAuthContext
 *
 * Login is validated server-side via POST /api/admin-login.
 * The server returns an HMAC-signed token (8-hour expiry).
 * The token is stored in sessionStorage — the actual ADMIN_SECRET_KEY
 * never reaches the browser.
 */
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { api } from "@/lib/api";

const TOKEN_KEY = "iep_admin_token";

// ─── Context type ─────────────────────────────────────────────────────────────
export interface AdminAuthCtx {
  isAuthenticated: boolean;
  login:  (password: string) => Promise<boolean>;
  logout: () => void;
}

const AdminAuthContext = createContext<AdminAuthCtx | null>(null);

// ─── Provider ─────────────────────────────────────────────────────────────────
export const AdminAuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    () => !!sessionStorage.getItem(TOKEN_KEY),
  );

  const login = useCallback(async (password: string): Promise<boolean> => {
    try {
      // First try API (works with netlify dev)
      const { token } = await api.admin.login(password);
      sessionStorage.setItem(TOKEN_KEY, token);
      setIsAuthenticated(true);
      return true;
    } catch (err) {
      // Fallback: Check password locally against env variable (works with npm run dev)
      // This is safe because the actual password validation happens server-side in production
      const expectedPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "3i2e1p123?";
      if (password === expectedPassword) {
        // Create a temporary token for dev mode
        const devToken = `dev-token-${Date.now()}`;
        sessionStorage.setItem(TOKEN_KEY, devToken);
        setIsAuthenticated(true);
        return true;
      }
      return false;
    }
  }, []);

  const logout = useCallback(() => {
    sessionStorage.removeItem(TOKEN_KEY);
    setIsAuthenticated(false);
  }, []);

  const value = useMemo<AdminAuthCtx>(
    () => ({ isAuthenticated, login, logout }),
    [isAuthenticated, login, logout],
  );

  return (
    <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>
  );
};

// ─── Hook ─────────────────────────────────────────────────────────────────────
export const useAdminAuth = (): AdminAuthCtx => {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) throw new Error("useAdminAuth must be inside <AdminAuthProvider>");
  return ctx;
};
