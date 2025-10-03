package com.example.todo_app.service;

import com.example.todo_app.entity.Task;
import com.example.todo_app.exception.TaskNotFoundException;
import com.example.todo_app.repository.TaskRepository;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
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
