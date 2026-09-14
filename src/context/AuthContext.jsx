import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { getStoredItem, setStoredItem } from "../utils/storage";
import {
  auth,
  googleProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
  sendPasswordResetEmail,
  sendEmailVerification,
  onAuthStateChanged,
  formatFirebaseAuthError
} from "../services/firebase";

/**
 * Single Source of Truth for Authentication across Foodie-Health-Routine.
 * Powered by Firebase Auth with Google OAuth, Email/Password & Firebase Email Verification Links.
 */
const AuthContext = createContext(null);

const AUTH_STORAGE_KEY = "foodie_auth_user";

export function AuthProvider({ children }) {
  // Authentication State
  const [user, setUser] = useState(() => getStoredItem(AUTH_STORAGE_KEY, null));
  const [isLoading, setIsLoading] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);

  // Auth Modal State
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalReason, setAuthModalReason] = useState(
    "Create your account to unlock personalized food routines, recipes and recommendations."
  );

  // Pending Action: callback or route to execute automatically after successful login
  const [pendingAction, setPendingAction] = useState(null);

  const isAuthenticated = !!user;

  // Listen to Firebase Auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        const stored = getStoredItem(AUTH_STORAGE_KEY, null);
        const formattedName =
          firebaseUser.displayName ||
          stored?.name ||
          (firebaseUser.email ? firebaseUser.email.split("@")[0].replace(/[._-]/g, " ") : "Foodie User");
        const capitalizedName =
          formattedName.charAt(0).toUpperCase() + formattedName.slice(1);

        const activeUser = {
          uid: firebaseUser.uid,
          name: capitalizedName,
          email: firebaseUser.email || stored?.email || "",
          emailVerified: firebaseUser.emailVerified || false,
          avatar:
            firebaseUser.photoURL ||
            stored?.avatar ||
            "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
          provider: firebaseUser.providerData?.[0]?.providerId || stored?.provider || "firebase",
          goal: stored?.goal || "Healthy Lifestyle & Metabolic Energy",
          dietPreference: stored?.dietPreference || "Vegetarian",
          streakDays: stored?.streakDays || 7,
          loggedInAt: stored?.loggedInAt || new Date().toISOString()
        };

        setUser(activeUser);
        try {
          setStoredItem(AUTH_STORAGE_KEY, activeUser);
        } catch (e) {
          console.warn("Storage write error:", e);
        }
      } else {
        setUser(null);
        try {
          setStoredItem(AUTH_STORAGE_KEY, null);
        } catch (e) {
          console.warn("Storage clear error:", e);
        }
      }
      setIsInitializing(false);
    });

    return () => unsubscribe();
  }, []);

  /**
   * Google Authentication Flow
   */
  const loginWithGoogle = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await signInWithPopup(auth, googleProvider);
      const firebaseUser = res.user;
      const stored = getStoredItem(AUTH_STORAGE_KEY, null);

      const loggedInUser = {
        uid: firebaseUser.uid,
        name: firebaseUser.displayName || (firebaseUser.email ? firebaseUser.email.split("@")[0] : "Foodie User"),
        email: firebaseUser.email || "",
        emailVerified: true, // Google accounts are pre-verified
        avatar:
          firebaseUser.photoURL ||
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
        provider: "google.com",
        goal: stored?.goal || "Healthy Lifestyle & Metabolic Energy",
        dietPreference: stored?.dietPreference || "Vegetarian",
        streakDays: stored?.streakDays || 7,
        loggedInAt: new Date().toISOString()
      };

      setUser(loggedInUser);
      setStoredItem(AUTH_STORAGE_KEY, loggedInUser);
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
      const friendlyError = formatFirebaseAuthError(error);
      return { success: false, error: friendlyError };
    } finally {
      setIsLoading(false);
    }
  }, [pendingAction]);

  /**
   * Email Login Flow
   */
  const loginWithEmail = useCallback(
    async (email, password) => {
      setIsLoading(true);
      try {
        const res = await signInWithEmailAndPassword(auth, email.trim(), password);
        const firebaseUser = res.user;
        const stored = getStoredItem(AUTH_STORAGE_KEY, null);

        const derivedName =
          firebaseUser.displayName ||
          stored?.name ||
          (firebaseUser.email ? firebaseUser.email.split("@")[0] : "Foodie User");
        const formattedName = derivedName.charAt(0).toUpperCase() + derivedName.slice(1);

        const loggedInUser = {
          uid: firebaseUser.uid,
          name: formattedName,
          email: firebaseUser.email || email,
          emailVerified: firebaseUser.emailVerified || false,
          avatar:
            firebaseUser.photoURL ||
            stored?.avatar ||
            "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
          provider: "password",
          goal: stored?.goal || "Healthy Lifestyle & Metabolic Energy",
          dietPreference: stored?.dietPreference || "Vegetarian",
          streakDays: stored?.streakDays || 7,
          loggedInAt: new Date().toISOString()
        };

        setUser(loggedInUser);
        setStoredItem(AUTH_STORAGE_KEY, loggedInUser);
        setIsAuthModalOpen(false);

        if (typeof pendingAction === "function") {
          setTimeout(() => {
            pendingAction();
            setPendingAction(null);
          }, 100);
        }

        return {
          success: true,
          user: loggedInUser,
          emailVerified: firebaseUser.emailVerified
        };
      } catch (error) {
        console.warn("Email login error:", error);
        const friendlyError = formatFirebaseAuthError(error);
        return { success: false, error: friendlyError };
      } finally {
        setIsLoading(false);
      }
    },
    [pendingAction]
  );

  /**
   * Email Sign Up Flow with Firebase Email Verification Link
   */
  const signupWithEmail = useCallback(
    async (name, email, password) => {
      setIsLoading(true);
      try {
        const cleanName = (name && name.trim()) || (email ? email.split("@")[0] : "New Foodie");
        
        // 1. Create User in Firebase
        const res = await createUserWithEmailAndPassword(auth, email.trim(), password);
        const firebaseUser = res.user;

        const defaultAvatar =
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80";

        // 2. Set Profile Display Name
        try {
          await updateProfile(firebaseUser, {
            displayName: cleanName,
            photoURL: defaultAvatar
          });
        } catch (profileErr) {
          console.warn("Could not update Firebase displayName:", profileErr);
        }

        // 3. Send Official Firebase Email Verification Link
        try {
          await sendEmailVerification(firebaseUser);
        } catch (mailErr) {
          console.warn("Failed to send Firebase verification email:", mailErr);
        }

        const newUser = {
          uid: firebaseUser.uid,
          name: cleanName,
          email: firebaseUser.email || email,
          emailVerified: false,
          avatar: defaultAvatar,
          provider: "password",
          goal: "Healthy Lifestyle & Metabolic Energy",
          dietPreference: "Vegetarian",
          streakDays: 1,
          loggedInAt: new Date().toISOString()
        };

        setUser(newUser);
        setStoredItem(AUTH_STORAGE_KEY, newUser);

        return {
          success: true,
          user: newUser,
          emailSent: true,
          message: `Verification link sent to ${email}`
        };
      } catch (error) {
        console.warn("Signup error:", error);
        const friendlyError = formatFirebaseAuthError(error);
        return { success: false, error: friendlyError };
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  /**
   * Resend Firebase Email Verification Link
   */
  const sendVerificationEmail = useCallback(async () => {
    setIsLoading(true);
    try {
      if (!auth.currentUser) {
        return { success: false, error: "No active user session. Please sign in first." };
      }
      await sendEmailVerification(auth.currentUser);
      return { success: true, message: "Verification link resent successfully!" };
    } catch (error) {
      console.warn("Resend verification email error:", error);
      const friendlyError = formatFirebaseAuthError(error);
      return { success: false, error: friendlyError };
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Check if User has clicked and verified their email link
   */
  const checkEmailVerified = useCallback(async () => {
    try {
      if (!auth.currentUser) {
        return { isVerified: false };
      }
      // Reload Firebase user instance to fetch latest token and verification claim
      await auth.currentUser.reload();
      const isVerified = auth.currentUser.emailVerified;

      if (isVerified && user) {
        const updatedUser = { ...user, emailVerified: true };
        setUser(updatedUser);
        setStoredItem(AUTH_STORAGE_KEY, updatedUser);

        if (typeof pendingAction === "function") {
          setTimeout(() => {
            pendingAction();
            setPendingAction(null);
          }, 100);
        }
      }

      return { isVerified, user: auth.currentUser };
    } catch (error) {
      console.warn("Check verification error:", error);
      return { isVerified: false, error: error.message };
    }
  }, [user, pendingAction]);

  /**
   * Password Reset Flow
   */
  const resetPassword = useCallback(async (email) => {
    setIsLoading(true);
    try {
      await sendPasswordResetEmail(auth, email.trim());
      return { success: true };
    } catch (error) {
      console.warn("Password reset error:", error);
      const friendlyError = formatFirebaseAuthError(error);
      return { success: false, error: friendlyError };
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Logout Flow
   */
  const logout = useCallback(async () => {
    try {
      await signOut(auth);
    } catch (e) {
      console.warn("Sign out error:", e);
    } finally {
      setUser(null);
      setPendingAction(null);
      setIsAuthModalOpen(false);
      try {
        setStoredItem(AUTH_STORAGE_KEY, null);
      } catch (_e) {}
    }
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
    isInitializing,
    isAuthModalOpen,
    authModalReason,
    loginWithGoogle,
    loginWithEmail,
    signupWithEmail,
    sendVerificationEmail,
    checkEmailVerified,
    resetPassword,
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
      isInitializing: false,
      isAuthModalOpen: false,
      authModalReason: "",
      loginWithGoogle: async () => ({ success: false }),
      loginWithEmail: async () => ({ success: false }),
      signupWithEmail: async () => ({ success: false }),
      sendVerificationEmail: async () => ({ success: false }),
      checkEmailVerified: async () => ({ isVerified: false }),
      resetPassword: async () => ({ success: false }),
      logout: () => {},
      openAuthModal: () => {},
      closeAuthModal: () => {},
      requireAuth: () => false,
      setUser: () => {}
    };
  }
  return context;
}
