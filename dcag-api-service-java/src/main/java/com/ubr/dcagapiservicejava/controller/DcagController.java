package com.ubr.dcagapiservicejava.controller;

import com.ubr.dcagapiservicejava.dto.DocResponse;
import com.ubr.dcagapiservicejava.service.DocService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
public class DcagController {


    @Autowired
    private DocService docService;

    @CrossOrigin
    @GetMapping(value = "/docs", produces = "application/json")
    ResponseEntity<DocResponse> getDocsUrl(@RequestParam(defaultValue = "training") String type) {

       return ResponseEntity.ok(docService.getDocsUrl(type));

    }
}
