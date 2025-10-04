import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskItemComponent } from './task-item.component';
import { Task } from '../../models/task';

describe('TaskItemComponent', () => {
  let component: TaskItemComponent;
  let fixture: ComponentFixture<TaskItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskItemComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TaskItemComponent);
    component = fixture.componentInstance;
    component.task = { id: 1, title: 'Test Task', description: 'Test description' };
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should emit taskCompleted event when markAsDone() is called', () => {
    spyOn(component.taskCompleted, 'emit');
    component.markAsDone();
    expect(component.taskCompleted.emit).toHaveBeenCalledWith(1);
  });
});
