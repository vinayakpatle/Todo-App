import React from "react";
import tick_icon from '../assets/tick.png'
import delete_icon from "../assets/delete.png";
import non_tick_icon from "../assets/non_tick.png";

const ToDoitems=({title,id,status,deleteTodo,toggle})=>{


    return (
        <div className='flex items-center my-3 gap-2'>
            <div onClick={()=>{toggle(id)}} className='flex flex-1 items-center cursor-pointer '>
                <img className='w-5' src={status? tick_icon : non_tick_icon}></img>
                <p className={`ml-4 text-slate-700 text-[17px] decoration-slate-500 ${status? "line-through" : ""}`}>{title}</p>
            </div>

            <img onClick={()=>{deleteTodo(id)}} className='w-6 cursor-pointer' src={delete_icon}></img>

        </div>
    )
}

export default ToDoitems;