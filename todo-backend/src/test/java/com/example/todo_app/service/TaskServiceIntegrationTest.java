package com.example.todo_app.service;

import com.example.todo_app.dto.TaskRequest;
import com.example.todo_app.dto.TaskResponse;
import com.example.todo_app.entity.Task;
import com.example.todo_app.repository.TaskRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@SpringBootTest
@Transactional
public class TaskServiceIntegrationTest {

    @Autowired
    private TaskService taskService;

    @Autowired
    private TaskRepository taskRepository;

    @Test
    void testCreateTask_AndRetrieve() {
        // given
        TaskRequest request = new TaskRequest();
        request.setTitle("Integration Task");
        request.setDescription("Integration Description");

        // when
        TaskResponse savedTask = taskService.createTask(request);

        // then
        assertNotNull(savedTask.getId());
        assertEquals("Integration Task", savedTask.getTitle());

        // verify repository actually saved it
        Task found = taskRepository.findById(savedTask.getId()).orElse(null);
        assertNotNull(found);
        assertEquals("Integration Task", found.getTitle());
    }

    @Test
    void testGetTop5Tasks() {
        // create 6 tasks
        for (int i = 1; i <= 6; i++) {
            TaskRequest request = new TaskRequest();
            request.setTitle("Task " + i);
            request.setDescription("Desc " + i);
            taskService.createTask(request);
        }

        List<Task> top5 = taskService.getTopFiveTask();
        assertEquals(5, top5.size());
        assertEquals("Task 6", top5.get(0).getTitle()); // newest first
    }

}
