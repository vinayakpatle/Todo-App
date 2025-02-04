import React from "react";
import {useState,useRef} from "react";



const LoginHandle=({setIsLogin,setUser_id,setTodoList})=>{
  const emailRef=useRef(null);
  const passwordRef=useRef(null);

  async function login(){
    const email=emailRef.current.value.trim();
    const password=passwordRef.current.value.trim();
    console.log(email+"   "+password);

    const response=await fetch("http://localhost:8080/api/login",{
      method:"POST",
      headers: { 'Content-Type': 'application/json' },
      body:JSON.stringify({
        email,
        password
      })
    })

    const data=await response.json();

    if(data.success){
      if(data.message==="new user created"){
        setUser_id(data.user_id);
        setIsLogin((prev)=>!prev);
      }
      else if(data.message==="user exist"){
        console.log(data.todos);
        setUser_id(data.user_id);
        setTodoList(data.todos);
        setIsLogin((prev)=>!prev);
      }
    }else{
      alert(data.message);
    }
    
  }
    
    return (
      <div className='bg-white place-self-center rounded-xl w-11/12 max-w-md h-[550px] p-7 flex flex-col mt-10'>
        <div className='flex items-center justify-center my-8'>
            <h1 className='font-sans text-2xl'>Login</h1>
        </div>
        <div className='flex flex-col my-3'>
            <h2>email address</h2>
            <input ref={emailRef} className='bg-slate-200 rounded-md border-0 h-[50px] outline-none' type='text' placeholder=' email address'></input>
        </div>
        <div className='flex flex-col mt-2'>
            <h2>password</h2>
            <input ref={passwordRef} className='bg-slate-200 rounded-md border-0 h-[50px] outline-none' type='text' placeholder=' password'></input>
        </div>
        <div onClick={login} className='flex items-center justify-center mt-6 cursor-pointer bg-blue-500 rounded-md h-[50px]'>
          <button className='text-white'>Login</button>
        </div>
        
      </div>
    )
        
}

export default LoginHandle;