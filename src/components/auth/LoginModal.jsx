import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../../context/AuthContext";
import Logo from "../Logo";
import confetti from "canvas-confetti";
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
  AlertCircle,
  RotateCcw,
  Edit3,
  KeyRound
} from "lucide-react";

export default function LoginModal({ onShowToast }) {
  const {
    isAuthModalOpen,
    authModalReason,
    closeAuthModal,
    loginWithGoogle,
    loginWithEmail,
    requestSignupOtp,
    completeSignupWithOtp,
    resetPassword,
    isLoading
  } = useAuth();

  const [mode, setMode] = useState("login"); // "login" | "signup" | "otp-verify" | "forgot"
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState("");
  const [resetSuccessMessage, setResetSuccessMessage] = useState("");

  // OTP State
  const [otpDigits, setOtpDigits] = useState(["", "", "", "", "", ""]);
  const [devOtp, setDevOtp] = useState("");
  const [countdown, setCountdown] = useState(60);
  const otpInputRefs = useRef([]);

  // Resend Countdown Timer
  useEffect(() => {
    let timer = null;
    if (mode === "otp-verify" && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [mode, countdown]);

  // Focus first OTP input when transitioning to OTP mode
  useEffect(() => {
    if (mode === "otp-verify") {
      setTimeout(() => {
        otpInputRefs.current[0]?.focus();
      }, 150);
    }
  }, [mode]);

  if (!isAuthModalOpen) return null;

  const resetFormState = () => {
    setAuthError("");
    setResetSuccessMessage("");
  };

  const handleGoogleLogin = async () => {
    resetFormState();
    const res = await loginWithGoogle();
    if (res.success) {
      try {
        confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
      } catch (_e) {}
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

      // Step 1 of Sign Up: Send 6-digit OTP to Email
      const res = await requestSignupOtp(name, email, password);
      if (res.success) {
        setDevOtp(res.devOtp || "");
        setOtpDigits(["", "", "", "", "", ""]);
        setCountdown(60);
        setMode("otp-verify");
        if (onShowToast) {
          onShowToast(`📧 Verification OTP sent to ${email}!`);
        }
      } else {
        setAuthError(res.error || "Unable to send verification code.");
      }
    } else {
      // Direct Login
      const res = await loginWithEmail(email, password);
      if (res.success) {
        try {
          confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
        } catch (_e) {}
        if (onShowToast) {
          onShowToast(`🎉 Welcome back, ${res.user.name}!`);
        }
      } else {
        setAuthError(res.error || "Unable to sign in.");
      }
    }
  };

  // Handle individual OTP Box Changes
  const handleOtpChange = (index, value) => {
    const char = value.replace(/\D/g, "").slice(-1); // Only digits, last character
    const newDigits = [...otpDigits];
    newDigits[index] = char;
    setOtpDigits(newDigits);
    setAuthError("");

    // Auto-focus next input if digit entered
    if (char && index < 5) {
      otpInputRefs.current[index + 1]?.focus();
    }
  };

  // Handle Backspace and Navigation Keys
  const handleOtpKeyDown = (index, e) => {
    if (e.key === "Backspace") {
      if (!otpDigits[index] && index > 0) {
        const newDigits = [...otpDigits];
        newDigits[index - 1] = "";
        setOtpDigits(newDigits);
        otpInputRefs.current[index - 1]?.focus();
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < 5) {
      otpInputRefs.current[index + 1]?.focus();
    }
  };

  // Handle Clipboard Paste for OTP (e.g. user pastes 6 digits)
  const handleOtpPaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (!pastedData) return;

    const newDigits = [...otpDigits];
    for (let i = 0; i < 6; i++) {
      newDigits[i] = pastedData[i] || "";
    }
    setOtpDigits(newDigits);
    setAuthError("");

    const targetIndex = Math.min(pastedData.length, 5);
    otpInputRefs.current[targetIndex]?.focus();
  };

  // Resend OTP Code
  const handleResendOtp = async () => {
    if (countdown > 0) return;
    setAuthError("");
    const res = await requestSignupOtp(name, email, password);
    if (res.success) {
      setDevOtp(res.devOtp || "");
      setCountdown(60);
      setOtpDigits(["", "", "", "", "", ""]);
      if (onShowToast) {
        onShowToast(`🔄 New verification code sent to ${email}!`);
      }
      setTimeout(() => {
        otpInputRefs.current[0]?.focus();
      }, 100);
    } else {
      setAuthError(res.error || "Unable to resend verification code.");
    }
  };

  // Step 2 of Sign Up: Verify OTP and complete Firebase account creation
  const handleVerifyOtpSubmit = async (e) => {
    e.preventDefault();
    setAuthError("");

    const otpCode = otpDigits.join("");
    if (otpCode.length < 6) {
      setAuthError("Please enter all 6 digits of the verification code.");
      return;
    }

    const res = await completeSignupWithOtp(name, email, password, otpCode);
    if (res.success) {
      try {
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      } catch (_e) {}
      if (onShowToast) {
        onShowToast(`🎉 Account created! Welcome to Foodie's Adda, ${res.user.name}.`);
      }
    } else {
      setAuthError(res.error || "Invalid verification code.");
    }
  };

  // Quick auto-fill helper for development / demo
  const handleAutoFillOtp = () => {
    if (!devOtp) return;
    const digits = devOtp.split("").slice(0, 6);
    setOtpDigits(digits);
    setAuthError("");
    otpInputRefs.current[5]?.focus();
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
            {authModalReason && mode !== "otp-verify" && (
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

            {/* Title & Subtitle */}
            <div style={{ marginBottom: "1.25rem" }}>
              <h3 style={{ fontSize: "1.45rem", fontWeight: 800, color: "var(--primary-900)", marginBottom: "0.25rem" }}>
                {mode === "login"
                  ? "Welcome Back 👋"
                  : mode === "signup"
                  ? "Create Account 🚀"
                  : mode === "otp-verify"
                  ? "Verify Your Email ✉️"
                  : "Reset Password 🔑"}
              </h3>
              <p style={{ fontSize: "0.86rem", color: "var(--text-secondary)" }}>
                {mode === "login"
                  ? "Sign in with Google or your email to continue."
                  : mode === "signup"
                  ? "Sign up to personalize and save your meal plans."
                  : mode === "otp-verify"
                  ? "Enter the 6-digit code sent to verify your email."
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

            {/* OTP VERIFICATION VIEW */}
            {mode === "otp-verify" ? (
              <form onSubmit={handleVerifyOtpSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {/* Email Chip with Edit button */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "0.6rem 0.85rem",
                    background: "#F8FAFC",
                    borderRadius: "var(--radius-md)",
                    border: "1px solid var(--border-subtle)",
                    fontSize: "0.85rem"
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", overflow: "hidden" }}>
                    <Mail size={15} color="#059669" />
                    <span style={{ fontWeight: 700, color: "var(--primary-900)", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {email}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setMode("signup");
                      resetFormState();
                    }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.25rem",
                      background: "none",
                      border: "none",
                      color: "#059669",
                      fontSize: "0.78rem",
                      fontWeight: 700,
                      cursor: "pointer",
                      padding: 0
                    }}
                  >
                    <Edit3 size={13} />
                    <span>Change</span>
                  </button>
                </div>

                {/* 6-Digit OTP Box Grid */}
                <div>
                  <label
                    style={{
                      fontSize: "0.8rem",
                      fontWeight: 700,
                      color: "var(--text-secondary)",
                      display: "block",
                      marginBottom: "0.5rem"
                    }}
                  >
                    Enter 6-Digit Verification Code
                  </label>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(6, 1fr)",
                      gap: "0.5rem"
                    }}
                    onPaste={handleOtpPaste}
                  >
                    {otpDigits.map((digit, idx) => (
                      <input
                        key={idx}
                        ref={(el) => (otpInputRefs.current[idx] = el)}
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(idx, e.target.value)}
                        onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                        style={{
                          width: "100%",
                          height: "48px",
                          textAlign: "center",
                          fontSize: "1.4rem",
                          fontWeight: 800,
                          color: "var(--primary-900)",
                          borderRadius: "var(--radius-md)",
                          border: digit ? "2px solid #059669" : "1.5px solid var(--border-subtle)",
                          background: digit ? "#F0FDF4" : "#FFFFFF",
                          outline: "none",
                          transition: "all 0.15s ease"
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Dev Code Quick helper if available */}
                {devOtp && (
                  <div
                    onClick={handleAutoFillOtp}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      background: "#EFF6FF",
                      border: "1px dashed #60A5FA",
                      padding: "0.45rem 0.75rem",
                      borderRadius: "var(--radius-md)",
                      fontSize: "0.78rem",
                      color: "#1E40AF",
                      cursor: "pointer"
                    }}
                    title="Click to automatically fill the OTP"
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                      <KeyRound size={14} color="#2563EB" />
                      <span>
                        Test Code: <strong>{devOtp}</strong>
                      </span>
                    </div>
                    <span style={{ fontWeight: 700, textDecoration: "underline" }}>Auto-fill</span>
                  </div>
                )}

                {/* Submit Verification Button */}
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ width: "100%", justifyContent: "center", padding: "0.75rem 1rem", fontSize: "0.95rem" }}
                  disabled={isLoading || otpDigits.join("").length < 6}
                >
                  <span>{isLoading ? "Verifying & Creating Account..." : "Verify & Complete Sign Up"}</span>
                  <ArrowRight size={16} />
                </button>

                {/* Resend Timer / CTA */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: "0.82rem" }}>
                  {countdown > 0 ? (
                    <span style={{ color: "var(--text-muted)" }}>
                      Resend code in <strong style={{ color: "var(--primary-800)" }}>{countdown}s</strong>
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={handleResendOtp}
                      disabled={isLoading}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.3rem",
                        background: "none",
                        border: "none",
                        color: "#059669",
                        fontWeight: 700,
                        cursor: "pointer",
                        padding: 0
                      }}
                    >
                      <RotateCcw size={13} />
                      <span>Resend Verification Code</span>
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => {
                      setMode("login");
                      setShowEmailForm(false);
                      resetFormState();
                    }}
                    style={{
                      background: "none",
                      border: "none",
                      color: "var(--text-muted)",
                      cursor: "pointer",
                      padding: 0
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              /* LOGIN, SIGNUP, FORGOT PASSWORD VIEW */
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
                          ? "Send Verification Code"
                          : "Send Reset Link"}
                      </span>
                      <ArrowRight size={15} />
                    </button>
                  </form>
                )}
              </div>
            )}

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
              <span>Firebase Authentication • 2FA Email OTP Verification</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
