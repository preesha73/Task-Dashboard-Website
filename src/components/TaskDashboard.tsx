import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../store'
import { clearCompleted } from '../features/tasksSlice'
import AddTaskForm from './AddTaskForm'
import TaskList from './TaskList'
import Filter from './Filter'
import Search from './Search'
import ThemeToggle from './ThemeToggle'
import { CheckSquare, BarChart3, Trash2, ListTodo } from 'lucide-react'
import { motion } from 'framer-motion'

const TaskDashboard = () => {
  const dispatch = useDispatch()
  const { isDark } = useSelector((state: RootState) => state.theme)
  const { tasks } = useSelector((state: RootState) => state.tasks)

  const completedTasks = tasks.filter(task => task.status === 'Completed').length
  const pendingTasks = tasks.filter(task => task.status === 'Pending').length
  const overdueTasks = tasks.filter(task =>
    task.dueDate && new Date(task.dueDate) < new Date() && task.status === 'Pending'
  ).length

  return (
    <div className={`min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300`}>
      {/* Global Layout Container */}
      <div className="min-h-screen max-w-7xl mx-auto px-6 py-6">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="card p-8 mb-8"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-lg">
                <CheckSquare size={32} className="text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                  Task Management Dashboard
                </h1>
                <p className="text-slate-600 dark:text-slate-400 mt-1">
                  Organize your tasks efficiently and stay productive
                </p>
              </div>
            </div>
            <ThemeToggle />
          </div>
        </motion.header>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          <motion.div
            whileHover={{ y: -4 }}
            className="card p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 dark:text-slate-400 text-sm font-medium uppercase tracking-wide">Total Tasks</p>
                <p className="text-3xl font-bold text-slate-900 dark:text-white mt-1">{tasks.length}</p>
              </div>
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                <BarChart3 size={24} className="text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ y: -4 }}
            className="card p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 dark:text-slate-400 text-sm font-medium uppercase tracking-wide">Completed</p>
                <p className="text-3xl font-bold text-green-600 mt-1">{completedTasks}</p>
              </div>
              <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-xl">
                <CheckSquare size={24} className="text-green-600 dark:text-green-400" />
              </div>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ y: -4 }}
            className="card p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 dark:text-slate-400 text-sm font-medium uppercase tracking-wide">Pending</p>
                <p className="text-3xl font-bold text-yellow-600 mt-1">{pendingTasks}</p>
              </div>
              <div className="p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-xl">
                <ListTodo size={24} className="text-yellow-600 dark:text-yellow-400" />
              </div>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ y: -4 }}
            className="card p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 dark:text-slate-400 text-sm font-medium uppercase tracking-wide">Overdue</p>
                <p className="text-3xl font-bold text-red-600 mt-1">{overdueTasks}</p>
              </div>
              <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-xl">
                <Trash2 size={24} className="text-red-600 dark:text-red-400" />
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Main Dashboard Layout - Sidebar + Content */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="xl:col-span-3 space-y-6"
          >
            <Filter />
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="xl:col-span-9 space-y-6"
          >
            {/* Add Task Card */}
            <AddTaskForm />

            {/* Search and Clear Actions */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <div className="flex-1">
                <Search />
              </div>
              {completedTasks > 0 && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => dispatch(clearCompleted())}
                  className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl flex items-center gap-2 transition-all duration-200 shadow-sm hover:shadow-md font-medium"
                >
                  <Trash2 size={18} />
                  Clear Completed ({completedTasks})
                </motion.button>
              )}
            </div>

            {/* Task List Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="card p-8"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                    <ListTodo size={20} className="text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Your Tasks</h2>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">
                      {tasks.length} total • {completedTasks} completed • {pendingTasks} pending
                    </p>
                  </div>
                </div>
              </div>
              <TaskList />
            </motion.div>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 mt-12 p-6"
        >
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <CheckSquare size={16} className="text-blue-500" />
              <span className="text-slate-600 dark:text-slate-400 font-medium">Task Management Dashboard</span>
            </div>
            <p className="text-slate-500 dark:text-slate-500 text-sm">
              Built with React, TypeScript, Redux Toolkit & Tailwind CSS
            </p>
          </div>
        </motion.footer>
      </div>
    </div>
  )
}

export default TaskDashboard