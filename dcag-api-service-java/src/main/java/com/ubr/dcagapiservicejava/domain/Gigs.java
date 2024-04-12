package com.ubr.dcagapiservicejava.domain;

import com.ubr.dcagapiservicejava.domain.enums.GigStatus;
import com.ubr.dcagapiservicejava.domain.enums.TaskType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Accessors(fluent = true, chain = true)
@Table(name = "gigs")
public class Gigs {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "task_type")
    private TaskType taskType;

    @Enumerated(EnumType.STRING)
    private GigStatus status;
}
