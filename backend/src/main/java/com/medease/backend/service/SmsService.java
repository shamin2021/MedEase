package com.medease.backend.service;

import com.twilio.Twilio;
import com.twilio.exception.ApiException;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SmsService {


    @Value("${twilio.auth}")
    private String TWILIO_AUTH;

    @Value("${twilio.sid}")
    private String TWILIO_SID;

    public void sendSMS(String recipientPhoneNumber, String content){

        Twilio.init(TWILIO_SID, TWILIO_AUTH);

        try {
            Message.creator(
                    new PhoneNumber(recipientPhoneNumber),
                    new PhoneNumber("+12176694144"),
                    content
            ).create();
        } catch (ApiException e) {
            System.err.println("Error Sending SMS: " + e.getMessage());
        } catch (Exception e) {
            System.err.println("Error Sending SMS: " + e.getMessage());
        }
    }

}
