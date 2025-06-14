import React from 'react';
import './Sidebar.css'; 
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="sidebar-container">
      <div className="sidebar-header">
        <h1>workasana</h1>
      </div>
      <nav className="sidebar-nav">
        <ul>
          <li className="nav-item">
            <NavLink to='/DashBoard' className="nav-link">
              <i className="icon-dashboard"></i> 
              Dashboard
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/project" className="nav-link">
              <i className="icon-project"></i> 
              Project
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/teamlist" className="nav-link">
              <i className="icon-team"></i> 
              Team
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/report" className="nav-link">
              <i className="icon-reports"></i> 
              Reports
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;