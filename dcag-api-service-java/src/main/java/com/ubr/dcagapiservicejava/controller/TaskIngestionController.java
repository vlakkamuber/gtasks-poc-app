package com.ubr.dcagapiservicejava.controller;

import com.ubr.dcagapiservicejava.dto.IngestTaskDTO;
import com.ubr.dcagapiservicejava.dto.IngestTaskResponse;
import com.ubr.dcagapiservicejava.service.IngestTaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@CrossOrigin
public class TaskIngestionController {


    @Autowired
    IngestTaskService ingestTaskService;

    @PostMapping(value = "/ingest-tasks",consumes = "application/json")
    ResponseEntity<?> ingestTasks(@RequestBody IngestTaskDTO ingestTaskDTO) throws IOException {

        IngestTaskResponse ingestTaskResponse = ingestTaskService.ingestTasks(ingestTaskDTO);

        return ResponseEntity.ok(ingestTaskResponse);
    }

}
