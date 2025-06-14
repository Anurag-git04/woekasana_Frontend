import React, { useContext, useEffect, useState } from 'react'
import WorkContext from '../context/WorkContext'
import { Pie } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js'
import Sidebar from '../components/Sidebar'

ChartJS.register(ArcElement, Tooltip, Legend)

const Report = () => {
    const [taskData,setStatus] = useState([])
    const {fetchTaskData} = useContext(WorkContext)
    useEffect(()=>{
        const settingData=async()=>{
            const res = await fetchTaskData()
            console.log(res)
            setStatus(res)
        }
        settingData()
    },[])

    const todo = taskData.reduce((acc, curr) => curr.status === 'To Do' ? acc + 1 : acc, 0)
    const inProgress = taskData.reduce((acc, curr) => curr.status === 'In Progress' ? acc + 1 : acc, 0)
    const completed = taskData.reduce((acc, curr) => curr.status === 'Completed' ? acc + 1 : acc, 0)

    const data = {
    labels: ['To Do', 'In Progress', 'Completed'],
    datasets: [
      {
        label: 'Task Status Distribution',
        data: [todo, inProgress, completed],
        backgroundColor: ['#007bff', '#ffc107', '#28a745'],
        borderColor: ['#ffffff'],
        borderWidth: 2,
      },
    ],
  }

  const options = {
    responsive: false,
    // maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
  }


  return (
    <div className='Dashboard'>
        <Sidebar/>
        <div className="container mt-5">
            <h2 className="mb-4">Task Status Pie Chart</h2>
            <Pie data={data} options={options} className='piesize' />
        </div>
    </div>
  )
}

export default Report