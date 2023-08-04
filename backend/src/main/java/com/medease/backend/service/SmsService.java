package com.medease.backend.service;

import com.twilio.Twilio;
import com.twilio.exception.ApiException;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.rest.lookups.v1.PhoneNumber;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SmsService {

    public void sendSMS(String recipientPhoneNumber, String link){

        String TWILIO_AUTH = "6a59bc7069618e16baa3455513798a45";
        String TWILIO_SID = "ACc68a37f31c2355ba8d31befba02495c4";
        Twilio.init(TWILIO_SID, TWILIO_AUTH);

        String messageBody = "Hello, Follow this  link to reset your password: "
                + link + "\n\nIgnore this SMS if you have not made the request.";

//        try {
//            Message.creator(
//                    new PhoneNumber(recipientPhoneNumber),
//                    new PhoneNumber("+12176694144"),
//                    messageBody
//            ).create();
//        } catch (Exception e) {
//            System.err.println("Error Sending SMS: " + e.getMessage());
//        }
    }

}
