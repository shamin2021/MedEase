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

    public void sendEmail(String recipientEmail, String subject, String content) throws MessagingException, UnsupportedEncodingException {

        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);

        helper.setFrom("medease.lk@gmail.com", "MedEase Support");
        helper.setTo(recipientEmail);
        helper.setSubject(subject);
        helper.setText(content,true);
        mailSender.send(message);

    }
}
