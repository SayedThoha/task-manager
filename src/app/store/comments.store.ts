import { Injectable } from '@angular/core';
import { makeAutoObservable } from 'mobx';
import { Comment, CommentPayload } from '../models/comment.model';

@Injectable({ providedIn: 'root' })
export class CommentsStore {
  comments: Comment[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  addComment(comment: Comment) {
    this.comments.push(comment);
  }

  addReply(parentId: string, reply: CommentPayload) {
    const addReplyRecursively = (list: Comment[]) => {
      for (const c of list) {
        if (c.id === parentId) {
          c.replies = c.replies || [];
          c.replies.push(reply);
          return true;
        }
        if (c.replies && addReplyRecursively(c.replies)) return true;
      }
      return false;
    };

    addReplyRecursively(this.comments);
  }

  setComments(comments: Comment[]) {
    this.comments = comments;
  }
}
