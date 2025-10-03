package com.example.todo_app.service;

import com.example.todo_app.dto.TaskRequest;
import com.example.todo_app.dto.TaskResponse;
import com.example.todo_app.entity.Task;
import com.example.todo_app.exception.TaskNotFoundException;
import com.example.todo_app.repository.TaskRepository;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class TaskServiceTest {
    @Mock
    private TaskRepository taskRepository;

    @InjectMocks
    private TaskService taskService;

    public TaskServiceTest() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testCreateTask_Success() {

        // given: TaskRequest from frontend
        TaskRequest taskRequest = new TaskRequest();
        taskRequest.setTitle("New Task");
        taskRequest.setDescription("Description");

        // expected Task entity after saving
        Task savedTask = new Task();
        savedTask.setId(1L);
        savedTask.setTitle("New Task");
        savedTask.setDescription("Description");
        savedTask.setCompleted(false);

        // mock repository to return saved task when saving any Task entity
        when(taskRepository.save(any(Task.class))).thenReturn(savedTask);

        // when: call service method with TaskRequest
        TaskResponse result = taskService.createTask(taskRequest);

        // then: assert results
        assertNotNull(result.getId());
        assertEquals("New Task", result.getTitle());
        assertEquals("Description", result.getDescription());
        assertFalse(result.isCompleted());

        // verify that repository.save() was called once
        verify(taskRepository, times(1)).save(any(Task.class));
    }


    @Test
    void testGetTop5Tasks_Success() {
        // given
        Task task1 = new Task();
        task1.setTitle("Task 1");
        Task task2 = new Task();
        task2.setTitle("Task 2");

        List<Task> tasks = List.of(task1, task2);

        when(taskRepository.findTop5ByIsCompletedFalseOrderByCreatedAtDesc())
                .thenReturn(tasks);

        // when
        List<Task> result = taskService.getTopFiveTask();

        // then
        assertEquals(2, result.size());
        assertEquals("Task 1", result.get(0).getTitle());
        verify(taskRepository, times(1)).findTop5ByIsCompletedFalseOrderByCreatedAtDesc();
    }


    @Test
    void testMarkTaskCompleted_Success() {

        Task task = new Task();
        task.setId(1L);
        task.setTitle("Test Task");
        task.setCompleted(false);

        when(taskRepository.findById(1L)).thenReturn(Optional.of(task));
        when(taskRepository.save(task)).thenReturn(task);


        taskService.markTaskCompleted(1L);


        assertTrue(task.isCompleted());
        verify(taskRepository, times(1)).save(task);
    }

    @Test
    void testMarkTaskCompleted_TaskNotFound() {

        when(taskRepository.findById(99L)).thenReturn(Optional.empty());


        assertThrows(TaskNotFoundException.class, () -> taskService.markTaskCompleted(99L));
    }
}
