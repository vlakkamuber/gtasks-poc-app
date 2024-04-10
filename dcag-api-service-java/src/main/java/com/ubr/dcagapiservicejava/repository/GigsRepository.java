package com.ubr.dcagapiservicejava.repository;

import com.ubr.dcagapiservicejava.domain.Gigs;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GigsRepository extends JpaRepository<Gigs, Long> {
}
