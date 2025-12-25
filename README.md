# Task Management Dashboard

A modern, interactive Task Management Dashboard built with React.js, Redux Toolkit, and Tailwind CSS.

## Features

- ✅ **Task Management**
  - Add, edit, delete tasks
  - Mark tasks as Pending or Completed
  - Priority levels (High, Medium, Low)
  - Due dates with overdue detection

- ✅ **Advanced Filtering & Search**
  - Filter by status (All, Completed, Pending)
  - Filter by priority
  - Search tasks by title
  - Combined filtering support

- ✅ **Data Persistence**
  - Tasks stored in localStorage
  - Data persists across browser sessions

- ✅ **Modern UI/UX**
  - Light/Dark theme toggle
  - Responsive design for all devices
  - Smooth animations with Framer Motion
  - Icons from Lucide React
  - Professional dashboard layout with stats

- ✅ **Bulk Actions**
  - Clear all completed tasks at once
  - Bulk delete functionality (future enhancement)

## Setup Instructions

1. Clone the repository
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`
4. Open your browser to `http://localhost:5174`

## Technologies Used

- **Frontend Framework**: React.js with TypeScript
- **State Management**: Redux Toolkit
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Build Tool**: Vite
- **Storage**: localStorage for persistence

## Project Structure

```
src/
├── components/
│   ├── AddTaskForm.tsx      # Form to add new tasks
│   ├── Filter.tsx           # Status and priority filters
│   ├── Search.tsx           # Search input component
│   ├── TaskDashboard.tsx    # Main dashboard layout
│   ├── TaskItem.tsx         # Individual task display
│   ├── TaskList.tsx         # List of filtered tasks
│   └── ThemeToggle.tsx      # Theme switcher
├── features/
│   ├── tasksSlice.ts        # Redux slice for tasks
│   └── themeSlice.ts        # Redux slice for theme
├── App.tsx                  # Main app component
├── index.css                # Global styles
├── main.tsx                 # App entry point
└── store.ts                 # Redux store configuration
```

## Key Features Explained

### Task Management
- **Add Tasks**: Create new tasks with title, priority, and optional due date
- **Edit Tasks**: Click the edit icon to modify task details inline
- **Delete Tasks**: Remove tasks with confirmation dialog
- **Status Toggle**: Click the circle icon to mark tasks complete/incomplete

### Filtering & Search
- **Status Filter**: View all, completed, or pending tasks
- **Priority Filter**: Filter by High, Medium, Low priority
- **Search**: Find tasks by typing in the search box
- **Combined**: All filters work together for precise task finding

### Data Persistence
- Tasks are automatically saved to browser's localStorage
- Data survives page refreshes and browser restarts
- No backend required for basic functionality

### UI/UX Enhancements
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Dark/Light Theme**: Toggle between themes with the button in top-right
- **Animations**: Smooth transitions for better user experience
- **Visual Feedback**: Color-coded priorities, overdue indicators
- **Stats Dashboard**: Overview of task counts and status

## Future Enhancements

- [ ] Drag & drop task reordering
- [ ] Task categories/tags
- [ ] Due date notifications
- [ ] Export/import tasks
- [ ] User authentication
- [ ] Cloud sync with backend API
- [ ] Task templates
- [ ] Time tracking
- [ ] Collaboration features
