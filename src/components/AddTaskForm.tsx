import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addTask } from '../features/tasksSlice'
import { Plus } from 'lucide-react'
import { motion } from 'framer-motion'

const AddTaskForm = () => {
  const [title, setTitle] = useState('')
  const [priority, setPriority] = useState<'Low' | 'Medium' | 'High'>('Medium')
  const [dueDate, setDueDate] = useState('')
  const [isExpanded, setIsExpanded] = useState(false)
  const dispatch = useDispatch()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (title.trim()) {
      dispatch(addTask({ title: title.trim(), priority, dueDate: dueDate || undefined }))
      setTitle('')
      setPriority('Medium')
      setDueDate('')
      setIsExpanded(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      className="card overflow-hidden w-full"
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
            <Plus size={18} className="text-blue-500" />
            Add New Task
          </h2>
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 transition-colors text-sm font-medium"
          >
            {isExpanded ? 'Less' : 'More'} options
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="What needs to be done?"
                className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400"
                required
              />
            </div>

            <motion.div
              animate={{ height: isExpanded ? 'auto' : 0, opacity: isExpanded ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as 'Low' | 'Medium' | 'High')}
                className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
              >
                <option value="Low">🟢 Low Priority</option>
                <option value="Medium">🟡 Medium Priority</option>
                <option value="High">🔴 High Priority</option>
              </select>
            </motion.div>

            <motion.div
              animate={{ height: isExpanded ? 'auto' : 0, opacity: isExpanded ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
              />
            </motion.div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="md:col-span-2 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg flex items-center justify-center gap-2 transition-all duration-200 shadow-sm hover:shadow-md font-medium"
            >
              <Plus size={18} />
              Add Task
            </motion.button>
          </div>
        </form>
      </div>
    </motion.div>
  )
}

export default AddTaskForm