import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface Task {
  id: string
  title: string
  status: 'Pending' | 'Completed'
  priority: 'Low' | 'Medium' | 'High'
  dueDate?: string
  createdAt: string
}

interface TasksState {
  tasks: Task[]
  filter: 'All' | 'Completed' | 'Pending'
  search: string
  priorityFilter: 'All' | 'Low' | 'Medium' | 'High'
}

const loadTasksFromStorage = (): Task[] => {
  try {
    const stored = localStorage.getItem('tasks')
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

const saveTasksToStorage = (tasks: Task[]) => {
  try {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  } catch (error) {
    console.error('Failed to save tasks to localStorage:', error)
  }
}

const initialState: TasksState = {
  tasks: loadTasksFromStorage().length > 0 ? loadTasksFromStorage() : [
    { id: '1', title: 'Learn React', status: 'Pending', priority: 'High', createdAt: new Date().toISOString() },
    { id: '2', title: 'Build Dashboard', status: 'Completed', priority: 'Medium', createdAt: new Date().toISOString() },
  ],
  filter: 'All',
  search: '',
  priorityFilter: 'All',
}

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<{ title: string; priority: 'Low' | 'Medium' | 'High'; dueDate?: string }>) => {
      const newTask: Task = {
        id: Date.now().toString(),
        title: action.payload.title,
        status: 'Pending',
        priority: action.payload.priority,
        dueDate: action.payload.dueDate,
        createdAt: new Date().toISOString(),
      }
      state.tasks.push(newTask)
      saveTasksToStorage(state.tasks)
    },
    editTask: (state, action: PayloadAction<{ id: string; title: string; priority: 'Low' | 'Medium' | 'High'; dueDate?: string }>) => {
      const task = state.tasks.find(t => t.id === action.payload.id)
      if (task) {
        task.title = action.payload.title
        task.priority = action.payload.priority
        task.dueDate = action.payload.dueDate
        saveTasksToStorage(state.tasks)
      }
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter(t => t.id !== action.payload)
      saveTasksToStorage(state.tasks)
    },
    toggleStatus: (state, action: PayloadAction<string>) => {
      const task = state.tasks.find(t => t.id === action.payload)
      if (task) {
        task.status = task.status === 'Pending' ? 'Completed' : 'Pending'
        saveTasksToStorage(state.tasks)
      }
    },
    setFilter: (state, action: PayloadAction<'All' | 'Completed' | 'Pending'>) => {
      state.filter = action.payload
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload
    },
    setPriorityFilter: (state, action: PayloadAction<'All' | 'Low' | 'Medium' | 'High'>) => {
      state.priorityFilter = action.payload
    },
    clearCompleted: (state) => {
      state.tasks = state.tasks.filter(t => t.status !== 'Completed')
      saveTasksToStorage(state.tasks)
    },
  },
})

export const { addTask, editTask, deleteTask, toggleStatus, setFilter, setSearch, setPriorityFilter, clearCompleted } = tasksSlice.actions
export default tasksSlice.reducer