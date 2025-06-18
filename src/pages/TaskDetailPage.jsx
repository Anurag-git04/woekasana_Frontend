import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import { useParams } from 'react-router-dom'

const TaskDetailPage = () => {
  const { id } = useParams()
  const [taskData, setTaskDetail] = useState(null) // null for initial loading state
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchtask = async () => {
      try {
        const res = await fetch(`https://workasana-backend-ecru.vercel.app/tasksbyid/${id}`)
        const data = await res.json()
        console.log("Task Details data : ",data)
        setTaskDetail(data.data)
      } catch (error) {
        console.error('Error fetching task:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchtask()
  }, [id])

  if (loading) {
    return (
      <div className='Dashboard'>
        <Sidebar />
        <main className='main-content'>
          <p>Loading task details...</p>
        </main>
      </div>
    )
  }

  if (!taskData) {
    return (
      <div className='Dashboard'>
        <Sidebar />
        <main className='main-content'>
          <p>No task data found.</p>
        </main>
      </div>
    )
  }

  return (
    <div className='Dashboard'>
      <Sidebar />
      <main className='main-content'>
        <div>
          <h2>Task Details</h2>
        </div>
        <div>
          <p><strong>Name:</strong> {taskData.name}</p>
          <p><strong>Status:</strong> {taskData.status}</p>
          <p><strong>Project:</strong> {taskData.project?.name}</p>
          <p><strong>Time to Complete:</strong> {taskData.timeToComplete} days</p>
          <p><strong>Created At:</strong> {new Date(taskData.createdAt).toLocaleString()}</p>
          <p><strong>Owners:</strong> {taskData.owners.map(owner => owner.name).join(', ')}</p>
        </div>
      </main>
    </div>
  )
}

export default TaskDetailPage
