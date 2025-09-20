import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Task } from '../../models/task.model';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { QuillModule } from 'ngx-quill';
import { CommentsComponent } from '../comments/comments.component';
import { Comment, CommentPayload } from '../../models/comment.model';
import { CommentsStore } from '../../store/comments.store';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-task-details',
  imports: [
    FormsModule,
    CommonModule,
    QuillModule,
    RouterModule,
    CommentsComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './task-details.component.html',
  styleUrl: './task-details.component.css',
})
export class TaskDetailsComponent implements OnInit, OnDestroy {
  task?: Task;
  editableContent = '';
  contentForm!: FormGroup;
  taskSubscription!: Subscription;
  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    private fb: FormBuilder,
    private commentStore: CommentsStore,
    private router: Router
  ) {}

  ngOnInit() {
    this.initialiseForms();
  }

  initialiseForms() {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.taskSubscription = this.taskService.getById(id).subscribe((t) => {
      this.task = t as Task;

      this.commentStore.setComments(this.task.comments || []);
      this.contentForm = this.fb.group({
        content: [
          this.task?.content || '',
          [
            Validators.required,
            Validators.minLength(10),
            this.nonEmptyValidator,
          ],
        ],
        status: [this.task?.status || 'Pending', Validators.required],
      });
    });
  }

  nonEmptyValidator(control: any) {
    const value = (control.value || '').replace(/<(.|\n)*?>/g, '').trim();
    return value ? null : { emptyContent: true };
  }

  saveContent() {
    if (this.contentForm.invalid) {
      this.contentForm.markAllAsTouched();
      return;
    }
    if (!this.task) return;
    const copy = {
      ...this.task,
      content: this.contentForm.value.content,
      status: this.contentForm.value.status,
    };
    this.taskService.updateTask(copy);
    alert('Saved');
  }

  onNewComment(payload: Comment) {
    if (!this.task) return;
    const comment = {
      id: crypto.randomUUID(),
      author: payload.author || 'Guest',
      text: payload.text,
      createdAt: new Date().toISOString(),
      replies: [],
    };

    this.commentStore.addComment(comment);
  }

  onReply(payload: CommentPayload) {
    if (!this.task || !payload.parentId) return;
    const comment = {
      id: crypto.randomUUID(),
      parentId: payload.parentId,
      author: payload.author || 'Guest',
      text: payload.text,
      createdAt: new Date().toISOString(),
      replies: [],
    };
    
    this.commentStore.addReply(payload.parentId, comment);
  }

  goBack() {
    this.router.navigate(['/']);
  }
  ngOnDestroy(): void {
    this.taskSubscription.unsubscribe();
  }
}
