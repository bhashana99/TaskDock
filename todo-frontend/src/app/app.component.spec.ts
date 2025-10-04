import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskItemComponent } from './components/task-item/task-item.component';
import { TaskService } from './services/task.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

describe('AppComponent', () => {
  let taskServiceMock: any;

  beforeEach(async () => {
    taskServiceMock = {
      getTasks: jasmine.createSpy('getTasks').and.returnValue(of([])),
      completeTask: jasmine.createSpy('completeTask').and.returnValue(of(void 0)),
      tasksUpdated: { subscribe: jasmine.createSpy('subscribe') },
      notifyTaskChange: jasmine.createSpy('notifyTaskChange')
    };

    await TestBed.configureTestingModule({
      imports: [AppComponent, TaskListComponent, TaskItemComponent, HttpClientTestingModule],
      providers: [{ provide: TaskService, useValue: taskServiceMock }]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
 
});
