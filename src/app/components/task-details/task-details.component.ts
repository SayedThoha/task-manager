import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Task } from '../../models/task.model';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { QuillModule } from 'ngx-quill';
import { CommentsComponent } from '../comments/comments.component';
import { Comment, CommentPayload } from '../../models/comment.model';
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
export class TaskDetailsComponent implements OnInit {
  task?: Task;
  editableContent = '';
  contentForm!: FormGroup;
  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.getTask();
  }

  getTask() {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.taskService.getById(id).subscribe((t) => {
      this.task = t as Task;
      // this.editableContent = this.task?.content || '';
      this.contentForm = this.fb.group({
        content: [
          this.task?.content || '',
          [
            Validators.required,
            Validators.minLength(10),
            this.nonEmptyValidator,
          ],
        ],
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
    const copy = { ...this.task, content: this.contentForm.value.content };
    this.taskService.updateTask(copy);
    alert('Saved');
  }

  // cancelEdit() {
  //   if (!this.task) return;

  //   // Reset form back to original task content
  //   this.contentForm.reset({
  //     content: this.task.content,
  //   });

  //   // If you’re showing/hiding editor, close it here
  //   // this.open = false;
  // }
  onNewComment(payload: Comment) {
    if (!this.task) return;
    const comment = {
      id: crypto.randomUUID(),
      author: payload.author || 'Guest',
      text: payload.text,
      createdAt: new Date().toISOString(),
      replies: [],
    };
    this.taskService.addComment(this.task.id, comment);
  }

  onReply(payload: CommentPayload) {
    if (!this.task) return;
    const comment = {
      id: crypto.randomUUID(),
      author: payload.author || 'Guest',
      text: payload.text,
      createdAt: new Date().toISOString(),
      replies: [],
    };
    this.taskService.addComment(this.task.id, comment, payload.parentId);
  }
}
