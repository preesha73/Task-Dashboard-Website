import { useSelector } from 'react-redux'
import { RootState } from '../store'
import TaskItem from './TaskItem'
import { ListTodo } from 'lucide-react'

const TaskList = () => {
  const { tasks, filter, search, priorityFilter } = useSelector((state: RootState) => state.tasks)

  const filteredTasks = tasks.filter(task => {
    const matchesFilter = filter === 'All' || task.status === filter
    const matchesSearch = task.title.toLowerCase().includes(search.toLowerCase())
    const matchesPriority = priorityFilter === 'All' || task.priority === priorityFilter
    return matchesFilter && matchesSearch && matchesPriority
  }).sort((a, b) => {
    // Sort by priority (High > Medium > Low) then by created date
    const priorityOrder = { High: 3, Medium: 2, Low: 1 }
    if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
      return priorityOrder[b.priority] - priorityOrder[a.priority]
    }
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  })

  return (
    <div className="space-y-4">
      {filteredTasks.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 dark:text-gray-500 mb-4">
            <ListTodo size={48} className="mx-auto" />
          </div>
          <p className="text-gray-500 dark:text-gray-400 text-lg">No tasks found.</p>
          <p className="text-gray-400 dark:text-gray-500 text-sm mt-1">Add a new task to get started!</p>
        </div>
      ) : (
        filteredTasks.map(task => (
          <TaskItem key={task.id} task={task} />
        ))
      )}
    </div>
  )
}

export default TaskList