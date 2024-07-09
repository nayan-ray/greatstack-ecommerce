import React, { useContext } from 'react';
import './CartItems.css'
import { ShopContext } from '../../context/ShopContext';
import removeicon from '../assets/cart_cross_icon.png';

const CartItems = () => {
    const {getTotalAmount, all_products, cartItems, removeFromCart} = useContext(ShopContext)
  return (
    <div className='cartitems'>
         <div className="cart-items-format-main">
             <p>Products</p>
             <p>Title</p>
             <p>Price</p>
             <p>Quantity</p>
             <p>Total</p>
             <p>remove</p>
         </div>
         <hr />
         {all_products.map((e, i)=>{
            if(cartItems[e.id]>0){
                return <div key={i}>
                              <div className="cartitems-format  cart-items-format-main">
                                  <img src={e.image} alt="" className='carticon-product-imgage'/>
                                  <p>{e.name}</p>
                                  <p>${e.new_price}</p>
                                  <button className='quantity'>{cartItems[e.id]}</button>
                                  <p>${e.new_price*cartItems[e.id]}</p>
                                  <img onClick={()=>{removeFromCart(e.id)}} className='remove-icon' src={removeicon} alt="" />
                              </div>
                      </div>
            }else{
                return null;
            }
         })}

         <div className="cartitems-down">
             <div className="cart-items-total">
                  <h1>Cart Totals</h1>
                  <div>
                      <div className="cart-item-total-item">
                            <p>Subtotal</p>
                            <p>${getTotalAmount()}</p>
                      </div>
                      <hr />
                      <div className="cart-item-total-item">
                            <p>Shipping fee</p>
                            <p>free</p>
                      </div>
                      <hr />
                      <div className="cart-item-total-item">
                            <p>Total</p>
                            <p>${getTotalAmount()}</p>
                      </div>
                  </div>
                  <button>PROCEED TO CHEEKOUT</button>
             </div>
             <div className="cartitems-promocode">
                   <p>If you have promocode, enter it here</p>
                   <div className="cartitems-promobox">
                       <input type="text" placeholder='promocode' />
                       <button>Submit</button>
                   </div>
             </div>
         </div>
    </div>
  )
}

export default CartItems
