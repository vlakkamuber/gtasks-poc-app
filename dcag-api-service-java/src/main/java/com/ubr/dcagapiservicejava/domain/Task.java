package com.ubr.dcagapiservicejava.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ubr.dcagapiservicejava.domain.enums.TaskType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;
import org.locationtech.jts.geom.Point;

import java.io.Serializable;
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

    @Enumerated
    @Column(name = "task_type")
    private TaskType taskType=TaskType.NA;

    @Transient
    @Column(columnDefinition = "geometry")
    @JsonIgnore
    private Point location;

    private String input;

    private String currency;

    private Double price;

    @OneToMany(mappedBy = "task")
    Set<UserTask> userTasks;

}
