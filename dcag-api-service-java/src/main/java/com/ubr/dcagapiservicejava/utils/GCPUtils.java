package com.ubr.dcagapiservicejava.utils;

import com.google.cloud.storage.*;
import org.springframework.stereotype.Component;

import java.net.URL;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.TimeUnit;

@Component
public class GCPUtils {
    /**
     * Signing a URL requires Credentials which implement ServiceAccountSigner. These can be set
     * explicitly using the Storage.SignUrlOption.signWith(ServiceAccountSigner) option. If you don't,
     * you could also pass a service account signer to StorageOptions, i.e.
     * StorageOptions().newBuilder().setCredentials(ServiceAccountSignerCredentials). In this example,
     * neither of these options are used, which means the following code only works when the
     * credentials are defined via the environment variable GOOGLE_APPLICATION_CREDENTIALS, and those
     * credentials are authorized to sign a URL. See the documentation for Storage.signUrl for more
     * details.
     */
    public String generateV4GetObjectSignedUrl(/*
            String projectId, String bucketName, String objectName*/) throws StorageException {
        String projectId = "anz-driver-ops-ritu";
        String bucketName = "dcag-tasks-input";
        String objectName = "audio/file_example_MP3_700KB.mp3";

        Storage storage = StorageOptions.newBuilder().setProjectId(projectId).build().getService();

        // Define resource
        BlobInfo blobInfo = BlobInfo.newBuilder(BlobId.of(bucketName, objectName)).build();

        URL url =
                storage.signUrl(blobInfo, 15, TimeUnit.MINUTES, Storage.SignUrlOption.withV4Signature());

        System.out.println("Generated GET signed URL:" + url);
        return url.toString();
    }

    public String generateV4PutObjectSignedUrl() throws StorageException {
        String projectId = "anz-driver-ops-ritu";
        String bucketName = "dcag-tasks-output";
        String objectName = "audio/";

        Storage storage = StorageOptions.newBuilder().setProjectId(projectId).build().getService();

        // Define Resource
        BlobInfo blobInfo = BlobInfo.newBuilder(BlobId.of(bucketName, objectName)).build();

        // Generate Signed URL
        Map<String, String> extensionHeaders = new HashMap<>();
        extensionHeaders.put("Content-Type", "application/octet-stream");

        URL url =
                storage.signUrl(
                        blobInfo,
                        15,
                        TimeUnit.MINUTES,
                        Storage.SignUrlOption.httpMethod(HttpMethod.PUT),
                        Storage.SignUrlOption.withExtHeaders(extensionHeaders),
                        Storage.SignUrlOption.withV4Signature());

        System.out.println("Generated PUT signed URL:" + url);
        System.out.println(
                "You can use this URL with any user agent, for example: curl -X PUT -H 'Content-Type: application/octet-stream' --upload-file my-file '"
                        + url
                        + "'");
        return url.toString();

    }
}