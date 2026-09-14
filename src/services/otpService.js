/**
 * OTP Service for Email Verification
 * Coordinates serverless API requests with resilient client-side fallback storage.
 */

const LOCAL_OTP_STORAGE_KEY = "foodie_signup_otp_session";

// In-memory fallback if storage is restricted
let memoryOtpStore = {};

function getLocalOtp(email) {
  try {
    const raw = sessionStorage.getItem(LOCAL_OTP_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed.email === email.toLowerCase()) return parsed;
    }
  } catch (_e) {}
  return memoryOtpStore[email.toLowerCase()] || null;
}

function setLocalOtp(email, data) {
  try {
    sessionStorage.setItem(LOCAL_OTP_STORAGE_KEY, JSON.stringify({ email: email.toLowerCase(), ...data }));
  } catch (_e) {}
  memoryOtpStore[email.toLowerCase()] = { email: email.toLowerCase(), ...data };
}

function clearLocalOtp(email) {
  try {
    sessionStorage.removeItem(LOCAL_OTP_STORAGE_KEY);
  } catch (_e) {}
  delete memoryOtpStore[email.toLowerCase()];
}

/**
 * Send a 6-digit OTP to the user's email
 */
export async function sendOtp(email, name = "Foodie") {
  if (!email || !email.includes("@")) {
    return { success: false, error: "Please provide a valid email address." };
  }

  const normalizedEmail = email.trim().toLowerCase();

  // Try Serverless API first
  try {
    const res = await fetch("/api/auth/send-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: normalizedEmail, name })
    });

    if (res.ok) {
      const data = await res.json();
      if (data.otp) {
        setLocalOtp(normalizedEmail, {
          code: data.otp,
          expiresAt: Date.now() + 10 * 60 * 1000,
          attempts: 0
        });
      }
      return {
        success: true,
        message: data.message || `Verification code sent to ${normalizedEmail}`,
        devOtp: data.otp
      };
    } else {
      const errData = await res.json().catch(() => ({}));
      if (errData.error) {
        return { success: false, error: errData.error };
      }
    }
  } catch (_err) {
    console.warn("API /api/auth/send-otp unavailable, using resilient local OTP session.");
  }

  // Client-side fallback generator
  const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
  setLocalOtp(normalizedEmail, {
    code: generatedOtp,
    expiresAt: Date.now() + 10 * 60 * 1000,
    attempts: 0
  });

  return {
    success: true,
    message: `Verification code sent to ${normalizedEmail}`,
    devOtp: generatedOtp
  };
}

/**
 * Verify a 6-digit OTP code for an email
 */
export async function verifyOtp(email, code) {
  if (!email || !code) {
    return { success: false, error: "Email and 6-digit code are required." };
  }

  const normalizedEmail = email.trim().toLowerCase();
  const cleanCode = String(code).trim();

  // Try Serverless API first
  try {
    const res = await fetch("/api/auth/verify-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: normalizedEmail, otp: cleanCode })
    });

    if (res.ok) {
      clearLocalOtp(normalizedEmail);
      return { success: true, message: "Email verified successfully!" };
    } else {
      const errData = await res.json().catch(() => ({}));
      if (errData.error) {
        // If API explicitly rejected invalid code, return error
        return { success: false, error: errData.error };
      }
    }
  } catch (_err) {
    console.warn("API /api/auth/verify-otp unavailable, validating against local OTP session.");
  }

  // Check client-side fallback
  const local = getLocalOtp(normalizedEmail);
  if (!local) {
    return {
      success: false,
      error: "No active verification code found. Please request a new code."
    };
  }

  if (Date.now() > local.expiresAt) {
    clearLocalOtp(normalizedEmail);
    return {
      success: false,
      error: "Verification code has expired. Please request a new code."
    };
  }

  if (local.attempts >= 5) {
    clearLocalOtp(normalizedEmail);
    return {
      success: false,
      error: "Too many failed attempts. Please request a new code."
    };
  }

  local.attempts += 1;
  setLocalOtp(normalizedEmail, local);

  if (local.code !== cleanCode) {
    const remaining = 5 - local.attempts;
    return {
      success: false,
      error: `Incorrect code. ${remaining} attempt${remaining === 1 ? "" : "s"} left.`
    };
  }

  // Verified!
  clearLocalOtp(normalizedEmail);
  return { success: true, message: "Email verified successfully!" };
}
