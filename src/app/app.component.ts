import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

import { TaskService } from './services/task.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'Task-Manager';
  constructor(private taskService: TaskService) {}
  ngOnInit(): void {
    this.taskService.loadTasks().subscribe();
  }
}
