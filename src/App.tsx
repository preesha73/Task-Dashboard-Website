import { Provider } from 'react-redux'
import { store } from './store'
import TaskDashboard from './components/TaskDashboard'
import { useSelector } from 'react-redux'
import { RootState } from './store'
import { useEffect } from 'react'

function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { isDark } = useSelector((state: RootState) => state.theme)

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDark])

  return <>{children}</>
}

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <TaskDashboard />
      </ThemeProvider>
    </Provider>
  )
}

export default App