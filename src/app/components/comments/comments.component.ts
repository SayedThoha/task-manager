import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Comment, CommentPayload } from '../../models/comment.model';
import { AsyncPipe, CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommentsStore } from '../../store/comments.store';

@Component({
  selector: 'app-comments',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.css',
})
export class CommentsComponent implements OnInit {
  @Input() comments?: Comment[];


  commentForm!: FormGroup;
  replyForms: { [key: string]: FormGroup } = {};
  replyTo!: string | null;

  constructor(private fb: FormBuilder, private commentStore: CommentsStore) {}
  ngOnInit(): void {
    this.initialiseForms();
  }

    get showComment() {
    return this.commentStore.comments;
  }

  initialiseForms() {
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
    
    const { name, text } = this.commentForm.value;
    const comment = {
      id: crypto.randomUUID(),
      author: name || 'Guest',
      text: text,
      createdAt: new Date().toISOString(),
    };

    
    this.commentStore.addComment(comment);
    this.commentForm.reset();
    
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
  
    this.commentStore.addReply(parentId, reply);
    form.reset();
    this.replyTo = null;
  }
}
