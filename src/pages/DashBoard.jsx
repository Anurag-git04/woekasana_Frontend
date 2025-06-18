import React, { useContext, useEffect, useState } from 'react'
import WorkContext from '../context/WorkContext'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import AddProject from '../components/AddProject'
import AddTasks from '../components/AddTasks'

const DashBoard = () => {
  const {log,fetchTaskData} = useContext(WorkContext)
  const [projectData,setProject] = useState([])
  const [taskData,setTasks]= useState([])
  const navigate = useNavigate()
  const {fetchData} = useContext(WorkContext)
  const funcProject = async(data,taskdata)=>{
    console.log("Data: ",data)
    console.log("Task Data: ",taskdata)
    setProject(data)
    setTasks(taskdata)
  }

 

  useEffect(() => {
    const fetchProjects = async () => {
      if (!log) {
        navigate('/')
        return
      }
      const data = await fetchData()
      const taskdata = await fetchTaskData()
      funcProject(data,taskdata)
    }
    fetchProjects()

  }, [])

  const navi = (task)=>{
    navigate(`/taskDetail/${task._id}`)
  }
  
  
  return (
    <div className='Dashboard'>
      <Sidebar/>
      <main className='main-content'>
        <div className='contain'>
          <div className='projects-header'>
            <h2>Project</h2>
          </div>
          <AddProject/>
        </div>
        
        <div className='box'>
            {
              projectData.map((project)=>(
                <div className='project-card'>
                  <div className="project-Status"></div>
                  <h3>{project.name}</h3>
                  <p>{project.description}</p>
                </div>
              ))
            }
        </div>
        <div className='contain'>
            <div className="projects-header">
              <h2>Tasks</h2>
            </div>
            <AddTasks/>
        </div>
        <div className='box'>
            {
              taskData.map((task)=>(
                <div className='project-card' onClick={(e)=>navi(task)}>
                  <div className={`status ${task.status.replace(' ', '-').toLowerCase()}`}>{task.status}</div>
                  <h3>{task.name}</h3>
                  <p><strong>Project: </strong>{task.project.name}</p>
                </div>
              ))
            }
        </div>
      </main>
    </div>

  )
}

export default DashBoard