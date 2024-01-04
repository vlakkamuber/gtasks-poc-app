package com.ubr.dcagapiservicejava.domain;

//import com.google.cloud.firestore.annotation.DocumentId;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

//@Document(collectionName = "users")

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Accessors(fluent = true, chain = true)
@Table(name = "Tasks")

public class Task {
    //@DocumentId
    @Id
    String id;

    String email;
    String firstName;
    String lastName;
    Double locationLat;
    Double locationLong;
    String phoneNumber;


//    List<UserTask> utasks;
}
