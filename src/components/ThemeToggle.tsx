import { useDispatch, useSelector } from 'react-redux'
import { toggleTheme } from '../features/themeSlice'
import { RootState } from '../store'
import { Sun, Moon } from 'lucide-react'
import { motion } from 'framer-motion'

const ThemeToggle = () => {
  const dispatch = useDispatch()
  const { isDark } = useSelector((state: RootState) => state.theme)

  return (
    <motion.button
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
      onClick={() => dispatch(toggleTheme())}
      className={`p-2 w-12 h-6 rounded-full transition-all duration-300 shadow-sm hover:shadow-md ${
        isDark ? 'bg-slate-700' : 'bg-slate-200'
      } border ${isDark ? 'border-slate-600' : 'border-slate-300'}`}
      aria-label="Toggle theme"
    >
      <motion.div
        className={`w-4 h-4 rounded-full flex items-center justify-center transition-all duration-300 ${
          isDark ? 'bg-slate-800 translate-x-6' : 'bg-yellow-400 translate-x-0'
        }`}
        layout
      >
        {isDark ? (
          <Moon size={12} className="text-slate-300" />
        ) : (
          <Sun size={12} className="text-yellow-700" />
        )}
      </motion.div>
    </motion.button>
  )
}

export default ThemeToggle