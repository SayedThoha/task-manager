import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Comment, CommentPayload } from '../../models/comment.model';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-comments',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.css',
})
export class CommentsComponent implements OnInit {
  @Input() comments?: Comment[];
  @Output() newComment: EventEmitter<Comment> = new EventEmitter<Comment>();
  @Output() replyComment: EventEmitter<CommentPayload> =
    new EventEmitter<CommentPayload>();

  name = '';
  text = '';

  replyName = '';
  replyText = '';

  commentForm!: FormGroup;
  replyForms: { [key: string]: FormGroup } = {};
  replyTo!: string | null;

  constructor(private fb: FormBuilder) {}
  ngOnInit(): void {
    this.commentForm = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
        ],
      ],
      text: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(50),
        ],
      ],
    });
  }

  addComment() {
    if (this.commentForm.invalid) {
      this.commentForm.markAllAsTouched();
      return;
    }
    // if (!this.text) return alert('write comment');
    const { name, text } = this.commentForm.value;
    const comment = {
      id: crypto.randomUUID(),
      author: name || 'Guest',
      text: text,
      createdAt: new Date().toISOString(),
    };

    this.newComment.emit(comment);
    this.commentForm.reset();
    // this.commentForm.reset({ name: 'Guest', text: '' });
  }

  toggleReply(id: string) {
    this.replyTo = this.replyTo === id ? null : id;
    if (!this.replyForms[id]) {
      this.replyForms[id] = this.fb.group({
        name: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(20),
          ],
        ],
        text: [
          '',
          [
            Validators.required,
            Validators.minLength(5),
            Validators.maxLength(50),
          ],
        ],
      });
    }
  }

  addReply(parentId: string) {
    const form = this.replyForms[parentId];
    if (!form || form.invalid) {
      form?.markAllAsTouched();
      return;
    }

    const { name, text } = form.value;
    const reply = {
      id: crypto.randomUUID(),
      parentId,
      author: name || 'Guest',
      text,
      createdAt: new Date().toISOString(),
      replies: [],
    };
    const payload: CommentPayload = { ...reply, parentId };
    this.replyComment.emit(payload);
    form.reset();
    this.replyTo = null;
  }
}
