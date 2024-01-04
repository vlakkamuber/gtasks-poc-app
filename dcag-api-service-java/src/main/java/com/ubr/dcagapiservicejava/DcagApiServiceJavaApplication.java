package com.ubr.dcagapiservicejava;

import com.ubr.dcagapiservicejava.domain.User;
import com.ubr.dcagapiservicejava.repository.UserRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
public class DcagApiServiceJavaApplication {

	public static void main(String[] args) {
		SpringApplication.run(DcagApiServiceJavaApplication.class, args);
	}

	@Bean
	public CommandLineRunner init(UserRepository repository) {
		return (args) -> {
			repository.save(new User().id("abcdefg").email("jack@xyz.com").firstName("Jack").lastName("Smith").locationLat(17.46339091806766).locationLong(78.34464223068345).phoneNumber("1234567890"));
		};
	}

	/*
	    String id;

    String email;
    String firstName;
    String lastName;
    Double locationLat;
    Double locationLong;
    String phoneNumber;

	 */
}

@RestController
class RootController {

	@RequestMapping("/")
	String root() {
		return "Running...Dcag api service java";
	}
}