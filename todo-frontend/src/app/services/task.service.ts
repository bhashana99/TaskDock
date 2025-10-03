import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from '../models/task';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private taskCreatingUrl = 'http://localhost:8080/tasks/createTask';


  constructor(private http: HttpClient) { }

  createTask(task: Task): Observable<Task>{
    return this.http.post<Task>(this.taskCreatingUrl, task);
  }
}
