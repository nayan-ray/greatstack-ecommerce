import React from 'react';
import './BredCrum.css';
import arrow_icon from '../assets/arrow.png';

const BredCrum = (props) => {
  const {Product} =props;

  return (
    <div className='bredcrum'>
         HOME <img src={arrow_icon} alt="" />  Shop <img src={arrow_icon} alt="" /> {Product.category} <img src={arrow_icon} alt="" /> {Product.name}
        { console.log(Product)}
    </div>
  )
}

export default BredCrum;
