import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from '../models/task';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private taskCreatingUrl = 'http://localhost:8080/tasks/createTask';
  private taskUrl = 'http://localhost:8080/tasks';

  public tasksUpdated = new Subject<void>();


  constructor(private http: HttpClient) { }

  createTask(task: Task): Observable<Task>{
    return this.http.post<Task>(this.taskCreatingUrl, task);
  }

   getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.taskUrl);
  }

  notifyTaskChange() {
    this.tasksUpdated.next();
  }
  
}
