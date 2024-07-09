import React from 'react'
import './Sidebar.css'
import navlogo from '../../assets/logo.png'
import { Link } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='sidebar'>
          <Link to={"/addproduct"} style={{textDecoration:"none"}}>
             <div className="sidebar-item">
                  <img src={navlogo} alt="" />
                 <p>Add Product</p>
              </div>
          </Link>
          <Link to={"/listproduct"} style={{textDecoration:"none"}}>
             <div className="sidebar-item">
                  <img src={navlogo} alt="" />
                 <p>Product List</p>
              </div>
          </Link>
    </div>
  )
}

export default Sidebar
