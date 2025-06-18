import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';

const AddProject = () => {
    const [projectname, setPrjectName] = useState('')
    const [Description,setDesc] = useState('')
    const navigate = useNavigate()

    const addProject = async()=>{
        try {
            if(!projectname || !Description){
                alert('Missing Project Name or Description')
            }
            const obj = {
                name:projectname,
                description:Description
            }
            const res = await fetch(`https://workasana-backend-ecru.vercel.app/project`,{
                method:'POST',
                headers:{
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify(obj)
            })
            const result = await res.json()
            if(result.ok){
                // alert('New Project is added successfully')
                toast.success("Projected Added")
                navigate('/DashBoard')
            }else{
                // alert(result.message || 'Error adding task');
                toast.error(result.message)
            }
            
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <div>
        {/* Button trigger modal */}
        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Add New Project
        </button>

        {/* Modal */}
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content">
            <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">Add new project</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
                <div>
                    <label htmlFor="" className='form-label'>Project Name:</label>
                    <input type="text" className='form-control' value={projectname} onChange={(e)=> setPrjectName(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="" className='form-label'>Project Name:</label>
                    <textarea type="text" className='form-control' value={Description} onChange={(e)=> setDesc(e.target.value)} />
                </div>
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary" onClick={addProject}>Add</button>
            </div>
            </div>
        </div>
        </div>
    </div>
  )
}

export default AddProject