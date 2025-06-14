import React, { useContext } from 'react'
import './Header.css';
import { NavLink, useNavigate } from 'react-router-dom';
import WorkContext from '../context/WorkContext';

const Header = () => {
  const {setLogged,log} = useContext(WorkContext)
  const navigate = useNavigate()
  const handlelogout=()=>{ 
    setLogged(false)
    navigate('/')
  }
  return (
    <div className='header'>
      <div className=''>
        <h2>Workasana</h2>
      </div>
      <button onClick={handlelogout} style={{ display : log? "block" : "none"}}>
        Log-Out
      </button>
    </div>
  )
}

export default Header