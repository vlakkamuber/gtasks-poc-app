package com.ubr.dcagapiservicejava.service;

 
import com.ubr.dcagapiservicejava.dto.UserDTO;
import com.ubr.dcagapiservicejava.error.UserNotFoundException;
import com.ubr.dcagapiservicejava.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.ubr.dcagapiservicejava.domain.User;

import java.util.List;
import java.util.function.Supplier;

import static java.util.stream.Collectors.toList;

@Service
public class UserService {

    @Autowired
    UserRepository userRepository;

    public List<UserDTO> findAll() {
        return userRepository.findAll().stream()
                .map(UserDTO::new)
                .collect(toList());
    }

    public UserDTO create(UserDTO userDTO) {
        User user = new User()
                .email(userDTO.email())
                .firstName(userDTO.firstName())
                .lastName(userDTO.lastName())
                .locationLat(userDTO.locationLat())
                .locationLong(userDTO.locationLong())
                .phoneNumber(userDTO.phoneNumber());
        return new UserDTO(userRepository.save(user));
    }

    public UserDTO findById(String userId) {
        return userRepository
                .findById(String.valueOf(userId))
                .map(UserDTO::new)
                .orElseThrow(userNotFound(userId));
    }

    public UserDTO update(String userId, UserDTO userDTO) {
        User userToSave = new User()
                .id(userId)
                .email(userDTO.email())
                .firstName(userDTO.firstName())
                .lastName(userDTO.lastName())
                .locationLat(userDTO.locationLat())
                .locationLong(userDTO.locationLong())
                .phoneNumber(userDTO.phoneNumber());

        return userRepository
                .findById(userId)
                .map(existingUser -> userRepository.save(userToSave))
                .map(UserDTO::new)
                .orElseThrow(userNotFound(userId));
    }

    public void delete(String userId) {
        userRepository.findById(userId)
                .ifPresentOrElse(userRepository::delete,
                        () -> {
                            throw new UserNotFoundException("User not found: " + userId);
                        });
    }

    private Supplier<UserNotFoundException> userNotFound(String userId) {
        return () -> new UserNotFoundException("User not found: " + userId);
    }

    public UserDTO getUserByPhoneNumber(String phoneNumber) {
        return userRepository
                .findByPhoneNumber(phoneNumber)
                .map(UserDTO::new)
                .orElseThrow(userNotFound(phoneNumber));
    }
}
