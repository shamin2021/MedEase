package com.medease.backend.service;

import java.time.LocalDate;
import java.time.temporal.WeekFields;
import java.util.Locale;

public class DateHandleService {

    /**
     * Get the year + week number of a date
     * 
     * @param date String format: yyyy-MM-dd
     * @return week number in integer
     */
    public static int getWeekNumber(String date) {
        try {
            LocalDate localDate = LocalDate.parse(date);

            WeekFields weekFields = WeekFields.of(Locale.getDefault());

            int year = localDate.getYear();
            int month = localDate.getMonthValue();
            int weekNumber = localDate.get(weekFields.weekOfWeekBasedYear());

            // If the week number is 1 and the month is 12, then the year should be the next
            if (month == 12 && weekNumber == 1) {
                year += 1;
            }

            // Combine year and week number
            weekNumber = year * 100 + weekNumber;

            return weekNumber;
        } catch (Exception e) {
            return -1;
        }

    }

    public static int getPreviousWeekNumberByWeekNumber(int weekNumber) {
        int year = weekNumber / 100;
        int week = weekNumber % 100;

        // If the current week is 1, then the previous week should be the last week of
        // the previous year
        if (week == 1) {
            year -= 1;
            week = 52;
        } else {
            week -= 1;
        }

        return year * 100 + week;
    }

    public static int getNPreviousWeek(int n) {
        int weekNumber = getCurrentWeekNumber();
        for (int i = 0; i < n; i++) {
            weekNumber = getPreviousWeekNumberByWeekNumber(weekNumber);
        }

        return weekNumber;
    }

     /**
     * Get the previous week number of a date
     * 
     * @param date String format: yyyy-MM-dd
     * @return previous week number in integer
     */
    public static int getPreviousWeekNumber(String date) {
        int currWeekNumber = getWeekNumber(date);

        return getPreviousWeekNumberByWeekNumber(currWeekNumber);
    }

    /**
     * Get the current week number
     * 
     * @return current week number in integer
     */
    public static int getCurrentWeekNumber() {
        LocalDate localDate = LocalDate.now();

        // convert to yyyy-MM-dd format
        String date = localDate.toString();

        int weekNumber = getWeekNumber(date);

        return weekNumber;
    }

    /**
     * Get the next week number
     * 
     * @return next week number in integer
     */
    public static int getNextWeekNumber() {
        int weekNumber = getCurrentWeekNumber();

        int year = weekNumber / 100;
        int week = weekNumber % 100;

        // If the current week is 52, then the next week should be the first week of the
        // next year
        if (week == 52) {
            year += 1;
            week = 1;
        } else {
            week += 1;
        }

        return year * 100 + week;
    }
}
