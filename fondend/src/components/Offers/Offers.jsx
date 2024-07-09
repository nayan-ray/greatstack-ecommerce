import React from 'react';
import './Offers.css';
import exclusice_imgage from '../assets/exclusive_image.png';
const Offers = () => {
  return (
    <div className='offers'>
         <div className="offers-left">
              <h1>Exclusive</h1>
              <h1>Ofers for you</h1>
              <p>ONLY ON BEST SELLER PRODUCTS</p>
              <button>Check now</button>
         </div>
         <div className="offers-right">
               <img src={exclusice_imgage} alt="" />
         </div>
    </div>
  )
}

export default Offers
