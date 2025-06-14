import React, { use, useContext, useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import WorkContext from '../context/WorkContext'
import AddTasks from '../components/AddTasks'

const Project = () => {
    const [tasks,setTasks] = useState([])
    const {fetchTaskData} = useContext(WorkContext)

    useEffect(()=>{
        const datasetting = async()=>{
            const taskdata = await fetchTaskData()
            setTasks(taskdata)
        }
        datasetting()
    },[])
  return (
    <div className='Dashboard'>
        <Sidebar/>
        <main className='main-content'>
            <div>
                <h2>Create Moodboard</h2>
                <p>
                    This project centers around compiling a digital moodboard to set the visual direction and tone for a new brand identity. The moodboard will showcase a curated selection of
                    images, color palettes, typography samples, textures, and layout inspirations that collectively evoke the brand's intended mood and style.
                </p>
                <AddTasks/>
            </div>
            <div className="table-wrapper">
                <table className="task-table">
                    <thead>
                        <tr>
                            <th>TASKS</th>
                            <th>OWNER</th>
                            <th>DUE ON</th>
                            <th>STATUS</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            tasks.map((task)=>(
                                <tr key={task._id}>
                                    <td>{task.name}</td>
                                    <td className="owners">
                                        {
                                            task.owners.map((own,index)=>(
                                                <span key={index} className="avatar">{own.name[0]}</span>
                                            ))
                                        }
                                    </td>
                                    <td>{task.timeToComplete}</td>
                                    <td>
                                        <span className={`status ${task.status.replace(' ', '-').toLowerCase()}`}>
                                        {task.status}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </main>
    </div>
  )
}

export default Project