package com.ubr.dcagapiservicejava.service;


import com.google.cloud.storage.Blob;
import com.opencsv.CSVReader;
import com.opencsv.exceptions.CsvValidationException;
import com.ubr.dcagapiservicejava.domain.Task;
import com.ubr.dcagapiservicejava.domain.enums.TaskCategory;
import com.ubr.dcagapiservicejava.domain.enums.TaskStatus;
import com.ubr.dcagapiservicejava.dto.IngestTaskDTO;
import com.ubr.dcagapiservicejava.repository.TaskRepository;
import com.ubr.dcagapiservicejava.utils.DcagUtils;
import com.ubr.dcagapiservicejava.utils.GCPUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.*;
import java.nio.channels.Channels;
import java.util.HashSet;
import java.util.Set;

@Service
public class IngestTaskService {

    private final String TASK_CURRENCY = "INR";

    private final Double TASK_PRICE = 0.5;

    private final Long TASK_MAX_NO_USER = 20L;



    @Autowired
    GCPUtils gcpUtils;

    @Autowired
    TaskRepository taskRepository;

    public void ingestTasks(IngestTaskDTO ingestTaskDTO) throws IOException {

        Blob blobFile = gcpUtils.getRecordAudioCSVFile(ingestTaskDTO.file() + ".csv");
        Set<Task> taskList = new HashSet<>();
        if (blobFile != null) {
            try (Reader reader = new BufferedReader(new InputStreamReader(Channels.newInputStream(blobFile.reader())))) {

                CSVReader csvReader = new CSVReader(reader);
                csvReader.skip(1);
                String[] nextRecord;

                while ((nextRecord = csvReader.readNext()) != null) {

                    Task task = new Task().name(nextRecord[0]).input(nextRecord[1])
                            .city(nextRecord[2]).taskType(ingestTaskDTO.taskType())
                            .taskCategory(TaskCategory.valueOf(ingestTaskDTO.taskType().name()))
                            .maxNoOfUsers(TASK_MAX_NO_USER)
                            .currency(TASK_CURRENCY)
                            .price(TASK_PRICE)
                            .status(TaskStatus.NEW)
                            .createTime(DcagUtils.convertEpochToLocalDateTime(System.currentTimeMillis()));

                    taskList.add(task);
                }

                taskRepository.saveAll(taskList);

            } catch (CsvValidationException e) {
                throw new RuntimeException(e);
            }
        } else {
            throw new FileNotFoundException("File Not found");
        }

    }
}
