import React from "react";

const LoginHandle=()=>{
    
    
    return (
      <div className='bg-white place-self-center rounded-xl w-11/12 max-w-md h-[550px] p-7 flex flex-col mt-10'>
        <div className='flex items-center my-8 justify-center'>
            <h1 className='font-sans text-2xl'>Sign up</h1> 
        </div>
        <div className='flex flex-col my-3'>
            <h2>email address</h2>
            <input className='bg-slate-200 rounded-md border-0 h-[37px] outline-none' type='text' placeholder=' email address'></input>
        </div>
        <div className='flex flex-col my-2'>
            <h2>password</h2>
            <input className='bg-slate-200 rounded-md border-0 h-[37px] outline-none' type='text' placeholder=' password'></input>
        </div>
        <div className='flex flex-col mt-2'>
            <h2>re-enter password</h2>
            <input className='bg-slate-200 rounded-md border-0 h-[37px] outline-none' type='text' placeholder=' re-enter password'></input>
        </div>
        <div className='flex justify-center mt-6 cursor-pointer bg-blue-500 rounded-md h-[37px]'>
          <button className='text-white'>Sign up</button>
        </div>
      </div>
    )
        
}

export default LoginHandle;