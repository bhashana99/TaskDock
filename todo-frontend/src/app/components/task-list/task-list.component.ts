import { Component, OnInit } from '@angular/core';
import { TaskItemComponent } from '../task-item/task-item.component';
import { Task } from '../../models/task';
import { TaskService } from '../../services/task.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [TaskItemComponent,CommonModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent implements OnInit{

  tasks: Task[] = [];
  message = '';

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();

    this.taskService.tasksUpdated.subscribe(() => {
    this.loadTasks();
  });
  }

  loadTasks() {
    this.taskService.getTasks().subscribe({
      next: (data) => this.tasks = data,
      
      error: () => this.message = 'Failed to load tasks'
      
    });
  }

}
