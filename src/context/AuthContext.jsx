import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

/**
 * Single Source of Truth for Authentication across Foodie-Health-Routine.
 * Currently uses Demo Frontend Authentication with localStorage persistence.
 * Structured cleanly to easily connect Google OAuth / Firebase Authentication later.
 */
const AuthContext = createContext(null);

const AUTH_STORAGE_KEY = "foodie_auth_user";

export function AuthProvider({ children }) {
  // Authentication State
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem(AUTH_STORAGE_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch (e) {
      console.error("Failed to parse stored auth user:", e);
      return null;
    }
  });

  const [isLoading, setIsLoading] = useState(false);

  // Auth Modal State
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalReason, setAuthModalReason] = useState(
    "Create your account to unlock personalized food routines, recipes and recommendations."
  );

  // Pending Action: callback or route to execute automatically after successful login
  const [pendingAction, setPendingAction] = useState(null);

  const isAuthenticated = !!user;

  // Persist user state to localStorage
  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
      } else {
        localStorage.removeItem(AUTH_STORAGE_KEY);
      }
    } catch (e) {
      console.error("Failed to update auth storage:", e);
    }
  }, [user]);

  /**
   * Google Authentication Flow
   * =========================================================================
   * TODO: Connect real Google OAuth / Firebase Authentication API here later.
   * Example:
   *   import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
   *   const provider = new GoogleAuthProvider();
   *   const result = await signInWithPopup(getAuth(), provider);
   *   const user = result.user;
   * =========================================================================
   */
  const loginWithGoogle = useCallback(async () => {
    setIsLoading(true);
    try {
      // Simulate fast network response for realistic UX
      await new Promise((resolve) => setTimeout(resolve, 350));

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

      // Execute pending action if one was requested prior to login
      if (typeof pendingAction === "function") {
        setTimeout(() => {
          pendingAction();
          setPendingAction(null);
        }, 100);
      }

      return { success: true, user: loggedInUser };
    } catch (error) {
      console.error("Google authentication error:", error);
      return { success: false, error: "Unable to sign in. Please try again." };
    } finally {
      setIsLoading(false);
    }
  }, [pendingAction]);

  /**
   * Email Login Flow (Demo)
   * TODO: Connect backend / Firebase signInWithEmailAndPassword later
   */
  const loginWithEmail = useCallback(
    async (email, _password) => {
      setIsLoading(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 350));

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
        console.error("Email login error:", error);
        return { success: false, error: "Unable to sign in with email. Please try again." };
      } finally {
        setIsLoading(false);
      }
    },
    [pendingAction]
  );

  /**
   * Email Sign Up Flow (Demo)
   * TODO: Connect backend / Firebase createUserWithEmailAndPassword later
   */
  const signupWithEmail = useCallback(
    async (name, email, _password) => {
      setIsLoading(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 350));

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
        console.error("Signup error:", error);
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
      localStorage.removeItem(AUTH_STORAGE_KEY);
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
   * If logged in -> immediately executes actionCallback()
   * If logged out -> saves callback in pendingAction, opens LoginModal, and executes callback after login!
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
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
