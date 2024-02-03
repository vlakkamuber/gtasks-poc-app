package com.ubr.dcagapiservicejava.service;

import com.ubr.dcagapiservicejava.dto.DocDetailsResponse;
import com.ubr.dcagapiservicejava.dto.DocResponse;
import com.ubr.dcagapiservicejava.utils.GCPUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class DocService {


    List<String> fileNames = List.of("training-demo");

    @Autowired
    GCPUtils gcpUtils;

    public DocResponse getDocsUrl(String type) {

    if(type.equals("training")){

        List<DocDetailsResponse> docDetailsResponses = new ArrayList<>();

        for(String fileName : fileNames) {
            DocDetailsResponse.DocDetailsResponseBuilder docDetailsResponseBuilder = DocDetailsResponse.builder()
                    .name(fileName).type("video").url(gcpUtils.signTrainingVideoUrl(fileName+"-v0.1.mp4"));

            docDetailsResponses.add(docDetailsResponseBuilder.build());
        }

        return DocResponse.builder()
                .type("Training").docs(docDetailsResponses).build();

    }
        return new DocResponse();
    }
}
