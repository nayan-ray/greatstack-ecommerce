import React from 'react';
import dropdoun_icon from '../components/assets/dropdown_icon.png';
import { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import Item1 from '../components/Item/Item1';
import './css/ShopCategory.css';

const ShopCategory = (props) => {
  const {all_products} = useContext(ShopContext);
  return (
    <div className='shop-category'>
           <img className='shopcategory-banner' src={props.banner} alt="" />
           <div className="shopCategory-indexShort">
               <p>
                    <span>Showing 1-12</span> out of 36 products
               </p>
                <div className="shopCategory-sort">
                     Sort by <img src={dropdoun_icon} alt="" />
                </div>
           </div>
           <div className="shopCategory-product">
                {all_products.map((item, i)=>{ 
                     if(item.category === props.category){ 
                         return  <Item1  key={i} id={item.id} image={item.image} name={item.name} new_price={item.new_price} old_price={item.old_price}/>
                      }
                   else{ 
                         return null;
                      }
                 })} 


                 {/* {all_products.map((item, i)=> <Item1  key={i} id={item.id} image={item.image} name={item.name} new_price={item.new_price} old_price={item.old_price}/>)} */}
           </div>

           <div className="shopcategory-loadmore">
                 Explore More
           </div>
    </div>
  )
}

export default ShopCategory;
