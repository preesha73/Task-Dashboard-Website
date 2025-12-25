import { useDispatch, useSelector } from 'react-redux'
import { setFilter, setPriorityFilter } from '../features/tasksSlice'
import { RootState } from '../store'
import { Filter as FilterIcon } from 'lucide-react'
import { motion } from 'framer-motion'

const Filter = () => {
  const dispatch = useDispatch()
  const filter = useSelector((state: RootState) => state.tasks.filter)
  const priorityFilter = useSelector((state: RootState) => state.tasks.priorityFilter)

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3, duration: 0.5 }}
      className="card p-6 w-full"
    >
      <div className="flex items-center gap-2 mb-6">
        <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
          <FilterIcon size={18} className="text-blue-600 dark:text-blue-400" />
        </div>
        <span className="font-semibold text-slate-900 dark:text-white text-lg">Filters</span>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-semibold mb-3 text-slate-700 dark:text-slate-300">Status</label>
          <div className="flex flex-wrap gap-2">
            {[
              { key: 'All', label: 'All Tasks', color: 'bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-700 dark:hover:bg-slate-600 dark:text-slate-300' },
              { key: 'Completed', label: 'Completed', color: 'bg-green-100 hover:bg-green-200 text-green-700 dark:bg-green-900/30 dark:hover:bg-green-900/50 dark:text-green-300' },
              { key: 'Pending', label: 'Pending', color: 'bg-yellow-100 hover:bg-yellow-200 text-yellow-700 dark:bg-yellow-900/30 dark:hover:bg-yellow-900/50 dark:text-yellow-300' }
            ].map(({ key, label, color }) => (
              <motion.button
                key={key}
                onClick={() => dispatch(setFilter(key as 'All' | 'Completed' | 'Pending'))}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  filter === key
                    ? 'bg-blue-500 hover:bg-blue-600 text-white shadow-sm'
                    : color
                }`}
              >
                {label}
              </motion.button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-3 text-slate-700 dark:text-slate-300">Priority</label>
          <div className="flex flex-wrap gap-2">
            {[
              { key: 'All', label: 'All Priorities', color: 'bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-700 dark:hover:bg-slate-600 dark:text-slate-300' },
              { key: 'High', label: '🔴 High', color: 'bg-red-100 hover:bg-red-200 text-red-700 dark:bg-red-900/30 dark:hover:bg-red-900/50 dark:text-red-300' },
              { key: 'Medium', label: '🟡 Medium', color: 'bg-yellow-100 hover:bg-yellow-200 text-yellow-700 dark:bg-yellow-900/30 dark:hover:bg-yellow-900/50 dark:text-yellow-300' },
              { key: 'Low', label: '🟢 Low', color: 'bg-green-100 hover:bg-green-200 text-green-700 dark:bg-green-900/30 dark:hover:bg-green-900/50 dark:text-green-300' }
            ].map(({ key, label, color }) => (
              <motion.button
                key={key}
                onClick={() => dispatch(setPriorityFilter(key as 'All' | 'Low' | 'Medium' | 'High'))}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  priorityFilter === key
                    ? 'bg-blue-500 hover:bg-blue-600 text-white shadow-sm'
                    : color
                }`}
              >
                {label}
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default Filter