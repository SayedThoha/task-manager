import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { Task } from '../models/task.model';
import { HttpClient } from '@angular/common/http';
import { Comment } from '../models/comment.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasks$ = new BehaviorSubject<Task[]>([]);

  constructor(private http: HttpClient) {}

  loadTasks(): Observable<Task[]> {
    // load from assets
    return this.http
      .get<Task[]>('tasks.json')
      .pipe(tap((tasks) => this.tasks$.next(tasks)));
  }

  getAll(): Observable<Task[]> {
    return this.tasks$.asObservable();
  }

  getById(id: string): Observable<Task | undefined> {
    return this.tasks$.pipe(map((tasks) => tasks.find((t) => t.id === id)));
  }

  addTask(task: Task) {
    const curr = this.tasks$.value.slice();
    curr.push(task);
    this.tasks$.next(curr);
  }

  updateTask(updated: Task) {
    const curr = this.tasks$.value.map((t) =>
      t.id === updated.id ? updated : t
    );
    this.tasks$.next(curr);
  }

  deleteTask(id: string) {
    const curr = this.tasks$.value.filter((t) => t.id !== id);
    this.tasks$.next(curr);
  }


  
  
}
