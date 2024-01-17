package com.ubr.dcagapiservicejava.utils;

import com.ubr.dcagapiservicejava.error.TaskNotFoundException;
import com.ubr.dcagapiservicejava.error.UserNotFoundException;
import org.apache.commons.lang3.StringUtils;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;
import java.util.function.Supplier;

/**
 * Common util functions
 *
 */
public class DcagUtils {

    public static LocalDateTime convertEpochToLocalDateTime(Long epoch) {
        Instant instant = Instant.ofEpochMilli(epoch);
        return instant.atZone(ZoneOffset.UTC).toLocalDateTime();
    }

    public static  long convertLocalDateTimeToEpoch(LocalDateTime dateTime) {
        return dateTime.toEpochSecond(ZoneOffset.UTC);
    }

    public static Supplier<UserNotFoundException> userNotFound(String userId) {
        return () -> new UserNotFoundException("User not found: " + userId);
    }

    public static Supplier<TaskNotFoundException> taskNotFound(Long taskId) {
        return () -> new TaskNotFoundException("Task not found: " + taskId);
    }

    public static LocalDateTime covertDateStringToLocalDateTime(String dateTime) {
        if (StringUtils.isEmpty(dateTime)) {
            return null;
        }
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss");
        return LocalDateTime.parse(dateTime, formatter);
    }
}
