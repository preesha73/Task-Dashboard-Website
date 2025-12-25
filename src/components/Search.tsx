import { useDispatch, useSelector } from 'react-redux'
import { setSearch } from '../features/tasksSlice'
import { RootState } from '../store'
import { Search as SearchIcon } from 'lucide-react'
import { motion } from 'framer-motion'

const Search = () => {
  const dispatch = useDispatch()
  const search = useSelector((state: RootState) => state.tasks.search)

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.5 }}
      className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-4"
    >
      <div className="relative">
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
          <SearchIcon size={18} className="text-slate-400 dark:text-slate-500" />
        </div>
        <input
          type="text"
          value={search}
          onChange={(e) => dispatch(setSearch(e.target.value))}
          placeholder="Search tasks by title or description..."
          className="w-full pl-12 pr-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-slate-700 dark:text-white text-slate-900 placeholder-slate-500 dark:placeholder-slate-400 transition-all duration-200"
        />
        {search && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => dispatch(setSearch(''))}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors duration-200"
          >
            ✕
          </motion.button>
        )}
      </div>
    </motion.div>
  )
}

export default Search