package com.ubr.dcagapiservicejava.service;

import com.ubr.dcagapiservicejava.dto.DocDetailsResponse;
import com.ubr.dcagapiservicejava.dto.DocResponse;
import com.ubr.dcagapiservicejava.utils.GCPUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
public class DocService {


    List<String> fileNames = List.of("app_demo", "image_labelling", "localization_quality",
            "menu_photo_review", "receipt_digitization", "record_audio");

    @Autowired
    GCPUtils gcpUtils;

    public DocResponse getDocsUrl(String type, String language, String name) {

        log.info("Fetching - {} video for language - {}", type, language);
        if (type.equals("training")) {

            List<DocDetailsResponse> docDetailsResponses = new ArrayList<>();

            for (String fileName : fileNames) {
                if (name.equals("all") || fileName.equals(name)) {
                    DocDetailsResponse.DocDetailsResponseBuilder docDetailsResponseBuilder = DocDetailsResponse.builder()
                            .name(fileName).type("video").url(gcpUtils.signTrainingVideoUrl(language + "/" + fileName + ".mp4"));

                    docDetailsResponses.add(docDetailsResponseBuilder.build());
                }
            }

            return DocResponse.builder()
                    .type("Training").docs(docDetailsResponses).build();

        }
        return new DocResponse();
    }
}
