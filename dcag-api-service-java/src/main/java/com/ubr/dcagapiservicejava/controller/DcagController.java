package com.ubr.dcagapiservicejava.controller;

import com.ubr.dcagapiservicejava.dto.DocResponse;
import com.ubr.dcagapiservicejava.service.DocService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
public class DcagController {


    @Autowired
    private DocService docService;

    @CrossOrigin
    @GetMapping(value = "/docs", produces = "application/json")
    ResponseEntity<DocResponse> getDocsUrl(@RequestParam(required = false, defaultValue = "training") String type,
                                           @RequestParam(required = false, defaultValue = "english") String language,
                                           @RequestParam(required = false, defaultValue = "all") String name) {

        return ResponseEntity.ok(docService.getDocsUrl(type, language, name));

    }
}
