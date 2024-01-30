package com.ubr.dcagapiservicejava.domain;

//import com.google.cloud.firestore.annotation.DocumentId;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.Accessors;

import java.io.Serializable;
import java.util.List;
import java.util.Set;

//@Document(collectionName = "users")

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

    @Column(name = "phone_number")
    private String phoneNumber;

    @OneToMany(mappedBy = "user")
    private Set<UserTask> userTasks;

    @OneToMany(mappedBy = "user")
    private List<UserIssue> userIssues;

}
