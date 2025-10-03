package com.example.todo_app.repository;

import com.example.todo_app.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TaskRepository extends JpaRepository<Task,Long> {

    List<Task> findTop5ByIsCompletedFalseOrderByCreatedAtDesc();

}
