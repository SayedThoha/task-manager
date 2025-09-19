import { Comment } from './comment.model';

export type TaskStatus = 'Pending' | 'In Progress' | 'Completed';

// export interface CommentModel {
//   id: string;
//   author: string;
//   text: string;
//   createdAt: string; // ISO
//   replies?: CommentModel[];
// }

export interface Task {
  id: string;
  title: string;
  description: string; // short preview
  content?: string; // rich text html
  deadline: string; // ISO date
  status: TaskStatus;
  comments?: Comment[];
}
