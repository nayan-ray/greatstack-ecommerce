import React from 'react'
import "./Navbar.css"
import navlogo from '../../assets/logo.png'
import navprofile from '../../assets/product_14.png'
import dropdown_icon from '../../assets/dropdown_icon.png'

const Navbar = () => {
  return (
    <div className='navbar'>
         <div className="nabLogo">
               <img src={navlogo} className='nav-logo' alt="" />
                <div className="title">
                    <h1>SHOPPER</h1>
                    <p>Admin Panel</p>
                </div>
         </div>
          <div className="navProfile">
                 <img src={navprofile} className='nav-profite' alt="" />
                  <img src={dropdown_icon} className='dropdown' alt="" />
          </div>
          
    </div>
  )
}

export default Navbar
