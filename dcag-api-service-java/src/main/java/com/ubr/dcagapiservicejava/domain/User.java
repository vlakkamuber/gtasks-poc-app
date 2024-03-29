package com.ubr.dcagapiservicejava.domain;

import com.ubr.dcagapiservicejava.domain.enums.UserStatus;
import com.ubr.dcagapiservicejava.domain.enums.UserType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;


@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Accessors(fluent = true, chain = true)
@Table(name = "users")
public class User implements Serializable {

    @Id
    private String id;
    //@DocumentId

    private String email;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "city_name")
    private String cityName;

    @Enumerated(EnumType.STRING)
    @Column(name = "user_type")
    private UserType userType;

    @Enumerated(EnumType.STRING)
    private UserStatus status;

    @Column(name = "phone_number")
    private String phoneNumber;

    @Column(name = "preferred_lang")
    private String preferredLanguage;

    @Column(name = "native_lang")
    private String nativeLanguage;

    private String country;

    private String currency;

    @Column(name = "create_time")
    private LocalDateTime createTime;

    @OneToMany(mappedBy = "user")
    private Set<UserTask> userTasks;

    @OneToMany(mappedBy = "user")
    private List<UserIssue> userIssues;

    @OneToMany(mappedBy = "user")
    private List<UserEvents> userEvents;

    @OneToMany(mappedBy = "user")
    private List<UserSurvey> userSurveys;
}
