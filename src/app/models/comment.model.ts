export interface Comment {
  id: string;
  author: string;
  text: string;
  createdAt?: string;
  replies?: Comment[];
}

export interface CommentPayload extends Comment {
  parentId?: string;
}
