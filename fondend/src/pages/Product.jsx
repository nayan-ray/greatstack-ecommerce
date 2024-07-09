import React, { useContext } from 'react'
import BredCrum from '../components/BredCrum/BredCrum'
import { ShopContext } from '../context/ShopContext'
import { useParams } from 'react-router-dom';
import ProductDisplay from '../components/ProductDisplay/ProductDisplay';
import ProductDescription from '../components/Description/ProductDescription';
import RelatedProducts from '../components/RelatedProducts/RelatedProducts';


const Product = () => {
  const {all_products} =useContext(ShopContext);
  const {productId} = useParams();

 const Product = all_products.find((e)=> e.id === Number(productId));

 if(Product){
    return (
       <div>
          <BredCrum Product={Product}/>
          <ProductDisplay Product={Product} />
      

          <ProductDescription />
          <RelatedProducts />
      </div>
    )
 }else{
    return null;
 }
  
 
}

export default Product;
