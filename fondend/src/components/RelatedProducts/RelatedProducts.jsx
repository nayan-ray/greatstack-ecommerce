import React from 'react';
import './RelatedProducts.css';
import data_product from '../assets/data';
import Item1 from '../Item/Item1';

const RelatedProducts = () => {
  return (
    <div className='relatedproducts'>
           <h1>Related Products</h1>
           <hr/>
           <div className="relatedproducts-item">
                {data_product.map((item, i)=>{
                    return <Item1 key={i} id={item.id} image={item.image} name={item.name} new_price={item.new_price} old_price={item.old_price}/>
                })}
           </div>
    </div>
  )
}

export default RelatedProducts;
