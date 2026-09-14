import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
  sendPasswordResetEmail,
  sendEmailVerification,
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink,
  onAuthStateChanged
} from "firebase/auth";
import { getAnalytics, isSupported } from "firebase/analytics";

/**
 * Firebase Configuration for Foodie's Adda
 */
export const firebaseConfig = {
  apiKey: "AIzaSyC2acBxeTtBvzB2xU2sB16TIe4NalqCM74",
  authDomain: "foodie-s-adda.firebaseapp.com",
  projectId: "foodie-s-adda",
  storageBucket: "foodie-s-adda.firebasestorage.app",
  messagingSenderId: "496134017695",
  appId: "1:496134017695:web:c5e55cd86cf6e95b41c8aa",
  measurementId: "G-KZMG0M0K1J"
};

// Singleton App Initialization
export const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// Initialize Firebase Auth
export const auth = getAuth(app);

// Configure Google Auth Provider
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account"
});

// Conditionally initialize Analytics if supported in the current environment
let analytics = null;
if (typeof window !== "undefined") {
  isSupported()
    .then((supported) => {
      if (supported) {
        analytics = getAnalytics(app);
      }
    })
    .catch((err) => {
      console.warn("Firebase Analytics could not be initialized:", err);
    });
}

export { analytics };

/**
 * Friendly mapper for Firebase Authentication Error Codes
 */
export function formatFirebaseAuthError(error) {
  if (!error) return "An unexpected error occurred. Please try again.";

  const code = error.code || "";
  const msg = error.message || "";

  switch (code) {
    case "auth/invalid-credential":
    case "auth/wrong-password":
    case "auth/user-not-found":
      return "Invalid email or password. Please verify your credentials.";
    case "auth/email-already-in-use":
      return "This email is already registered. Please sign in instead.";
    case "auth/weak-password":
      return "Password should be at least 6 characters long.";
    case "auth/invalid-email":
      return "Please enter a valid email address.";
    case "auth/popup-closed-by-user":
      return "Google sign-in was closed before completing.";
    case "auth/popup-blocked":
      return "Sign-in popup was blocked by your browser. Please allow popups.";
    case "auth/network-request-failed":
      return "Network connection issue. Please check your internet connection.";
    case "auth/too-many-requests":
      return "Too many failed attempts. Please try again shortly or reset your password.";
    case "auth/user-disabled":
      return "This user account has been disabled. Please contact support.";
    default:
      if (msg.includes("popup")) {
        return "Sign-in was interrupted. Please try again.";
      }
      return msg.replace("Firebase: ", "").replace(/\(auth\/.*\)\.?/, "").trim() || "Authentication failed. Please try again.";
  }
}

export {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
  sendPasswordResetEmail,
  sendEmailVerification,
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink,
  onAuthStateChanged
};
