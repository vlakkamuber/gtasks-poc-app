package com.ubr.dcagapiservicejava.domain;

//import com.google.cloud.firestore.annotation.DocumentId;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.Accessors;

import java.io.Serializable;
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

    String email;
    String firstName;
    String lastName;
    String cityName;
    String phoneNumber;

    @OneToMany(mappedBy = "user")
    Set<UserTask> userTasks;

}
