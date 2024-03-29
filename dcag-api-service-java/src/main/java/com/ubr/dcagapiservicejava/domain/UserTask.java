package com.ubr.dcagapiservicejava.domain;

/*import com.google.cloud.firestore.annotation.DocumentId;
import com.google.cloud.spring.data.firestore.Document;
import lombok.Data;*/

import com.ubr.dcagapiservicejava.domain.enums.UserTaskStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

import java.io.Serializable;
import java.time.LocalDateTime;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Accessors(fluent = true, chain = true)
@Table(name = "user_tasks")
public class UserTask implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
//    @DocumentId

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "task_id")
    private Task task;

    @Enumerated(EnumType.STRING)
    private UserTaskStatus status;

    @Column(name = "use_input_as_output")
    private Boolean useInputAsOutput = false;

    private String output;

    @Column(name = "output_file_type")
    private String outputFileType;

    @Column(name = "output_desc")
    private String outputDesc;

    @Column(name = "start_time")
    private LocalDateTime startTime;

    @Column(name = "completion_time")
    private LocalDateTime completionTime;

    @Column(name = "last_updated_time")
    private LocalDateTime lastUpdatedTime;

}
