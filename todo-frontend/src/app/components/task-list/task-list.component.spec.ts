import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskListComponent } from './task-list.component';
import { TaskService } from '../../services/task.service';
import { of } from 'rxjs';
import { TaskItemComponent } from '../task-item/task-item.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;
  let taskServiceMock: any;

  beforeEach(async () => {
    taskServiceMock = {
      getTasks: jasmine.createSpy('getTasks').and.returnValue(of([])), // observable
      completeTask: jasmine.createSpy('completeTask').and.returnValue(of(void 0)),
      tasksUpdated: { subscribe: jasmine.createSpy('subscribe') },
      notifyTaskChange: jasmine.createSpy('notifyTaskChange')
    };

    await TestBed.configureTestingModule({
      imports: [TaskListComponent, TaskItemComponent, HttpClientTestingModule],
      providers: [{ provide: TaskService, useValue: taskServiceMock }]
    }).compileComponents();

    fixture = TestBed.createComponent(TaskListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // triggers ngOnInit()
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
