import React, { useState } from 'react'
import './Addproduct.css'
import upload_image from "../../assets/upload_image.jpg";

const Addproduct = () => {
   const [image, setImage] = useState(false);
   const [productDetails, setProductDetails] = useState({
             name : "",
             image : "",
             category : "",
             new_price : "",
             old_price : "",
   })
   const imagaHandler =(e)=>{
        setImage(e.target.files[0]);
        console.log(e.target.files[0]);
   }
   const changehandler=(e)=>{
        setProductDetails({...productDetails, [e.target.name] : e.target.value});
   }
   const submithandler =async ()=>{
     //    console.log(image);
     //    console.log(productDetails);
        let responseData;
        let product = productDetails;
        let formData = new FormData();
        formData.append( 'product' , image);
     //    console.log(formData);
         await fetch("http://localhost:4000/uploads" , {
               method :"POST",
               headers: {
                    Accept : 'application/json',
               },
               body : formData,
         }).then((response)=> response.json()).then((data) => {responseData =data})

     //     console.log(responseData);

         if(responseData.success){
              product.image = responseData.img_url;
          //     console.log(product);
              await fetch('http://localhost:4000/addproduct', {
                   method : "POST",
                   headers : {
                      Accept : 'application/json',
                      'Content-Type' : 'application/json',
                   },
                   body : JSON.stringify(product),
                   
              }).then((resp)=>resp.json()).then((data)=>{
                 data.success ? alert("Product successfully added") : alert("failed")
                 
              })
         }

   }

    




  return (
    <div className='add-product'>
          <div className="addproduct-itemfield">
               <p>Product title</p>
               <input onChange={changehandler} value={productDetails.name} type="text"  name='name' placeholder='type here'/>
          </div>
          <div className="addproduct-price">
              <div className="addproduct-itemfield">
                   <p>Price</p>
                   <input onChange={changehandler} value={productDetails.old_price} type="number"  name='old_price' placeholder='type here'/>
              </div>
              <div className="addproduct-itemfield">
                  <p>Offer price</p>
                  <input onChange={changehandler} value={productDetails.new_price} type="number"  name='new_price' placeholder='type here'/>
              </div>
          </div>
          <div className="addproduct-itemfield">
               <p>Category</p>
               <select onChange={changehandler} value={productDetails.category}  name="category" className='addproduct-selector'>
                   <option value="">Select your category</option>
                   <option value="men">Men</option>
                   <option value="women">Women</option>
                   <option value="kids">Kids</option>
               </select>
          </div>
          <div className="addproduct-itemfield">
                <label htmlFor="file">
                    <img className='upload_image' src={image ? URL.createObjectURL(image) : upload_image} alt="" />
                </label>
                 <input onChange={imagaHandler} type="file" name='image' id='file' hidden/>
          </div>
          <button onClick={submithandler} className='addproduct-btn'>ADD</button>
    </div> 
  )
}

export default Addproduct
