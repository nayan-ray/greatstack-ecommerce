import React, { useContext, useRef, useState } from 'react';
import './Navbar.css';
import logo from '../assets/logo.png';
import cart from '../assets/cart_icon.png';
import { Link } from 'react-router-dom';
import { ShopContext } from '../../context/ShopContext';
import drop_drown from '../assets/dropdown_icon.png';


const Navbar = () => {
  const[menu, setMenu] = useState('shop');
  const {getTotal} = useContext(ShopContext);
  const menuref = useRef();
  const drop_drown_button =(e)=>{
         menuref.current.classList.toggle('nav-menu-visible');
         e.target.classList.toggle('open');
         
  } 
 
  return (
    <div className='navbar'>
        <div className="nav-logo">
            <Link to='/'> <img src={logo} alt="" /> </Link>
                <p>SHOPPER</p>
             
           
        </div> 
        <img onClick={(e)=>{drop_drown_button(e)}} className='dropdown' src={drop_drown} alt="" />
        <ul ref={menuref} className="nav-menu">
            <li onClick={()=>{setMenu('shop')}}><Link to='/' style={{textDecoration:"none"}}>Shop</Link>  {menu === "shop"? <hr/> : <></>}</li>
            <li onClick={()=>{setMenu('men')}}><Link style={{textDecoration:'none'}} to='/men'>Men</Link>  {menu === "men"? <hr/> : <></>}</li>
            <li onClick={()=>{setMenu('women')}}><Link style={{textDecoration:'none'}} to='/women'>Women </Link> {menu === "women"? <hr/> : <></>}</li>
            <li onClick={()=>{setMenu('kids')}}><Link style={{textDecoration:'none'}} to='/kids'>Kids </Link> {menu === "kids"? <hr/> : <></>}</li>
        </ul>
        <div className="nav-login-cart">
          {localStorage.getItem("auth_token") ? <button onClick={()=>{localStorage.removeItem("auth_token");window.location.replace("/")}}>Logout </button> : <Link to='/login'><button>Login</button></Link>  }
             
             
             <Link to='/cart'><img src={cart} alt="" /></Link>  
            <div className="nav-cart-count">{getTotal()}</div>
        </div> 
    </div>
  )
}

export default Navbar;
