package com.medease.backend.assets;

public class ResetPasswordSmsTemplate {

    public static String PasswordResetSMSTemplate( String link ) {

        return "Password Reset\n"
                + "Hello,\n\n"
                + "You have requested to reset your password.\n"
                + "Click the link below to change your password:\n"
                + link + "\n\n"
                + "If you didn't request this change, you can safely ignore this message.\n";
    }

}
