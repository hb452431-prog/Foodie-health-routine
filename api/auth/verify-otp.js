// Re-use global OTP store
global.otpStore = global.otpStore || new Map();

/**
 * Serverless Handler: /api/auth/verify-otp
 * Validates the 6-digit OTP code against the active session.
 */
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      error: "Method Not Allowed. Use POST."
    });
  }

  try {
    const { email, otp } = req.body || {};

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        error: "Email and 6-digit verification code are required."
      });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const cleanOtp = String(otp).trim();

    const record = global.otpStore.get(normalizedEmail);

    if (!record) {
      return res.status(400).json({
        success: false,
        error: "No active verification code found for this email. Please request a new one."
      });
    }

    if (Date.now() > record.expiresAt) {
      global.otpStore.delete(normalizedEmail);
      return res.status(400).json({
        success: false,
        error: "Verification code has expired. Please request a new code."
      });
    }

    if (record.attempts >= 5) {
      global.otpStore.delete(normalizedEmail);
      return res.status(429).json({
        success: false,
        error: "Too many incorrect attempts. Please request a new verification code."
      });
    }

    // Increment attempts count
    record.attempts += 1;

    if (record.code !== cleanOtp) {
      const remaining = 5 - record.attempts;
      return res.status(400).json({
        success: false,
        error: `Invalid verification code. ${remaining} attempt${remaining === 1 ? "" : "s"} remaining.`
      });
    }

    // Code is valid! Delete the consumed code so it cannot be re-used
    global.otpStore.delete(normalizedEmail);

    return res.status(200).json({
      success: true,
      message: "Email successfully verified!"
    });
  } catch (err) {
    console.error("[API verify-otp] Error:", err);
    return res.status(500).json({
      success: false,
      error: "Internal server error during verification."
    });
  }
}
