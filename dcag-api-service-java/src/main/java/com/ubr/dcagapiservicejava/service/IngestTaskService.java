package com.ubr.dcagapiservicejava.service;

import com.ubr.dcagapiservicejava.domain.enums.TaskType;
import com.ubr.dcagapiservicejava.dto.IngestTaskDTO;
import com.ubr.dcagapiservicejava.dto.IngestTaskResponse;
import com.ubr.dcagapiservicejava.parser.ImageLabellingTaskParser;
import com.ubr.dcagapiservicejava.parser.RecordAudioTaskParser;
import com.ubr.dcagapiservicejava.parser.TaskParser;
import com.ubr.dcagapiservicejava.parser.TaskParserResponse;
import com.ubr.dcagapiservicejava.repository.TaskRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.io.*;
import java.util.HashMap;
import java.util.Map;

@Slf4j
@Service
public class IngestTaskService {

    @Autowired
    TaskRepository taskRepository;

    @Autowired
    RecordAudioTaskParser recordAudioTaskParser;

    @Autowired
    ImageLabellingTaskParser imageLabellingTaskParser;


    Map<TaskType, TaskParser> taskParserMap = new HashMap<>();

    @PostConstruct
    public void init(){

        taskParserMap.put(TaskType.RECORD_AUDIO,recordAudioTaskParser);
        taskParserMap.put(TaskType.IMAGE_LABELLING,imageLabellingTaskParser);
    }

    public IngestTaskResponse ingestTasks(IngestTaskDTO ingestTaskDTO) throws IOException {


        TaskParser taskParser = taskParserMap.get(ingestTaskDTO.taskType());

        TaskParserResponse taskParserResponse = taskParser.parseTaskFile(ingestTaskDTO);

        taskRepository.saveAll(taskParserResponse.getTaskSet());


        return IngestTaskResponse.builder().totalCount(taskParserResponse.getTotalCount())
                .successCount(taskParserResponse.getSuccessCount()).errorCount(taskParserResponse.getErrorCount())
                .build();

    }
}
