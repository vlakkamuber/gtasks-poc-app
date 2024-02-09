package com.ubr.dcagapiservicejava.utils;

import com.ubr.dcagapiservicejava.error.TaskNotFoundException;
import com.ubr.dcagapiservicejava.error.UserNotFoundException;
import org.apache.commons.lang3.StringUtils;

import java.time.*;
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

    public static LocalDate convertEpochToLocalDate(Long epoch) {
        Instant instant = Instant.ofEpochMilli(epoch);
        return instant.atZone(ZoneOffset.UTC).toLocalDate();
    }

    public static LocalDate convertEpochToSytemLocalDate(Long epoch) {
        Instant instant = Instant.ofEpochMilli(epoch);
        return instant.atZone(ZoneId.systemDefault()).toLocalDate();
    }

    public static LocalDateTime convertLocalDateToSystemLocalDate(LocalDateTime localDateTime) {
        ZonedDateTime zonedUTC = localDateTime.atZone(ZoneId.of("UTC"));
        ZonedDateTime zonedIST = zonedUTC.withZoneSameInstant(ZoneId.systemDefault());
        return zonedIST.toLocalDateTime();
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

//    public static void authenticateUserId(String userId) {
//        SecurityContext securityContext = SecurityContextHolder.getContext();
//        FirebaseAuthenticationToken authentication = (FirebaseAuthenticationToken) securityContext.getAuthentication();
//        String uid = authentication.getFirebaseToken().getUid();
//
//        if(!uid.equals(userId)){
//            throw new UnauthorizedUserException("User is not Authorized - " + userId);
//        }
//    }
}
