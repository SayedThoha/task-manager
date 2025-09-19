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

  addComment(taskId: string, comment: Comment, parentId?: string) {
    const tasks = this.tasks$.value.map((t) => {
      if (t.id !== taskId) return t;
      const clone = {
        ...t,
        comments: t.comments ? JSON.parse(JSON.stringify(t.comments)) : [],
      };
      if (!parentId) {
        clone.comments!.push(comment);
      } else {
        // find parent recursively
        const addReply = (list: Comment[] = []) => {
          for (const c of list) {
            if (c.id === parentId) {
              c.replies = c.replies || [];
              c.replies.push(comment);
              return true;
            }
            if (c.replies && addReply(c.replies)) return true;
          }
          return false;
        };
        addReply(clone.comments!);
      }
      return clone;
    });
    this.tasks$.next(tasks);
  }

  
}
