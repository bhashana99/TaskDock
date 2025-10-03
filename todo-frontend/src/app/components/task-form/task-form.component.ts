import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { Task } from './../../models/task';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss'
})
export class TaskFormComponent {

  taskForm: FormGroup;
  message = '';

  constructor(private fb: FormBuilder,private taskService: TaskService){
     this.taskForm = this.fb.group({
      title: ['', Validators.required],
     description: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.taskForm.invalid) {
      this.message = 'Please fill the required fields';
      return;
    }

    const newTask: Task = this.taskForm.value;
    this.taskService.createTask(newTask).subscribe({
      next: () => {
        this.message = 'Task created successfully';
        this.taskForm.reset();
      },
      error: () => {
        this.message = 'Failed to create task';
      }
    });
  }

}
