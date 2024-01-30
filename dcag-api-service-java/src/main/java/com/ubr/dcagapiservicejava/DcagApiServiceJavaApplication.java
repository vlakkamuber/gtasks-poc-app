package com.ubr.dcagapiservicejava;

import com.ubr.dcagapiservicejava.repository.TaskRepository;
import com.ubr.dcagapiservicejava.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
public class DcagApiServiceJavaApplication {

    public static void main(String[] args) {
        SpringApplication.run(DcagApiServiceJavaApplication.class, args);
    }

    @Bean
    public CommandLineRunner init(UserRepository repository, TaskRepository taskRepository) {
        return (args) -> {
//			repository.save(new User().id("abcdefg").email("jack@xyz.com").firstName("Jack").lastName("Smith").phoneNumber("1234567890"));
//			taskRepository.save(new Task().name("CityName").taskType(TaskType.TEXT_TO_AUDIO).currency("INR").price(100.0));
//			taskRepository.save(new Task().name("CityName12").taskType(TaskType.AUDIO_TO_AUDIO).currency("INR").price(50.0));
//			taskRepository.save(new Task().name("CityName13").taskType(TaskType.TEXT_TO_AUDIO).currency("INR").price(120.0));
//			taskRepository.save(new Task().name("CityName14").taskType(TaskType.AUDIO_TO_AUDIO).currency("INR").price(150.0));
//			taskRepository.save(new Task().name("CityName15").taskType(TaskType.TEXT_TO_AUDIO).currency("INR").price(180.0));
        };
    }

}

@RestController
@CrossOrigin
class RootController {
    @RequestMapping("/")
    String root() {
        return "Running...Dcag api service java";
    }

    @RequestMapping("/health")
    String health() {
        return "OK";
    }
}