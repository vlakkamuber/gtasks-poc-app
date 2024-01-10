package com.ubr.dcagapiservicejava.repository;

import com.ubr.dcagapiservicejava.domain.Task;
import org.locationtech.jts.geom.Point;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task,Long> {


    @Query("SELECT T FROM Task T WHERE T.isAvailable =:available")
    List<Task> findAvailableTasks(boolean available);


//    @Query("SELECT T FROM Task T, User U WHERE ST_Distance_Sphere(T.location, :location) <= :distance")
//    List<Task> findAAllNearerTasks(Point location, Integer distance);
}
