package com.medease.backend.service;

import com.medease.backend.Exception.CustomException;
import com.medease.backend.assets.NotificationTemplate;
import com.medease.backend.assets.ReminderTemplateDaily;
import com.medease.backend.assets.ReminderTemplateWeekly;
import com.medease.backend.entity.AssignedRecommendation;
import com.medease.backend.entity.Meeting;
import com.medease.backend.repository.*;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.io.UnsupportedEncodingException;
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class EmailService {

    public final JavaMailSender mailSender;
    private final MeetingRepository meetingRepository;
    private final PatientRepository patientRepository;
    private final DoctorRepository doctorRepository;
    private final UserRepository userRepository;
    private final RecommendationRepository recommendationRepository;
    private final AssignedRecommendationRepository assignedRecommendationRepository;
    public void sendEmail(String recipientEmail, String subject, String content) throws MessagingException, UnsupportedEncodingException {

        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);

        helper.setFrom("medease.lk@gmail.com", "MedEase Support");
        helper.setTo(recipientEmail);
        helper.setSubject(subject);
        helper.setText(content,true);
        mailSender.send(message);

    }

    @Scheduled(fixedRate = 1000 * 60 * 5)
    public void sendMeetingReminders() {

        List<Meeting> meetings = meetingRepository.findAll();
        for(Meeting meeting: meetings) {

            var patient = patientRepository.findById(meeting.getPatient().getPatient_id()).orElseThrow();
            var patientMail = userRepository.findById(patient.getPatient_user().getId()).orElseThrow().getEmail();
            var doctor = doctorRepository.findById(meeting.getDoctor().getDoctor_id()).orElseThrow();
            var doctorMail = userRepository.findById(doctor.getDoctor_user().getId()).orElseThrow().getEmail();

            Duration timeUntilMeeting = Duration.between(meeting.getStart(), LocalDateTime.now());

            System.out.println(meeting.getStart());
            System.out.println(LocalDateTime.now());

            if(timeUntilMeeting.toMinutes() == 15 || timeUntilMeeting.toMinutes() == 14){
                try{
                    sendEmail(patientMail, "Meeting Reminder", NotificationTemplate.NotificationTemplate());
                    sendEmail(doctorMail, "Meeting Reminder", NotificationTemplate.NotificationTemplate());
                } catch (UnsupportedEncodingException | MessagingException e) {
                    throw new CustomException("Error while sending notification.");
                }
            }
        }
    }

    @Scheduled(fixedRate = 1000 * 60 * 5)
    public void sendLifestyleRecommendationsDaily() {

        List<AssignedRecommendation> assignedRecommendations = assignedRecommendationRepository.findAll();
        for(AssignedRecommendation assignedRecommendation: assignedRecommendations) {
            var assignedRecommendationID = assignedRecommendation.getAssignedRecommendationId();
            var assignedPatient = assignedRecommendation.getAssigenedUserId();
            var assignedEmail = userRepository.findById(assignedPatient).orElseThrow().getEmail();
            var checkDaily = recommendationRepository.findById(assignedRecommendationID).orElseThrow().getFrequency();

            if(Objects.equals(checkDaily, "Daily")){
                try{
                    sendEmail(assignedEmail, "LifeStyle Recommendation", ReminderTemplateDaily.ReminderTemplateDaily());
                } catch (UnsupportedEncodingException | MessagingException e) {
                    throw new CustomException("Error while sending reminder.");
                }
            }


        }
    }

    @Scheduled(fixedRate = 1000 * 60 * 5)
    public void sendLifestyleRecommendationsWeekly() {

        List<AssignedRecommendation> assignedRecommendations = assignedRecommendationRepository.findAll();
        for(AssignedRecommendation assignedRecommendation: assignedRecommendations) {
            var assignedRecommendationID = assignedRecommendation.getAssignedRecommendationId();
            var assignedPatient = assignedRecommendation.getAssigenedUserId();
            var assignedEmail = userRepository.findById(assignedPatient).orElseThrow().getEmail();
            var checkDaily = recommendationRepository.findById(assignedRecommendationID).orElseThrow().getFrequency();

            if(Objects.equals(checkDaily, "Weekly")){
                try{
                    sendEmail(assignedEmail, "LifeStyle Recommendation", ReminderTemplateWeekly.ReminderTemplateWeekly());
                } catch (UnsupportedEncodingException | MessagingException e) {
                    throw new CustomException("Error while sending reminder.");
                }
            }


        }
    }

}
