import { Component, OnDestroy, OnInit } from '@angular/core';
import { Task } from '../../models/task.model';
import { Router, RouterModule } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { CommonModule, DatePipe } from '@angular/common';
import { TaskFormComponent } from '../task-form/task-form.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions, EventClickArg, EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-task-list',
  imports: [CommonModule, RouterModule, FullCalendarModule, TaskFormComponent],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css',
})
export class TaskListComponent implements OnInit, OnDestroy {
  tasks: Task[] = [];
  calendarEvents: EventInput[] = [];
  taskSubscription!: Subscription;
  
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, interactionPlugin],
    events: [],
    displayEventTime: false,
    height: 500,
    eventClick: (info: EventClickArg) => this.onEventClick(info),
  };

  constructor(private taskService: TaskService, private router: Router) {}

  ngOnInit(): void {
    this.getAllTask();
  }

  getAllTask() {
    this.taskSubscription = this.taskService.getAll().subscribe((list) => {
      this.tasks = list;
      this.calendarEvents = this.tasks.map((t) => ({
        title: t.title,
        start: t.deadline,
        id: t.id,
        color: this.getStatusColor(t.status),
      }));

      this.calendarOptions = {
        ...this.calendarOptions,
        events: this.calendarEvents,
      };
    });
  }

  onCreated(task: Task) {
    this.taskService.addTask(task);

  }

  edit(t: Task) {
    const id = t.id;
    this.router.navigate(['/task', id]);
  }

  deleteTask(id: string) {
    if (confirm('Delete this task?')) {
      this.taskService.deleteTask(id);
      this.tasks = this.tasks.filter((t) => t.id !== id);
      this.calendarEvents = this.calendarEvents.filter((e) => e.id !== id);
      this.calendarOptions = {
        ...this.calendarOptions,
        events: this.calendarEvents,
      };
    }
  }

  onEventClick(info: EventClickArg) {
    const id = info.event.id;
  
    this.router.navigate(['/task', id]);
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'Pending':
        return '#f87171'; 
      case 'In Progress':
        return '#60a5fa'; 
      case 'Completed':
        return '#34d399'; 
      default:
        return '#d1d5db'; 
    }
  }

  ngOnDestroy(): void {
    this.taskSubscription.unsubscribe();
  }
}
