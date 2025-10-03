package com.example.todo_app.service;

import com.example.todo_app.dto.TaskRequest;
import com.example.todo_app.dto.TaskResponse;
import com.example.todo_app.entity.Task;
import com.example.todo_app.exception.TaskNotFoundException;
import com.example.todo_app.repository.TaskRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {

    private final TaskRepository repository;

    public TaskService(TaskRepository repository) {
        this.repository = repository;
    }

    public TaskResponse createTask(TaskRequest request){
        Task task = new Task();
        task.setTitle(request.getTitle());
        task.setDescription(request.getDescription());

        Task saved = repository.save(task);

        return new TaskResponse(saved.getId(), saved.getTitle(), saved.getDescription(),
                saved.getCreatedAt(), saved.isCompleted());
    }

    public List<Task> getTopFiveTask(){
        return repository.findTop5ByIsCompletedFalseOrderByCreatedAtDesc();
    }

    public void markTaskCompleted(Long taskId){
        
         Task task =  repository.findById(taskId)
                .orElseThrow(
                        ()-> new TaskNotFoundException(taskId)
                );

         task.setCompleted(true);
         repository.save(task);
    }
}
