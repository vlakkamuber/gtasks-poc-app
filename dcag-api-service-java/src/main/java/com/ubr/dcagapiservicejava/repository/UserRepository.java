package com.ubr.dcagapiservicejava.repository;

//public interface UserRepository extends FirestoreReactiveRepository<User> {
//}

//public interface CustomerRepository extends JpaRepository<User, Long> {
//    List<User> findByName(String name);
//}

import com.ubr.dcagapiservicejava.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, String> {
    Optional<User> findByPhoneNumber(String phoneNumber);

}
