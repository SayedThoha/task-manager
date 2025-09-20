import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Task, TaskStatus } from '../../models/task.model';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-task-form',
  imports: [FormsModule, CommonModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css',
})
export class TaskFormComponent implements OnInit {
  @Output() created: EventEmitter<Task> = new EventEmitter<Task>();

  open = false;
  title = '';
  deadline = '';
  description = '';
  minDate = '';
  status: TaskStatus = 'Pending';

  ngOnInit(): void {
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];
  }

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
      description: this.description,
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
