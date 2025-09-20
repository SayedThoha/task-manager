Task Manager Angular App

A simple Task Manager built with Angular 19, featuring:

Task creation, editing, deletion

Task status tracking (Pending, In Progress, Completed)

Rich-text content editing via Quill Editor

Comments with nested replies using MobX store

Deadline calendar using FullCalendar

Responsive design with a clean UI

Features

Task Management

Add new tasks with title, description, content, deadline, and status

Edit task content and update status

Delete tasks

Navigate to task details page for editing

Comments

Add new comments

Reply to existing comments

Comments and replies managed using MobX store for reactive updates

Calendar

Displays tasks on their deadlines using FullCalendar

Colored events based on task status

Click on a calendar event to navigate to the task details page

Tech Stack

Angular 19 (Standalone Components)

MobX for state management (comments)

RxJS for task list and subjects

FullCalendar for task deadlines

Quill Editor for rich-text content

TypeScript, HTML, CSS

Project Structure
src/
├─ app/
│  ├─ components/
│  │  ├─ task-list/           # Task list & calendar view
│  │  ├─ task-details/        # Task details & content editor
│  │  ├─ task-form/           # Task creation form
│  │  ├─ comments/            # Comment/reply UI
│  ├─ models/
│  │  ├─ task.model.ts
│  │  ├─ comment.model.ts
│  ├─ services/
│  │  ├─ task.service.ts
│  ├─ store/
│  │  ├─ comments.store.ts
│  ├─ app.routes.ts
│  └─ app.component.ts
public/
├─ tasks.json                  # Initial tasks and other assets


Installation

Clone the repository:

git clone https://github.com/SayedThoha/task-manager.git
cd task-manager


Install dependencies:

npm install


⚠️ If you encounter peer dependency errors with ngx-quill or Angular versions, run:

npm install --legacy-peer-deps


Run the development server:

ng serve


Open your browser at:

http://localhost:4200

Usage
Task List

View all tasks in the list

Edit, delete, or navigate to details

Add new tasks via the Task Form

Task Details

Edit content using the Quill editor

Change status via a dropdown

Add comments and reply to comments

Comments are reactive and update automatically

Calendar

Shows tasks with colored events based on status:

Pending – Red

In Progress – Blue

Completed – Green

Click event to navigate to task details

MobX Store for Comments

Store Location: src/app/store/comments.store.ts

Reactive observable array of comments

Methods:

setComments(comments: Comment[])

addComment(comment: Comment)

addReply(parentId: string, comment: Comment)

Changes to comments are automatically reflected in the UI without EventEmitters.

Forms and Validation

Task form and comment forms use Angular Reactive Forms

Validation rules:

Required fields

Minimum/maximum length

Prevent blank spaces for content

Notes

Angular 19 standalone components are used

Comments now use MobX for state management, so no need for parent-child EventEmitters

Calendar updates require syncing calendarEvents array with FullCalendar