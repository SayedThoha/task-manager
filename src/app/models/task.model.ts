import { Comment } from './comment.model';

export type TaskStatus = 'Pending' | 'In Progress' | 'Completed';



export interface Task {
  id: string;
  title: string;
  description: string; 
  content?: string;
  deadline: string; 
  status: TaskStatus;
  comments?: Comment[];
}
