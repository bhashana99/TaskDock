import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskFormComponent } from './task-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { of, throwError } from 'rxjs';


describe('TaskFormComponent', () => {
  let component: TaskFormComponent;
  let fixture: ComponentFixture<TaskFormComponent>;
  let taskServiceMock: any;

  beforeEach(async () => {
    taskServiceMock = {
      createTask: jasmine.createSpy('createTask'),
      notifyTaskChange: jasmine.createSpy('notifyTaskChange')
    };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, TaskFormComponent],
      providers: [{ provide: TaskService, useValue: taskServiceMock }]
    }).compileComponents();

    fixture = TestBed.createComponent(TaskFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should show error message when form invalid', () => {
    component.onSubmit();
    expect(component.message).toBe('Please fill the required fields');
  });

  it('should call createTask and notifyTaskChange on valid form submission', () => {
    component.taskForm.setValue({ title: 'New Task', description: 'Description' });
    taskServiceMock.createTask.and.returnValue(of({}));

    component.onSubmit();

    expect(taskServiceMock.createTask).toHaveBeenCalledWith({
      title: 'New Task',
      description: 'Description'
    });
    expect(taskServiceMock.notifyTaskChange).toHaveBeenCalled();
    expect(component.message).toBe('Task created successfully');
  });

  it('should show error message on createTask failure', () => {
    component.taskForm.setValue({ title: 'Task', description: 'Desc' });
    taskServiceMock.createTask.and.returnValue(throwError(() => new Error('Error')));

    component.onSubmit();

    expect(component.message).toBe('Failed to create task');
  });
});
