import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { getStoredItem, setStoredItem } from "../utils/storage";

/**
 * Single Source of Truth for Authentication across Foodie-Health-Routine.
 * Uses safe storage with in-memory fallback for mobile/private browsing compatibility.
 */
const AuthContext = createContext(null);

const AUTH_STORAGE_KEY = "foodie_auth_user";

export function AuthProvider({ children }) {
  // Authentication State
  const [user, setUser] = useState(() => getStoredItem(AUTH_STORAGE_KEY, null));

  const [isLoading, setIsLoading] = useState(false);

  // Auth Modal State
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalReason, setAuthModalReason] = useState(
    "Create your account to unlock personalized food routines, recipes and recommendations."
  );

  // Pending Action: callback or route to execute automatically after successful login
  const [pendingAction, setPendingAction] = useState(null);

  const isAuthenticated = !!user;

  // Persist user state safely
  useEffect(() => {
    try {
      setStoredItem(AUTH_STORAGE_KEY, user);
    } catch (e) {
      console.warn("Failed to update auth storage:", e);
    }
  }, [user]);

  /**
   * Google Authentication Flow
   */
  const loginWithGoogle = useCallback(async () => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 300));

      const loggedInUser = {
        name: "Foodie User",
        email: "user@example.com",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
        provider: "google",
        goal: "Healthy Lifestyle & Metabolic Energy",
        dietPreference: "Vegetarian",
        streakDays: 7,
        loggedInAt: new Date().toISOString()
      };

      setUser(loggedInUser);
      setIsAuthModalOpen(false);

      if (typeof pendingAction === "function") {
        setTimeout(() => {
          pendingAction();
          setPendingAction(null);
        }, 100);
      }

      return { success: true, user: loggedInUser };
    } catch (error) {
      console.warn("Google authentication error:", error);
      return { success: false, error: "Unable to sign in. Please try again." };
    } finally {
      setIsLoading(false);
    }
  }, [pendingAction]);

  /**
   * Email Login Flow (Demo)
   */
  const loginWithEmail = useCallback(
    async (email, _password) => {
      setIsLoading(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 300));

        const derivedName = email ? email.split("@")[0] : "Foodie User";
        const formattedName = derivedName.charAt(0).toUpperCase() + derivedName.slice(1);

        const loggedInUser = {
          name: formattedName || "Foodie User",
          email: email || "user@example.com",
          avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
          provider: "email",
          goal: "Healthy Lifestyle & Metabolic Energy",
          dietPreference: "Vegetarian",
          streakDays: 7,
          loggedInAt: new Date().toISOString()
        };

        setUser(loggedInUser);
        setIsAuthModalOpen(false);

        if (typeof pendingAction === "function") {
          setTimeout(() => {
            pendingAction();
            setPendingAction(null);
          }, 100);
        }

        return { success: true, user: loggedInUser };
      } catch (error) {
        console.warn("Email login error:", error);
        return { success: false, error: "Unable to sign in with email. Please try again." };
      } finally {
        setIsLoading(false);
      }
    },
    [pendingAction]
  );

  /**
   * Email Sign Up Flow (Demo)
   */
  const signupWithEmail = useCallback(
    async (name, email, _password) => {
      setIsLoading(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 300));

        const newUser = {
          name: name || (email ? email.split("@")[0] : "New Foodie"),
          email: email || "newuser@example.com",
          avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
          provider: "email",
          goal: "Healthy Lifestyle & Metabolic Energy",
          dietPreference: "Vegetarian",
          streakDays: 1,
          loggedInAt: new Date().toISOString()
        };

        setUser(newUser);
        setIsAuthModalOpen(false);

        if (typeof pendingAction === "function") {
          setTimeout(() => {
            pendingAction();
            setPendingAction(null);
          }, 100);
        }

        return { success: true, user: newUser };
      } catch (error) {
        console.warn("Signup error:", error);
        return { success: false, error: "Unable to create account. Please try again." };
      } finally {
        setIsLoading(false);
      }
    },
    [pendingAction]
  );

  /**
   * Logout Flow
   */
  const logout = useCallback(() => {
    setUser(null);
    setPendingAction(null);
    setIsAuthModalOpen(false);
    try {
      setStoredItem(AUTH_STORAGE_KEY, null);
    } catch (_e) {}
  }, []);

  /**
   * Open Auth Modal with optional custom reason and callback
   */
  const openAuthModal = useCallback((reason, callback) => {
    if (reason) setAuthModalReason(reason);
    if (callback) setPendingAction(() => callback);
    setIsAuthModalOpen(true);
  }, []);

  const closeAuthModal = useCallback(() => {
    setIsAuthModalOpen(false);
    setPendingAction(null);
  }, []);

  /**
   * Core Helper: requireAuth(actionCallback, reason)
   */
  const requireAuth = useCallback(
    (actionCallback, reason = "Create your account to unlock personalized food routines, recipes and recommendations.") => {
      if (user) {
        if (typeof actionCallback === "function") {
          actionCallback();
        }
        return true;
      }

      // User is not logged in -> queue action and prompt login
      if (typeof actionCallback === "function") {
        setPendingAction(() => actionCallback);
      }
      setAuthModalReason(reason);
      setIsAuthModalOpen(true);
      return false;
    },
    [user]
  );

  const value = {
    user,
    isAuthenticated,
    isLoading,
    isAuthModalOpen,
    authModalReason,
    loginWithGoogle,
    loginWithEmail,
    signupWithEmail,
    logout,
    openAuthModal,
    closeAuthModal,
    requireAuth,
    setUser
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    // Safe fallback if used outside AuthProvider
    return {
      user: null,
      isAuthenticated: false,
      isLoading: false,
      isAuthModalOpen: false,
      authModalReason: "",
      loginWithGoogle: async () => ({ success: false }),
      loginWithEmail: async () => ({ success: false }),
      signupWithEmail: async () => ({ success: false }),
      logout: () => {},
      openAuthModal: () => {},
      closeAuthModal: () => {},
      requireAuth: () => false,
      setUser: () => {}
    };
  }
  return context;
}

