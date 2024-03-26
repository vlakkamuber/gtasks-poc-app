package com.ubr.dcagapiservicejava.repository;

import com.ubr.dcagapiservicejava.domain.Task;
import com.ubr.dcagapiservicejava.domain.enums.TaskType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {


    //TODO: Update this query; Possible SQL:
    // SELECT t.taskId, t.taskName
    //FROM tasks t
    //LEFT JOIN user_tasks ut ON t.taskId = ut.taskId AND ut.userId = 'abc'
    //WHERE ut.userId IS NULL AND t.isAvailable = 'true';


    @Query("SELECT T FROM Task T WHERE T.isAvailable =:available and T.isTrial =:isTrial and T.taskType =:type and" +
            " (:cities is null or T.city in :cities) and" +
            " (:languages is null or T.language in :languages) and" +
            " T.id not in (select UT.task.id from UserTask UT where UT.task.id = T.id and UT.user.id =:userId and UT.status != 'EXPIRED') " +
            " order by RAND() limit :limit")
    List<Task> findAvailableTasks(boolean available, boolean isTrial, String userId, TaskType type, int limit, List<String> cities, List<String> languages);


    @Query("SELECT T FROM Task T WHERE T.isAvailable =:available and T.isTrial =:isTrial and T.taskType =:type and" +
            " (:cities is null or T.city in :cities) and" +
            " (:languages is null or T.language in :languages) and" +
            " T.id not in (select UT.task.id from UserTask UT where UT.task.id = T.id and UT.user.id =:userId and UT.status = 'COMPLETED') ")
    List<Task> findAvailableTrialTasks(boolean available, boolean isTrial, String userId, TaskType type, List<String> cities, List<String> languages);


//    @Query("SELECT T FROM Task T, User U WHERE ST_Distance_Sphere(T.location, :location) <= :distance")
//    List<Task> findAAllNearerTasks(Point location, Integer distance);
}
