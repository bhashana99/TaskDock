import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from '../models/task';
import { Observable, Subject, tap } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private taskUrl = environment.apiUrl;

  public tasksUpdated = new Subject<void>();


  constructor(private http: HttpClient) { }

  createTask(task: Task): Observable<Task>{
    return this.http.post<Task>(`${this.taskUrl}/createTask`, task);
  }

   getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.taskUrl);
  }

  completeTask(taskId: number): Observable<void> {
  return this.http.put<void>(`${this.taskUrl}/${taskId}/complete`, {})
          .pipe(
            tap(() => this.notifyTaskChange())
          )
}


  notifyTaskChange() {
    this.tasksUpdated.next();
  }

}
