package com.ubr.dcagapiservicejava.utils;

import com.google.cloud.storage.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.net.URL;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.TimeUnit;

@Component
public class GCPUtils {

        @Value("${spring.cloud.gcp.project-id}")
        String projectId;

        public String signTaskInputImageUrl(String fileName) throws StorageException {
            return generateV4GetObjectSignedUrl("dcag-tasks-input", "image/" + fileName);
        }

        public String signTaskInputAudioUrl(String fileName) throws StorageException {
            return generateV4GetObjectSignedUrl("dcag-tasks-input", "audio/" + fileName);
        }

        public String signTaskOutputAudioUrl(String fileName) throws StorageException {
            return generateV4GetObjectSignedUrl("dcag-tasks-output", "audio/" + fileName);
        }

        public String signTaskUploadAudioUrl(String fileName) throws StorageException {
            return generateV4PutObjectSignedUrl("dcag-tasks-output", "audio/" + fileName);
        }

        public String signTaskUploadImageUrl(String fileName) throws StorageException {
            return generateV4PutObjectSignedUrl("dcag-tasks-output", "image/" + fileName);
        }

        public String signTaskOutputImageUrl(String fileName) throws StorageException {
            return generateV4GetObjectSignedUrl("dcag-tasks-output", "image/" + fileName);
        }

        public String signTrainingVideoUrl(String fileName) throws StorageException {
            return generateV4GetObjectSignedUrl("dcag-training", fileName);
        }

    public Blob getRecordAudioCSVFile(String fileName) throws StorageException {
        return getBlobFile("dcag-tasks-source", "record_audio/" + fileName);
    }

    private Blob getBlobFile(String bucketName, String objectName) throws StorageException {

        Storage storage = StorageOptions.newBuilder().setProjectId(projectId).build().getService();

        return storage.get(bucketName,objectName);
    }

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
    public String generateV4GetObjectSignedUrl(String bucketName, String objectName) throws StorageException {
//        objectName = "audio/"+ objectName;

        Storage storage = StorageOptions.newBuilder().setProjectId(projectId).build().getService();

        // Define resource
        BlobInfo blobInfo = BlobInfo.newBuilder(BlobId.of(bucketName, objectName)).build();

        URL url =
                storage.signUrl(blobInfo, 15, TimeUnit.MINUTES, Storage.SignUrlOption.withV4Signature());

        System.out.println("Generated GET signed URL:" + url);
        return url.toString();
    }

    public String generateV4PutObjectSignedUrl(String bucketName, String objectName) throws StorageException {
//        objectName = "audio/"+ objectName;

        Storage storage = StorageOptions.newBuilder().setProjectId(projectId).build().getService();

        // Define Resource
        BlobInfo blobInfo = BlobInfo.newBuilder(BlobId.of(bucketName, objectName)).build();

        // Generate Signed URL
        Map<String, String> extensionHeaders = new HashMap<>();
        extensionHeaders.put("Content-Type", "application/octet-stream");
        extensionHeaders.put("Access-Control-Allow-Origin", "*"); //TODO: Remove this as this is a response header

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
                "You can use this URL with any user agent, for example: curl -X PUT -H 'Content-Type: application/octet-stream' --upload-file test.txt '"
                        + url
                        + "'");
        return url.toString();

    }
}