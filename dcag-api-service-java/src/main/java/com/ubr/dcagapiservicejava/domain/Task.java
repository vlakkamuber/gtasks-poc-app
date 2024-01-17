package com.ubr.dcagapiservicejava.domain;

import com.ubr.dcagapiservicejava.domain.enums.TaskStatus;
import com.ubr.dcagapiservicejava.domain.enums.TaskType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Set;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Accessors(fluent = true, chain = true)
@Table(name = "tasks")

public class Task implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

//    @Column(columnDefinition = "geometry")
//    @JsonIgnore
//    private Point location;

    @Enumerated(EnumType.STRING)
    @Column(name = "task_type")
    private TaskType taskType = TaskType.NA;

//    @Transient
//    @Column(columnDefinition = "geometry")
//    @JsonIgnore
//    private Point location;

    @Column(name = "max_number_of_users")
    private long maxNoOfUsers;

    private String input;

    @Enumerated(EnumType.STRING)
    private TaskStatus status;

    private String currency;

    private Double price;

    @Column(name = "create_time")
    private LocalDateTime createTime;

    @Column(name = "due_time")
    private LocalDateTime dueDate;

    @Column(name = "is_available")
    private Boolean isAvailable = true;

    @OneToMany(mappedBy = "task")
    Set<UserTask> userTasks;

}
