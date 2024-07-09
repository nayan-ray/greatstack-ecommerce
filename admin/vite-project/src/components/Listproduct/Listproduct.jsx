import React, { useEffect, useState } from 'react'
import "./Listproduct.css"
import cross_icon from '../../assets/cart_cross_icon.png'
const Listproduct = () => {
   let [allproducts, setAllproducts] = useState([]);
   const fetchData = async()=>{
        await fetch('http://localhost:4000/allproducts')
              .then((res)=> res.json())
              .then((data)=>{setAllproducts(data)}) 
   }


  useEffect(()=>{
         fetchData();     
  }, [])

  const deleteproduct= async (productId)=>{
         await fetch("http://localhost:4000/removeproduct",{
             method : "POST",
             headers :{
                Accept : 'application/json',
                'Content-Type' : 'application/json'
             },
             body : JSON.stringify({id: productId}),
         }).then((res)=> res.json())
           .then((data)=>{
                console.log(data);
                data.success ? alert(data.message): alert("failed");
           })

        await fetchData();
  }
 
  return (
    <div className='list-product'>
        <h1>All Products List</h1>
        <div className="listproduct-format-main">
             <p>Products</p>
             <p>Title</p>
             <p>Old Price</p>
             <p>New Price</p>
             <p>Category</p>
             <p>Remove</p>
        </div>
       <div className="listproduct-allproducts">
           <hr />
           {allproducts.map((product, index)=>{
                return <div key={index} className="listproduct-format-main">
                        <img className='list-product-icon' src={product.image} alt="" />
                        <p>{product.name}</p>
                        <p>${product.old_price}</p>
                        <p>${product.new_price}</p>
                         <p>{product.category}</p>
                         <img onClick={()=>{deleteproduct(product.id)}} className='list-product-remove' src={cross_icon} alt="" />
                      </div>
                       
                
                  
                
           })}
       </div>
    </div>
  )
}

export default Listproduct
