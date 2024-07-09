import React, { useContext } from 'react';
import './ProductDisplay.css';
import star_icon from '../assets/star_icon.png';
import star_dull_icon from '../assets/star_dull_icon.png';
import { ShopContext } from '../../context/ShopContext';

const ProductDisplay = (props) => {
       const {addToCart} = useContext(ShopContext)
    const {Product} = props;
  return (
    <div className='productDisplay'>
           <div className="productDisplay-left">
               <div className="productDisplay-img-list">
                      <img src={Product.image} alt="" />
                      <img src={Product.image} alt="" />
                      <img src={Product.image} alt="" />
                      <img src={Product.image} alt="" />
               </div>
               <div className="productDisplay-img">
                     <img className='ProductDisplay-main-image' src={Product.image} alt="" />
               </div>
           </div>
           <div className="productDisplay-right">
                   <h1>{Product.name}</h1>
                   <div className="product-display-right-start">
                         <img src={star_icon} alt="" />
                         <img src={star_icon} alt="" />
                         <img src={star_icon} alt="" />
                         <img src={star_icon} alt="" />
                         <img src={star_dull_icon} alt="" />
                   </div>
                   <div className="productDisplay-prices">
                          <div className="productDisplay-right-price-old">&{Product.old_price}</div>
                          <div className="productDisplay-rigt-price-new">&{Product.new_price}</div>
                   </div>
                   <p className='productDescription'>
                       Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora aliquam doloremque ea corporis vitae aut ab quaerat consectetur, aperiam, dignissimos omnis tenetur, deserunt similique? Omnis ad commodi laboriosam. Fugit, quae.
                   </p>
                   <div className="product-size">
                       <h1>Select Size</h1>
                        <div className="product-right-size">
                               <div>S</div>
                               <div>L</div>
                               <div>M</div>
                               <div>Xl</div>
                               <div>XXL</div>
                        </div>
                   </div>
                   <button onClick={()=>{addToCart(Product.id)}}>ADD TO CART</button>
                   <div className="product-right-category"><span>Category:</span> Women, T-shirt, Crop top</div>
                   <div className="product-right-category"><span>Tag:</span> Modern, Latest</div>
           </div>
    </div>
  )
}

export default ProductDisplay;



//mongodb+srv://niranzanroy1:<password>@nayanproject.ww3uvvb.mongodb.net/