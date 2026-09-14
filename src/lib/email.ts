import { createTransport } from "nodemailer";
import type { Transporter } from "nodemailer";

type SendEmailParams = {
  to: string;
  subject: string;
  text?: string;
  html?: string;
};

type EmailTemplateParams = {
  title: string;
  message: string;
  ctaLabel?: string;
  ctaUrl?: string;
};

let transporter: Transporter | null = null;

function getTransporter() {
  if (!transporter) {
    transporter = createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: process.env.SMTP_SECURE === "true",
      auth:
        process.env.SMTP_USER && process.env.SMTP_PASSWORD
          ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASSWORD }
          : undefined,
    });
  }
  return transporter;
}

export function emailTemplate({
  title,
  message,
  ctaLabel,
  ctaUrl,
}: EmailTemplateParams): string {
  const cta = ctaLabel && ctaUrl
    ? `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:24px 0;"><tr><td><a href="${ctaUrl}" style="background:#166534;color:#ffffff;text-decoration:none;padding:12px 24px;border-radius:8px;font-weight:600;display:inline-block;">${ctaLabel}</a></td></tr></table>`
    : "";
  return `<!DOCTYPE html>
<html>
<body style="margin:0;background:#f3f4f6;font-family:Arial,Helvetica,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="padding:24px;">
    <tr>
      <td align="center">
        <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;">
          <tr>
            <td style="background:#166534;color:#ffffff;padding:24px 32px;">
              <h1 style="margin:0;font-size:20px;">Fessel FC</h1>
              <p style="margin:4px 0 0;opacity:.85;font-size:13px;">Fans, Community &amp; Football</p>
            </td>
          </tr>
          <tr>
            <td style="padding:32px;color:#111827;">
              <h2 style="margin:0 0 12px;font-size:18px;">${title}</h2>
              <p style="margin:0;font-size:14px;line-height:1.6;">${message}</p>
              ${cta}
            </td>
          </tr>
          <tr>
            <td style="padding:16px 32px;border-top:1px solid #e5e7eb;color:#6b7280;font-size:12px;">
              You are receiving this email because of activity on Fessel FC. If you did not expect this, you can safely ignore it.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export const MAIL_FROM =
  process.env.SMTP_FROM || "Fessel FC <no-reply@fcfassell.com>";

export async function sendEmail({
  to,
  subject,
  text,
  html,
}: SendEmailParams): Promise<void> {
  if (!process.env.SMTP_HOST) {
    console.log(`[email] SMTP not configured; skipped "${subject}" to ${to}`);
    return;
  }
  try {
    await getTransporter().sendMail({
      from: MAIL_FROM,
      to,
      subject,
      text,
      html,
    });
  } catch (error) {
    console.error("[email] failed to send", subject, error);
  }
}