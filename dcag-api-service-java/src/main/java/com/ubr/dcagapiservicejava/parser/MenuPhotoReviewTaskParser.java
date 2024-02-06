package com.ubr.dcagapiservicejava.parser;

import com.google.cloud.storage.Blob;
import com.opencsv.CSVReader;
import com.ubr.dcagapiservicejava.domain.Task;
import com.ubr.dcagapiservicejava.domain.enums.TaskCategory;
import com.ubr.dcagapiservicejava.domain.enums.TaskStatus;
import com.ubr.dcagapiservicejava.dto.IngestTaskDTO;
import com.ubr.dcagapiservicejava.utils.DcagUtils;
import com.ubr.dcagapiservicejava.utils.GCPUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.InputStreamReader;
import java.io.Reader;
import java.nio.channels.Channels;
import java.util.HashSet;
import java.util.Set;

@Slf4j
@Component
public class MenuPhotoReviewTaskParser implements TaskParser{
    @Value("${task_currency}")
    String taskCurrency;

    @Value("${menu_photo_review_task_price}")
    Double taskPrice;

    @Value("${menu_photo_review_max_no_user}")
    Long maxNumberOfUser;

    @Autowired
    GCPUtils gcpUtils;

    @Override
    public TaskParserResponse parseTaskFile(IngestTaskDTO ingestTaskDTO) throws FileNotFoundException {
        Blob blobFile = gcpUtils.getMenuPhotoReviewCSVFile(ingestTaskDTO.file() + ".csv");
        Set<Task> taskList = new HashSet<>();

        int totalCount=0,successCount=0,errorCount=0;

        if (blobFile != null) {
            try (Reader reader = new BufferedReader(new InputStreamReader(Channels.newInputStream(blobFile.reader())))) {

                CSVReader csvReader = new CSVReader(reader);
                csvReader.skip(1);
                String[] nextRecord;

                while ((nextRecord = csvReader.readNext()) != null) {
                    totalCount++;
                    try {
                        Task task = new Task().name(nextRecord[0].split("\\.")[0]).input(nextRecord[0])
                                .taskType(ingestTaskDTO.taskType())
                                .taskCategory(TaskCategory.valueOf(ingestTaskDTO.taskType().name()))
                                .maxNoOfUsers(maxNumberOfUser)
                                .currency(taskCurrency)
                                .price(taskPrice)
                                .status(TaskStatus.NEW)
                                .createTime(DcagUtils.convertEpochToLocalDateTime(System.currentTimeMillis()))
                                .lastUpdatedTime(DcagUtils.convertEpochToLocalDateTime(System.currentTimeMillis()));
                        taskList.add(task);
                        successCount++;
                    }catch (Exception e){
                        log.error("Exception occurred while parsing csv",e);
                        errorCount++;
                    }
                }

            } catch (Exception e) {
                throw new RuntimeException(e);
            }
        } else {
            throw new FileNotFoundException("File Not found");
        };

        return TaskParserResponse.builder().taskSet(taskList).totalCount(totalCount)
                .successCount(successCount).errorCount(errorCount).build();
    }
}
