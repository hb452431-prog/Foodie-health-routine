// In-memory store for active OTP codes across requests
// Format: { [email]: { code: string, expiresAt: number, attempts: number } }
global.otpStore = global.otpStore || new Map();

/**
 * Serverless Handler: /api/auth/send-otp
 * Generates and dispatches a 6-digit OTP to the user's email address.
 */
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      error: "Method Not Allowed. Use POST."
    });
  }

  try {
    const { email, name } = req.body || {};

    if (!email || !email.includes("@")) {
      return res.status(400).json({
        success: false,
        error: "A valid email address is required to send verification OTP."
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Check rate limit: Don't spam if code was requested in the last 15 seconds
    const existing = global.otpStore.get(normalizedEmail);
    if (existing && Date.now() < existing.createdAt + 15000) {
      return res.status(429).json({
        success: false,
        error: "Please wait a moment before requesting another code."
      });
    }

    // Generate random 6-digit numeric OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes expiry

    // Save to memory store
    global.otpStore.set(normalizedEmail, {
      code: otp,
      name: name || "Foodie",
      createdAt: Date.now(),
      expiresAt,
      attempts: 0
    });

    console.log(`[API /api/auth/send-otp] Generated OTP for ${normalizedEmail}: ${otp}`);

    // If RESEND_API_KEY or SMTP is available, deliver email
    const resendApiKey = process.env.RESEND_API_KEY;
    if (resendApiKey) {
      try {
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${resendApiKey}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            from: "Foodie's Adda <onboarding@resend.dev>",
            to: [normalizedEmail],
            subject: `Your Foodie Verification Code: ${otp}`,
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; padding: 24px; border: 1px solid #E2E8F0; border-radius: 12px;">
                <h2 style="color: #059669; margin-bottom: 8px;">Foodie's Adda 🥗</h2>
                <p style="color: #475569; font-size: 15px;">Hello <strong>${name || "Foodie"}</strong>,</p>
                <p style="color: #475569; font-size: 14px;">Use the following 6-digit verification code to complete your account registration:</p>
                <div style="background: #F0FDF4; border: 2px dashed #059669; padding: 16px; text-align: center; border-radius: 8px; margin: 20px 0;">
                  <span style="font-size: 32px; font-weight: 800; letter-spacing: 6px; color: #065F46;">${otp}</span>
                </div>
                <p style="color: #94A3B8; font-size: 12px; margin-top: 16px;">This code will expire in 10 minutes. If you did not request this, please ignore this email.</p>
              </div>
            `
          })
        });
      } catch (mailErr) {
        console.warn("[API send-otp] Failed to send via Resend:", mailErr);
      }
    }

    return res.status(200).json({
      success: true,
      message: `Verification code sent to ${normalizedEmail}`,
      expiresInMinutes: 10,
      otp: process.env.NODE_ENV !== "production" ? otp : undefined
    });
  } catch (err) {
    console.error("[API send-otp] Error:", err);
    return res.status(500).json({
      success: false,
      error: "Internal server error while generating verification OTP."
    });
  }
}
