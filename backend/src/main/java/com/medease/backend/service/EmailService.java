package com.medease.backend.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.io.UnsupportedEncodingException;

@Service
@RequiredArgsConstructor
public class EmailService {

    public final JavaMailSender mailSender;

    public void sendEmail(String recipientEmail, String subject, String link) throws MessagingException, UnsupportedEncodingException {

        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);

        helper.setFrom("medease.lk@gmail.com", "MedEase Support");
        helper.setTo(recipientEmail);

        String content = "<html>"
                + "<body>"
                + "<p>Hello,</p>"
                + "<p>You have requested to reset your password.</p>"
                + "<p>Click the link below to change your password:</p>"
                + "<p><a href=" + link + ">Change my password</a></p>"
                + "<br>"
                + "<p>Ignore this email if you do remember your password, "
                + "or you have not made the request.</p>"
                + "</body>"
                + "</html>";

        helper.setSubject(subject);
        helper.setText(content,true);
        mailSender.send(message);

    }
}
