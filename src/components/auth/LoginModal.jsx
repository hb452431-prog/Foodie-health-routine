import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import Logo from "../Logo";
import {
  X,
  Lock,
  Mail,
  User,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Eye,
  EyeOff,
  KeyRound,
  AlertCircle
} from "lucide-react";

export default function LoginModal({ onShowToast }) {
  const {
    isAuthModalOpen,
    authModalReason,
    closeAuthModal,
    loginWithGoogle,
    loginWithEmail,
    signupWithEmail,
    resetPassword,
    isLoading
  } = useAuth();

  const [mode, setMode] = useState("login"); // "login" | "signup" | "forgot"
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState("");
  const [resetSuccessMessage, setResetSuccessMessage] = useState("");

  if (!isAuthModalOpen) return null;

  const resetFormState = () => {
    setAuthError("");
    setResetSuccessMessage("");
  };

  const handleGoogleLogin = async () => {
    resetFormState();
    const res = await loginWithGoogle();
    if (res.success) {
      if (onShowToast) {
        onShowToast(`🎉 Welcome, ${res.user.name}!`);
      }
    } else {
      setAuthError(res.error || "Unable to sign in with Google. Please try again.");
    }
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    resetFormState();

    if (!email || !email.trim()) {
      setAuthError("Please enter your email address.");
      return;
    }

    if (mode === "forgot") {
      const res = await resetPassword(email);
      if (res.success) {
        setResetSuccessMessage("Password reset email sent! Please check your inbox.");
        if (onShowToast) {
          onShowToast("📧 Password reset link sent to your email!");
        }
      } else {
        setAuthError(res.error || "Unable to send password reset email.");
      }
      return;
    }

    if (!password) {
      setAuthError("Please enter your password.");
      return;
    }

    if (mode === "signup") {
      if (password.length < 6) {
        setAuthError("Password must be at least 6 characters long.");
        return;
      }
      const res = await signupWithEmail(name, email, password);
      if (res.success) {
        if (onShowToast) {
          onShowToast(`🎉 Account created! Welcome, ${res.user.name}.`);
        }
      } else {
        setAuthError(res.error || "Unable to create account.");
      }
    } else {
      const res = await loginWithEmail(email, password);
      if (res.success) {
        if (onShowToast) {
          onShowToast(`🎉 Welcome back, ${res.user.name}!`);
        }
      } else {
        setAuthError(res.error || "Unable to sign in.");
      }
    }
  };

  return (
    <div className="modal-overlay" onClick={closeAuthModal}>
      <div
        className="modal-content auth-modal-container"
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: "880px",
          width: "95%",
          padding: 0,
          borderRadius: "var(--radius-xl)",
          overflow: "hidden",
          border: "1px solid rgba(255, 255, 255, 0.2)"
        }}
      >
        <div className="auth-modal-grid">
          {/* Left Visual Column (Desktop) */}
          <div className="auth-visual-side">
            <div className="auth-visual-badge">
              <Sparkles size={14} color="#34D399" />
              <span>Smart Nutrition Blueprints</span>
            </div>

            <div className="auth-visual-center">
              <h2 className="auth-visual-headline">
                Eat Better. <br />
                <span style={{ color: "#34D399" }}>Live Better.</span>
              </h2>
              <p className="auth-visual-subtext">
                Your personalized food routine starts here. Tailored macros, regional recipes, and actionable timetables.
              </p>
            </div>

            <div className="auth-visual-footer">
              <div className="auth-feature-pill">
                <CheckCircle2 size={15} color="#34D399" />
                <span>Zero starvation meal routines</span>
              </div>
              <div className="auth-feature-pill">
                <CheckCircle2 size={15} color="#34D399" />
                <span>Under 20-min healthy recipes</span>
              </div>
              <div className="auth-feature-pill">
                <CheckCircle2 size={15} color="#34D399" />
                <span>Swiggy & Zomato nearby options</span>
              </div>
            </div>
          </div>

          {/* Right Form Column */}
          <div className="auth-form-side">
            {/* Close Button */}
            <button
              className="auth-modal-close-btn"
              onClick={closeAuthModal}
              title="Close"
              aria-label="Close modal"
            >
              <X size={18} />
            </button>

            {/* Header / Logo */}
            <div style={{ marginBottom: "1.25rem" }}>
              <Logo size={32} showText={true} />
            </div>

            {/* Reason Banner */}
            {authModalReason && (
              <div className="auth-reason-banner">
                <Lock size={16} color="#059669" style={{ flexShrink: 0, marginTop: "2px" }} />
                <div>
                  <div style={{ fontWeight: 700, fontSize: "0.82rem", color: "#065F46" }}>
                    Sign In Required
                  </div>
                  <div style={{ fontSize: "0.78rem", color: "#047857", lineHeight: 1.35 }}>
                    {authModalReason}
                  </div>
                </div>
              </div>
            )}

            <div style={{ marginBottom: "1.25rem" }}>
              <h3 style={{ fontSize: "1.45rem", fontWeight: 800, color: "var(--primary-900)", marginBottom: "0.25rem" }}>
                {mode === "login"
                  ? "Welcome Back 👋"
                  : mode === "signup"
                  ? "Create Account 🚀"
                  : "Reset Password 🔑"}
              </h3>
              <p style={{ fontSize: "0.86rem", color: "var(--text-secondary)" }}>
                {mode === "login"
                  ? "Sign in with Google or your email to continue."
                  : mode === "signup"
                  ? "Sign up in seconds to personalize and save your meal plans."
                  : "Enter your registered email to receive a password reset link."}
              </p>
            </div>

            {/* Success Message for Password Reset */}
            {resetSuccessMessage && (
              <div
                style={{
                  background: "#ECFDF5",
                  border: "1px solid #A7F3D0",
                  color: "#065F46",
                  padding: "0.6rem 0.85rem",
                  borderRadius: "var(--radius-md)",
                  fontSize: "0.82rem",
                  fontWeight: 600,
                  marginBottom: "1rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem"
                }}
              >
                <CheckCircle2 size={16} color="#059669" />
                <span>{resetSuccessMessage}</span>
              </div>
            )}

            {/* Error Message */}
            {authError && (
              <div
                style={{
                  background: "#FEF2F2",
                  border: "1px solid #FECACA",
                  color: "#DC2626",
                  padding: "0.6rem 0.85rem",
                  borderRadius: "var(--radius-md)",
                  fontSize: "0.82rem",
                  fontWeight: 600,
                  marginBottom: "1rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem"
                }}
              >
                <AlertCircle size={16} color="#DC2626" />
                <span>{authError}</span>
              </div>
            )}

            {/* Action Buttons & Forms */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {mode !== "forgot" && (
                <>
                  {/* Google Button */}
                  <button
                    type="button"
                    className="auth-btn-google"
                    onClick={handleGoogleLogin}
                    disabled={isLoading}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                      />
                    </svg>
                    <span>{isLoading ? "Connecting with Google..." : "Continue with Google"}</span>
                  </button>

                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", margin: "0.25rem 0" }}>
                    <div style={{ flex: 1, height: "1px", background: "var(--border-subtle)" }} />
                    <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: 600 }}>OR</span>
                    <div style={{ flex: 1, height: "1px", background: "var(--border-subtle)" }} />
                  </div>
                </>
              )}

              {/* Email Form Toggle or Form Display */}
              {!showEmailForm && mode !== "forgot" ? (
                <button
                  type="button"
                  className="btn btn-secondary"
                  style={{ width: "100%", justifyContent: "center", padding: "0.75rem 1rem", fontSize: "0.9rem" }}
                  onClick={() => setShowEmailForm(true)}
                >
                  <Mail size={16} />
                  <span>Continue with Email</span>
                </button>
              ) : (
                <form onSubmit={handleEmailSubmit} style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  {mode === "signup" && (
                    <div>
                      <label style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--text-secondary)", display: "block", marginBottom: "0.25rem" }}>
                        Full Name
                      </label>
                      <div style={{ position: "relative" }}>
                        <input
                          type="text"
                          placeholder="e.g. Harsha Kumar"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          style={{
                            width: "100%",
                            padding: "0.65rem 0.85rem 0.65rem 2.3rem",
                            borderRadius: "var(--radius-md)",
                            border: "1px solid var(--border-subtle)",
                            fontSize: "0.9rem"
                          }}
                        />
                        <User
                          size={15}
                          color="#94A3B8"
                          style={{ position: "absolute", left: "0.8rem", top: "50%", transform: "translateY(-50%)" }}
                        />
                      </div>
                    </div>
                  )}

                  <div>
                    <label style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--text-secondary)", display: "block", marginBottom: "0.25rem" }}>
                      Email Address
                    </label>
                    <div style={{ position: "relative" }}>
                      <input
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={{
                          width: "100%",
                          padding: "0.65rem 0.85rem 0.65rem 2.3rem",
                          borderRadius: "var(--radius-md)",
                          border: "1px solid var(--border-subtle)",
                          fontSize: "0.9rem"
                        }}
                      />
                      <Mail
                        size={15}
                        color="#94A3B8"
                        style={{ position: "absolute", left: "0.8rem", top: "50%", transform: "translateY(-50%)" }}
                      />
                    </div>
                  </div>

                  {mode !== "forgot" && (
                    <div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.25rem" }}>
                        <label style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--text-secondary)" }}>
                          Password
                        </label>
                        {mode === "login" && (
                          <button
                            type="button"
                            onClick={() => {
                              setMode("forgot");
                              resetFormState();
                            }}
                            style={{
                              fontSize: "0.75rem",
                              color: "#059669",
                              fontWeight: 600,
                              background: "none",
                              border: "none",
                              cursor: "pointer"
                            }}
                          >
                            Forgot password?
                          </button>
                        )}
                      </div>
                      <div style={{ position: "relative" }}>
                        <input
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          minLength={6}
                          style={{
                            width: "100%",
                            padding: "0.65rem 2.5rem 0.65rem 2.3rem",
                            borderRadius: "var(--radius-md)",
                            border: "1px solid var(--border-subtle)",
                            fontSize: "0.9rem"
                          }}
                        />
                        <Lock
                          size={15}
                          color="#94A3B8"
                          style={{ position: "absolute", left: "0.8rem", top: "50%", transform: "translateY(-50%)" }}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          style={{
                            position: "absolute",
                            right: "0.75rem",
                            top: "50%",
                            transform: "translateY(-50%)",
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            padding: 0,
                            display: "flex",
                            alignItems: "center",
                            color: "#94A3B8"
                          }}
                        >
                          {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      </div>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{ width: "100%", justifyContent: "center", marginTop: "0.35rem" }}
                    disabled={isLoading}
                  >
                    <span>
                      {isLoading
                        ? "Processing..."
                        : mode === "login"
                        ? "Sign In with Email"
                        : mode === "signup"
                        ? "Create Account"
                        : "Send Reset Link"}
                    </span>
                    <ArrowRight size={15} />
                  </button>
                </form>
              )}
            </div>

            {/* Toggle Modes */}
            <div style={{ textAlign: "center", marginTop: "1.25rem", paddingTop: "1rem", borderTop: "1px solid var(--border-subtle)" }}>
              {mode === "login" && (
                <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                  Don't have an account?{" "}
                  <button
                    type="button"
                    onClick={() => {
                      setMode("signup");
                      setShowEmailForm(true);
                      resetFormState();
                    }}
                    style={{ color: "#059669", fontWeight: 700, background: "none", border: "none", cursor: "pointer", textDecoration: "underline" }}
                  >
                    Create Account
                  </button>
                </p>
              )}

              {mode === "signup" && (
                <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => {
                      setMode("login");
                      setShowEmailForm(false);
                      resetFormState();
                    }}
                    style={{ color: "#059669", fontWeight: 700, background: "none", border: "none", cursor: "pointer", textDecoration: "underline" }}
                  >
                    Sign In
                  </button>
                </p>
              )}

              {mode === "forgot" && (
                <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                  Remembered your password?{" "}
                  <button
                    type="button"
                    onClick={() => {
                      setMode("login");
                      setShowEmailForm(true);
                      resetFormState();
                    }}
                    style={{ color: "#059669", fontWeight: 700, background: "none", border: "none", cursor: "pointer", textDecoration: "underline" }}
                  >
                    Back to Sign In
                  </button>
                </p>
              )}
            </div>

            {/* Security Badge */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.4rem",
                justifyContent: "center",
                marginTop: "0.75rem",
                color: "var(--text-muted)",
                fontSize: "0.72rem"
              }}
            >
              <ShieldCheck size={13} color="#10B981" />
              <span>Firebase Authentication • Google OAuth & Secure Encryption</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
