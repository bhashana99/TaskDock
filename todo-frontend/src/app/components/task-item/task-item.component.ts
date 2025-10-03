import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../../models/task';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.scss'
})
export class TaskItemComponent {

   @Input() task!: Task;
   @Output() taskCompleted = new EventEmitter<number>();

   markAsDone() {
    if (this.task.id) {
      this.taskCompleted.emit(this.task.id);
    }
  }

}
