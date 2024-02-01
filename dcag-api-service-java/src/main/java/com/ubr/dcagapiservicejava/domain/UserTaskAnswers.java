package com.ubr.dcagapiservicejava.domain;

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
@Table(name = "user_task_answers")
public class UserTaskAnswers {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_task_id")
    private UserTask userTask;

    @ManyToOne
    @JoinColumn(name = "question_id")
    private Questions questions;

    private String answer;
}
