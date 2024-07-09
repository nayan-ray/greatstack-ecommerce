import React, { useState } from 'react';
import './css/LoginSignup.css';

const Loginsignup = () => {
  const [user_details, setUser_details] = useState({
       username : "",
       email : "",
       password : "",
  })
  const [state, setState] = useState("Sign up");

  const onChangeHandler =(e)=>{
         setUser_details({...user_details, [e.target.name]: e.target.value})
  }
  const loginHandler = async()=>{
     let responseData;  
     await fetch("http://localhost:4000/login", {
            method : "POST",
            headers : {
               Accept : 'application/json',
               "Content-Type" : 'application/json',
            },
            body: JSON.stringify(user_details),
         }).then(res => res.json())
           .then(res=> responseData = res)
           
        if(responseData.success){
            localStorage.setItem("auth_token" , responseData.token);
            window.location.replace("/")
        }else{
           alert(responseData.errors);
        }
 
       setUser_details({
           username : "",
           email : "",
           password : "",
       })  
      
  }
  const signUpHandler = async()=>{
     let responseData;  
     await fetch("http://localhost:4000/signup", {
            method : "POST",
            headers : {
               Accept : 'application/json',
               "Content-Type" : 'application/json',
            },
            body: JSON.stringify(user_details),
         }).then(res => res.json())
           .then(res=> responseData = res)
           
        if(responseData.success){
            localStorage.setItem("auth_token" , responseData.token);
            window.location.replace("/")
        }else{
          alert(responseData.errors);
       }

       setUser_details({
           username : "",
           email : "",
           password : "",
       })
  }
  return (
    <div className='loginsignup'>
          <div className="loginsignup-container">
              <h1>{state === "Login" ? 'Login' : 'Sign Up'}</h1>
              <div className="loginsignup-fields">
                    {state === "Login" ? <> </> : <input onChange={onChangeHandler} name='username' type="text" value={user_details.username}  placeholder='Enter your name'/>}
                    <input onChange={onChangeHandler} name='email' type="email" value={user_details.email} placeholder='Your Email'/>
                    <input onChange={onChangeHandler} name='password' value={user_details.password} type="password" placeholder='Password' />
              </div>
              <button onClick={ state === "Login" ? loginHandler : signUpHandler}>Continue</button>
              {state === "Login" ? <p className='loginsignup-login'>Create an account? <span onClick={()=>{setState("Sign Up")}}>Click here</span> </p> :<p className='loginsignup-login'>Already have an account? <span onClick={()=>{setState("Login")}}>Login here</span> </p>}
               
               
               <div className="loginsignup-agree">
                  <input type="checkbox" />
                  <p>By continuing, I agree with terms of use & privacy policy</p>
               </div>
          </div>
    </div>
  )
}

export default Loginsignup;
