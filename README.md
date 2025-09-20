# Task Manager Angular App

A simple **Task Manager** built with **Angular 19**, featuring:

- Task creation, editing, deletion
- Task status tracking (Pending, In Progress, Completed)
- Rich-text content editing via **Quill Editor**
- Comments with nested replies using **MobX store**
- Deadline calendar using **FullCalendar**


---

## Features

### Task Management

- Add new tasks with title, description, content, deadline, and status
- Edit task content and update status
- Delete tasks
- Navigate to task details page for editing
- Edit content using Quill Editor


### Comments

- Add new comments
- Reply to existing comments
- Comments and replies managed using **MobX store** for reactive updates

### Calendar

- Displays tasks on their deadlines using **FullCalendar**
- Colored events based on task status
- Click on a calendar event to navigate to the task details page

---

## Tech Stack

- Angular 19 (Standalone Components)
- **MobX** for state management (comments)
- **RxJS** for task list and subjects
- **FullCalendar** for task deadlines
- **Quill Editor** for rich-text content
- TypeScript, HTML, CSS

---

## Project Structure

public/
├─ tasks.json
src/
├─ app/
│ ├─ components/
│ │ ├─ task-list/
│ │ ├─ task-details/
│ │ ├─ task-form/
│ │ ├─ comments/
│ ├─ models/
│ │ ├─ task.model.ts
│ │ ├─ comment.model.ts
│ ├─ services/
│ │ ├─ task.service.ts
│ ├─ store/
│ │ ├─ comments.store.ts
│ ├─ app.routes.ts
│ └─ app.component.ts

## Installation Instructions

To set up the project locally, follow these steps:

1. Clone the repository:
   git clone https://github.com/SayedThoha/task-manager.git
2. Navigate to the project directory:
   cd task-manager
3. Install dependencies: npm install
4. Run the application: ng serve
5. Open your browser:http://localhost:4200



## Code Quality and Documentation
- Code is organized, clean, and well-documented.
- A version control system (Git) is used for managing code changes.
- This README file includes setup and usage instructions.


## Contact Information
For any questions or feedback, feel free to reach out:
- GitHub: [SayedThoha](https://github.com/SayedThoha)
- Email: sayedthoha@gmail.com
