package com.ubr.dcagapiservicejava.parser;

import com.ubr.dcagapiservicejava.domain.Task;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TaskParserResponse {

    private Integer totalCount;

    private Integer successCount;

    private Integer errorCount;

    private Set<Task> taskSet;
}
