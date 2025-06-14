import React, { useContext, useEffect, useState } from 'react'
import WorkContext from '../context/WorkContext'

const AddTasks = () => {
  const { fetchData, fetchTeam } = useContext(WorkContext)

  const [projectList, setProjectList] = useState([])
  const [teamList, setTeamList] = useState([])
  const [ownersList, setOwnersList] = useState([])

  const [form, setForm] = useState({
    name: '',
    project: '',
    team: '',
    owners: [],
    tags: '',
    timeToComplete: '',
    status: 'To Do'
  })

  // Fetch dropdown data on load
  useEffect(() => {
    const init = async () => {
      const projects = await fetchData()
      console.log(projects)
      const teams = await fetchTeam()
      const owners = await fetch('http://localhost:5080/member').then(res => res.json())

      setProjectList(projects)
      setTeamList(teams)
      setOwnersList(owners.data)
    }
    init()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({
      ...prev,
      [name]: name === 'owners' ? [...e.target.selectedOptions].map(opt => opt.value) : value
    }))
  }

  const handleSubmit = async () => {
    try {
      const payload = {
        ...form,
        tags: form.tags.split(',').map(tag => tag.trim())
      }

      const res = await fetch('https://workasana-backend-ecru.vercel.app/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      const data = await res.json()

      if (res.ok) {
        alert('Task created successfully')
        setForm({
          name: '',
          project: '',
          team: '',
          owners: [],
          tags: '',
          timeToComplete: '',
          status: 'To Do'
        })
      } else {
        alert(data.message)
      }
    } catch (error) {
      console.error('Error submitting task:', error)
    }
  }

  return (
    <div>
      <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Add new Task
      </button>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Add Task</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
            </div>
            <div className="modal-body">
              <input type="text" className="form-control my-2" placeholder="Task Name" name="name" value={form.name} onChange={handleChange} />

              <select className="form-select my-2" name="project" value={form.project} onChange={handleChange}>
                <option value="">Select Project</option>
                {projectList.map(project => (
                  <option key={project._id} value={project._id}>{project.name}</option>
                ))}
              </select>

              <select className="form-select my-2" name="team" value={form.team} onChange={handleChange}>
                <option value="">Select Team</option>
                {teamList.map(team => (
                  <option key={team._id} value={team._id}>{team.name}</option>
                ))}
              </select>

              <select className="form-select my-2" name="owners" multiple value={form.owners} onChange={handleChange}>
                {ownersList.map(owner => (
                  <option key={owner._id} value={owner._id}>{owner.name}</option>
                ))}
              </select>

              <input type="text" className="form-control my-2" placeholder="Tags (comma separated)" name="tags" value={form.tags} onChange={handleChange} />
              <input type="number" className="form-control my-2" placeholder="Time to Complete" name="timeToComplete" value={form.timeToComplete} onChange={handleChange} />

              <select className="form-select my-2" name="status" value={form.status} onChange={handleChange}>
                <option value="To Do">To Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" onClick={handleSubmit} data-bs-dismiss="modal">Save Task</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddTasks
