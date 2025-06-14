import React, { useContext, useEffect, useState } from 'react'
import WorkContext from '../context/WorkContext'
import Sidebar from '../components/Sidebar'

const TeamList = () => {
    const [teamarr,setTeamarr] = useState([])
    const {fetchTeam} = useContext(WorkContext)

    useEffect(()=>{
        const settingData = async()=>{
            const data = await fetchTeam()
            setTeamarr(data)
        }
        settingData()
    },[])

  return (
    <div className='Dashboard'>
        <Sidebar/>
        <main className='main-content'>
            <div>
                <h2>Team Listing</h2>
            </div>
            <div className="tasklist">
                        {
                            teamarr.map((task)=>(
                                <div key={task._id} className='box2'>
                                    <div className='header2'>{task.name}</div>
                                    <div>{task.description}</div>
                                    <div className="owner">
                                        {
                                            task.member.map((own,index)=>(
                                                <span key={index} className="avatar" data-fullname={`${own.name}`}>{own.name[0]}</span>
                                            ))
                                        }
                                    </div>
                                </div>
                            ))
                        }
            </div>
        </main>
    </div>
  )
}

export default TeamList