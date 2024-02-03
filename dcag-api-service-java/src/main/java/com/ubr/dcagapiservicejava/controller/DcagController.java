package com.ubr.dcagapiservicejava.controller;

import com.ubr.dcagapiservicejava.utils.GCPUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
public class DcagController {


    private final String APP_VERSION = "demo-v0.1";

    @Autowired
    private GCPUtils gcpUtils;

    @CrossOrigin
    @GetMapping(value = "/doc", produces = "application/json")
    ResponseEntity<String> getTrainingDocUrl(@RequestParam String type) {

        String fileName = type + APP_VERSION + ".mp4";

       return ResponseEntity.ok(gcpUtils.signTrainingVideoUrl(fileName));

    }
}
