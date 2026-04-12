package com.ruralconnect.backend.auth.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Service
public class OtpMailService {

    private final JavaMailSender mailSender;

    @Value("${app.mail.mock-enabled:true}")
    private boolean mockEnabled;

    @Value("${spring.mail.username:no-reply@ruralconnect.local}")
    private String fromAddress;

    public OtpMailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendOtp(String toEmail, String otp) {
        if (mockEnabled) {
            System.out.println("[MOCK-EMAIL] OTP for " + toEmail + " is: " + otp);
            return;
        }

            try {
                MimeMessage message = mailSender.createMimeMessage();
                MimeMessageHelper helper = new MimeMessageHelper(message, false, "UTF-8");

                helper.setFrom(fromAddress);
                helper.setTo(toEmail);
                helper.setSubject("Rural Connect - OTP Verification Code");
                helper.setText(buildOtpHtml(otp), true);

                mailSender.send(message);
            } catch (MessagingException | RuntimeException ex) {
                throw new IllegalStateException("Failed to send OTP email", ex);
            }
    }

        private String buildOtpHtml(String otp) {
            return """
                                <!doctype html>
                                <html>
                                <body style=\"margin:0;padding:0;background:#f3f7fb;font-family:Arial,sans-serif;color:#1f2937;\">
                                    <table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" style=\"padding:24px 12px;\">
                                        <tr>
                                            <td align=\"center\">
                                                <table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" style=\"max-width:620px;background:#ffffff;border-radius:14px;overflow:hidden;border:1px solid #e5e7eb;\">
                                                    <tr>
                                                        <td style=\"background:linear-gradient(135deg,#0B3C5D,#1E90FF);padding:18px 22px;color:#ffffff;\">
                                                            <table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\">
                                                                <tr>
                                                                    <td style=\"font-size:20px;font-weight:700;letter-spacing:0.2px;\">Rural Connect</td>
                                                                    <td align=\"right\" style=\"font-size:12px;opacity:0.9;\">Secure Verification</td>
                                                                </tr>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td style=\"padding:26px 24px 10px;\">
                                                            <p style=\"margin:0 0 8px;font-size:18px;font-weight:700;color:#111827;\">Verify Your Account</p>
                                                            <p style=\"margin:0;font-size:14px;line-height:1.7;color:#4b5563;\">
                                                                Thank you for registering on Rural Connect. Use the OTP below to complete your email verification.
                                                            </p>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td align=\"center\" style=\"padding:16px 24px;\">
                                                            <div style=\"display:inline-block;background:#fff7ed;border:1px dashed #F59E0B;border-radius:12px;padding:14px 24px;font-size:32px;letter-spacing:8px;font-weight:800;color:#0B3C5D;\">{{OTP}}</div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td style=\"padding:0 24px 24px;\">
                                                            <p style=\"margin:0 0 8px;font-size:13px;color:#6b7280;\">This OTP is valid for <strong>10 minutes</strong>.</p>
                                                            <p style=\"margin:0;font-size:13px;color:#6b7280;\">Do not share this code with anyone for security reasons.</p>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td style=\"padding:14px 24px;background:#f8fafc;border-top:1px solid #e5e7eb;font-size:12px;line-height:1.6;color:#6b7280;\">
                                                            This is an automated message from Rural Connect. Please do not reply to this email.
                                                        </td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                    </table>
                                </body>
                                </html>
                                """.replace("{{OTP}}", otp);
        }
}
