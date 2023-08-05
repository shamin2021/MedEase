package com.medease.backend.assets;

public class ResetPasswordEmailTemplate {

    public static String PasswordResetEmailTemplate( String resetLink ) {

        String logoUrl = "https://imageupload.io/ib/sMW6PGyr7rrBLxa_1690297021.png";

        return "<html>"
                + "<head>"
                + "<style>"
                + "body { font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0; }"
                + ".container { max-width: 600px; margin: 0 auto; padding: 20px; }"
                + ".header { background-color: #007bff; color: #fff; text-align: center; padding: 10px 0; }"
                + ".content { background-color: #fff; padding: 20px; border-radius: 5px; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); }"
                + "a { color: #007bff; text-decoration: none; }"
                + "</style>"
                + "</head>"
                + "<body>"
                + "<div class=\"container\">"
                + "<div class=\"header\"><h1>Password Reset</h1></div>"
                + "<div class=\"content\">"
                + "<p>Hello,</p>"
                + "<p>You have requested to reset your password.</p>"
                + "<p>Click the link below to change your password:</p>"
                + "<p><a href=\"" + resetLink + "\">Change my password</a></p>"
                + "<p>If you didn't request this change, you can safely ignore this email.</p>"
                + "<p><img src=\"" + logoUrl + "\" alt=\"Professional Logo\"></p>"
                + "</div>"
                + "</div>"
                + "</body>"
                + "</html>";
    }

}
