import React from 'react'
import '../Pages.js/Sidebar.css'

const Sidebar = () => {
return <div className='menu'>
    <div className='logo'>
        
        <h2>User Dashboard</h2>
        </div>
        
        <div className="menu--list">
            <a href='#' className="item">
                User Profile
          </a>
          <a href='#' className="item">
                
                Log Entry
          </a>
          <a href='#' className="item">
                
                Logged Entry(s)
          </a>
          <a href='#' className="item">
                
                Log out
          </a>
          </div>
          </div>;
  
};





export default Sidebar;