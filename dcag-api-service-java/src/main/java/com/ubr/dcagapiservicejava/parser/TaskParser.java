package com.ubr.dcagapiservicejava.parser;

import com.ubr.dcagapiservicejava.dto.IngestTaskDTO;

import java.io.FileNotFoundException;

public interface TaskParser {

    public TaskParserResponse parseTaskFile(IngestTaskDTO ingestTaskDTO) throws FileNotFoundException;
}
