package com.example.todo_app.controller;

import com.example.todo_app.dto.TaskRequest;
import com.example.todo_app.dto.TaskResponse;
import com.example.todo_app.entity.Task;
import com.example.todo_app.service.TaskService;
import org.apache.coyote.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/tasks")
public class TaskController {

    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @PostMapping("/createTask")
    public ResponseEntity<TaskResponse> createTask(@RequestBody TaskRequest taskRequest){
        TaskResponse taskResponse = taskService.createTask(taskRequest);

        return ResponseEntity.ok(taskResponse);
    }

    @GetMapping
    public List<Task> getTopFiveTask(){
       List<Task> recentTasks =  taskService.getTopFiveTask();
        return recentTasks;
    }

    @PutMapping("/{id}/complete")
    public ResponseEntity<Void> completeTask(@PathVariable Long id) {
         taskService.markTaskCompleted(id);

        return ResponseEntity.noContent().build();

    }
}
