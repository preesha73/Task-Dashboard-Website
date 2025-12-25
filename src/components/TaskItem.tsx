import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { deleteTask, toggleStatus, editTask } from '../features/tasksSlice'
import { Task } from '../features/tasksSlice'
import { Edit, Trash2, CheckCircle, Circle, Calendar, AlertTriangle, Minus, Plus } from 'lucide-react'
import { motion } from 'framer-motion'

interface TaskItemProps {
  task: Task
}

const TaskItem = ({ task }: TaskItemProps) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editTitle, setEditTitle] = useState(task.title)
  const [editPriority, setEditPriority] = useState(task.priority)
  const [editDueDate, setEditDueDate] = useState(task.dueDate || '')
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const dispatch = useDispatch()

  const handleEdit = () => {
    if (editTitle.trim()) {
      dispatch(editTask({ id: task.id, title: editTitle.trim(), priority: editPriority, dueDate: editDueDate || undefined }))
      setIsEditing(false)
    }
  }

  const handleCancel = () => {
    setEditTitle(task.title)
    setEditPriority(task.priority)
    setEditDueDate(task.dueDate || '')
    setIsEditing(false)
  }

  const handleDelete = () => {
    dispatch(deleteTask(task.id))
    setShowDeleteConfirm(false)
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'priority-high'
      case 'Medium': return 'priority-medium'
      case 'Low': return 'priority-low'
      default: return 'priority-low'
    }
  }

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'High': return <AlertTriangle size={16} />
      case 'Medium': return <Minus size={16} />
      case 'Low': return <Plus size={16} />
      default: return null
    }
  }

  const getStatusBorder = () => {
    const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && task.status === 'Pending'
    if (isOverdue) return 'task-overdue'
    if (task.status === 'Completed') return 'task-completed'
    return 'task-pending'
  }

  const getStatusBadge = () => {
    const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && task.status === 'Pending'
    if (isOverdue) {
      return (
        <span className="status-badge status-overdue">
          Overdue
        </span>
      )
    }
    if (task.status === 'Completed') {
      return (
        <span className="status-badge status-completed">
          Completed
        </span>
      )
    }
    return (
      <span className="status-badge status-pending">
        Pending
      </span>
    )
  }

  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && task.status === 'Pending'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ y: -2, scale: 1.01 }}
      transition={{ duration: 0.2 }}
      className={`task-item ${getStatusBorder()} border border-slate-200 dark:border-slate-700 overflow-hidden w-full group`}
    >
      {isEditing ? (
        <div className="p-6 space-y-4">
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
            placeholder="Task title..."
          />
          <select
            value={editPriority}
            onChange={(e) => setEditPriority(e.target.value as 'Low' | 'Medium' | 'High')}
            className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
          >
            <option value="Low">🟢 Low Priority</option>
            <option value="Medium">🟡 Medium Priority</option>
            <option value="High">🔴 High Priority</option>
          </select>
          <input
            type="date"
            value={editDueDate}
            onChange={(e) => setEditDueDate(e.target.value)}
            className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
          />
          <div className="flex gap-3 pt-2">
            <motion.button
              onClick={handleEdit}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg flex-1 transition-colors duration-200 font-medium text-sm"
            >
              Save Changes
            </motion.button>
            <motion.button
              onClick={handleCancel}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-slate-500 hover:bg-slate-600 text-white px-6 py-2 rounded-lg flex-1 transition-colors duration-200 font-medium text-sm"
            >
              Cancel
            </motion.button>
          </div>
        </div>
      ) : (
        <div className="p-6">
          <div className="flex items-start justify-between gap-4">
            {/* Left side - Task content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-3">
                {getStatusBadge()}
                <span className={`priority-badge ${getPriorityColor(task.priority)}`}>
                  {getPriorityIcon(task.priority)}
                  {task.priority}
                </span>
              </div>
              <h3 className={`text-lg font-semibold mb-2 ${task.status === 'Completed' ? 'line-through text-slate-500 dark:text-slate-400' : 'text-slate-900 dark:text-white'}`}>
                {task.title}
              </h3>
              {task.dueDate && (
                <div className={`flex items-center gap-2 text-sm ${isOverdue ? 'text-red-600 dark:text-red-400' : 'text-slate-600 dark:text-slate-400'}`}>
                  <Calendar size={16} />
                  {new Date(task.dueDate).toLocaleDateString('en-US', {
                    weekday: 'short',
                    month: 'short',
                    day: 'numeric'
                  })}
                </div>
              )}
            </div>

            {/* Right side - Actions */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <motion.button
                onClick={() => dispatch(toggleStatus(task.id))}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`p-2 rounded-lg transition-all duration-200 ${
                  task.status === 'Completed'
                    ? 'text-green-600 hover:bg-green-100 dark:hover:bg-green-900/30'
                    : 'text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'
                }`}
              >
                {task.status === 'Completed' ? <CheckCircle size={20} /> : <Circle size={20} />}
              </motion.button>
              <motion.button
                onClick={() => setIsEditing(true)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-lg text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-all duration-200"
              >
                <Edit size={20} />
              </motion.button>
              <motion.button
                onClick={() => setShowDeleteConfirm(true)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-lg text-red-600 hover:bg-red-100 dark:hover:bg-red-900/30 transition-all duration-200"
              >
                <Trash2 size={20} />
              </motion.button>
            </div>
          </div>
        </div>
      )}

      {showDeleteConfirm && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-2xl max-w-sm w-full"
          >
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Delete Task</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">Are you sure you want to delete this task? This action cannot be undone.</p>
            <div className="flex gap-3">
              <motion.button
                onClick={handleDelete}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg flex-1 transition-colors duration-200 font-medium"
              >
                Delete
              </motion.button>
              <motion.button
                onClick={() => setShowDeleteConfirm(false)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg flex-1 transition-colors duration-200 font-medium"
              >
                Cancel
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  )
}

export default TaskItem