import { useState } from 'react'
import './App.css'
import { Routes,Route } from 'react-router-dom'
import Login from './pages/Login'
import DashBoard from './pages/DashBoard'
import WorkContext, { WorkProviderComponent } from './context/WorkContext'
import Header from './components/Header'
import Project from './pages/Project'
import TeamList from './pages/TeamList'
import TaskDetailPage from './pages/TaskDetailPage'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Report from './pages/Report'



function App() {
  
  return (
    <WorkProviderComponent>
      <Header/>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path='/DashBoard' element={<DashBoard/>}/>
        <Route path='/project' element={<Project/>}/>
        <Route path='/teamlist' element={<TeamList/>}/>
        <Route path='/taskDetail/:id' element={<TaskDetailPage/>}/>
        <Route path='/report' element={<Report/>}/>
      </Routes>
    </WorkProviderComponent>
  )
}

export default App
