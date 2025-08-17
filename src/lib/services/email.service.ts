import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

export async function sendEmail(
  options: EmailOptions
): Promise<{ success: boolean; error?: string }> {
  try {
    const { data, error } = await resend.emails.send({
      from: process.env.FROM_EMAIL || "onboarding@resend.dev",
      ...options,
    });

    if (error) {
      console.error("Resend API error:", error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    console.error("Email sending error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to send email",
    };
  }
}

export function generateOTPEmailHTML(
  userName: string,
  otpCode: string
): string {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Verify Your Email - Serenity Suites</title>
      <style>
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          line-height: 1.6;
          color: #333;
          margin: 0;
          padding: 0;
          background-color: #f8f9fa;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          background-color: #ffffff;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .header {
          background: linear-gradient(135deg, #d97706 0%, #f59e0b 100%);
          padding: 40px 20px;
          text-align: center;
        }
        .header h1 {
          color: white;
          margin: 0;
          font-size: 28px;
          font-weight: 600;
        }
        .content {
          padding: 40px 20px;
          text-align: center;
        }
        .welcome-text {
          font-size: 18px;
          color: #555;
          margin-bottom: 30px;
        }
        .otp-container {
          background-color: #f8f9fa;
          border: 2px dashed #d97706;
          border-radius: 12px;
          padding: 30px;
          margin: 30px 0;
        }
        .otp-code {
          font-size: 48px;
          font-weight: bold;
          color: #d97706;
          letter-spacing: 8px;
          font-family: 'Courier New', monospace;
        }
        .expiry-notice {
          background-color: #fef3c7;
          border: 1px solid #f59e0b;
          border-radius: 8px;
          padding: 15px;
          margin: 20px 0;
          color: #92400e;
        }
        .footer {
          background-color: #f8f9fa;
          padding: 20px;
          text-align: center;
          color: #666;
          font-size: 14px;
        }
        .brand {
          color: #d97706;
          font-weight: 600;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Serenity Suites</h1>
        </div>
        
        <div class="content">
          <div class="welcome-text">
            Welcome to Serenity Suites, <strong>${userName}</strong>! 🎉
          </div>
          
          <p>Thank you for creating an account with us. To complete your registration, please use the verification code below:</p>
          
          <div class="otp-container">
            <div class="otp-code">${otpCode}</div>
          </div>
          
          <div class="expiry-notice">
            ⏰ This code will expire in <strong>10 minutes</strong>
          </div>
          
          <p>If you didn't create this account, please ignore this email.</p>
        </div>
        
        <div class="footer">
          <p>© 2024 <span class="brand">Serenity Suites</span>. All rights reserved.</p>
          <p>This is an automated message, please do not reply.</p>
        </div>
      </div>
    </body>
    </html>
  `;
}
