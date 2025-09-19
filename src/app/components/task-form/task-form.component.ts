import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Task, TaskStatus } from '../../models/task.model';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-task-form',
  imports: [FormsModule, CommonModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css',
})
export class TaskFormComponent {
  @Output() created: EventEmitter<Task> = new EventEmitter<Task>();
  open = false;
  title = '';
  deadline = '';
  status: TaskStatus = 'Pending';

  toggle() {
    this.open = !this.open;
  }

  create(form: NgForm) {
    if (form.invalid) {
      form.control.markAllAsTouched();
      return;
    }
    const task: Task = {
      id: `${Date.now()}`,
      title: this.title,
      description: this.title,
      content: `<p>${this.title}</p>`,
      deadline: this.deadline,
      status: this.status,
      comments: [],
    };
    this.created.emit(task);
    this.title = '';
    this.deadline = '';
    this.open = false;
  }

  
}
