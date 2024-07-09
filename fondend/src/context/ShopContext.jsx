import React, { createContext, useEffect, useState } from "react";


export const ShopContext = createContext();

const getDefaultCart =()=>{
       let cart ={};
       for (let index = 0; index < 300; index++) {
            cart[index]=0;
        
       }
       return cart;
}

const ShopContextProvider=(props)=>{
    const [itemId, setItemId] = useState(null);
    const [all_products, setAll_products] = useState([]);
    const [cartItems, setCartItems]=useState(getDefaultCart());
    useEffect(()=>{
        fetch('http://localhost:4000/allproducts')
            .then(res=>res.json())
            .then((data)=>{;setAll_products(data)})

            if(localStorage.getItem('auth_token')){
                fetch("http://localhost:4000/getcart", {
                    method : "POST",
                    headers : {
                        Accept : 'application/json',
                        'auth_token' : `${localStorage.getItem('auth_token')}`,
                        'Content-Type' : 'application/json',
                    },
                    body : '',
                }).then(res => res.json())
                   .then( (data) => {setCartItems(data)})
            }
    }, [itemId]);
   //  useEffect(()=>{
   //    if(localStorage.getItem('auth_token')){
   //       fetch("http://localhost:4000/getcart", {
   //           method : "POST",
   //           headers : {
   //               Accept : 'application/json',
   //               'auth_token' : `${localStorage.getItem('auth_token')}`,
   //               'Content-Type' : 'application/json',
   //           },
   //           body : '',
   //       }).then(res => res.json())
   //          .then( (data) => {setCartItems(data)})
   //   }

   //  }, [itemId]);

    
    const addToCart=(itemId)=>{
       
       if(localStorage.getItem('auth_token')){
          fetch("http://localhost:4000/addtocart",{
               method :"POST",
               headers :{
                  Accept : 'application/json',
                  "auth_token" : `${localStorage.getItem('auth_token')}`,
                  "Content-Type" : 'application/json',
               },
               body : JSON.stringify({id : itemId}),
          }).then(res=>res.json())
             .then(respons =>{
                 if(respons.success){
                    console.log('data added');
                 }else{
                    console.log('data not added');
                 }
             })
       }else{
          alert('please login fast');
       }
       setItemId((n)=> n+1);
   }
   
   const removeFromCart=(itemId)=>{
     
    if(localStorage.getItem('auth_token')){
        fetch("http://localhost:4000/removefromcart",{
             method :"POST",
             headers :{
                Accept : 'application/json',
                "auth_token" : `${localStorage.getItem('auth_token')}`,
                "Content-Type" : 'application/json',
             },
             body : JSON.stringify({id : itemId}),
        }).then(res=>res.json())
           .then(respons =>{
               if(respons.success){
                  console.log('data deleted');
               }else{
                  console.log('data not deleted');
               }
           })
     }else{
        alert('please login fast');
     }
     setItemId((n)=> n+1);
   }
   const getTotalAmount =()=>{
         let totalAmount=0;
         for (const item in cartItems) {
            if (cartItems[item] > 0) {
                 const product = all_products.find((product)=>product.id === Number(item));
                 totalAmount += product.new_price * cartItems[item];
                
             }

         }
         return totalAmount;
   }

   const getTotal= ()=>{
        let total = 0;
        for (const item in cartItems) {
                if(cartItems[item] > 0){
                     total += cartItems[item];  
                } 
            }
            return total;
        }
   
    const contextValue = {all_products, cartItems, addToCart,removeFromCart, getTotalAmount, getTotal};
   
    return (
       
           <ShopContext.Provider value={contextValue}>
              {props.children}
           </ShopContext.Provider>
       
       )
}

export default ShopContextProvider;