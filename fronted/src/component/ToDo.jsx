import React from "react";
import {useState,useRef,useEffect} from "react";
import todo_icon from '../assets/list.png'
import ToDoitems from './ToDoitems';

const ToDo=({todoList,setTodoList,user_id})=>{
    
    const todoRef=useRef();

    async function Add(){
        const todoText=todoRef.current.value.trim();
        
        if(todoText===""){
            alert("Input feild can't be empty");
            return ;
        }

        // const newToDo={
        //     id:Date.now(),
        //     title:todoText,
        //     status:false
        // }
        
        const title=todoText;
        const status=false;

         

        const response=await fetch("http://localhost:8080/api/createTodo",{
            method:"POST",
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
                user_id,
                title,
                status
            })
        })

        const data=await response.json();
        
        const newToDo={
            id:data.id,
            user_id:user_id,
            title:title,
            status:false
        }
        
        if(data.success){
            todoRef.current.value="";
            setTodoList((prev)=>[...prev,newToDo]);
            console.log("successfully todo created");
        }else{
            alert("Error while create todo");
        }
        
    }
    
    async function deleteTodo(id){

        const response=await fetch("http://localhost:8080/api/deleteTodo",{
            method:"DELETE",
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({id})
        })

        const result=await response.json();
        if(result.success){
            setTodoList((prevTodos)=>{
                return prevTodos.filter((todo)=> todo.id!==id);
            })
        }else{
            alert("There is some problem with deletion of todo");
        }
        
    }

    async function toggle(id){

        const todoItem=todoList.find((todo)=>todo.id===id);
        const prevStatus=todoItem.status;

        console.log("prev status"+prevStatus);
        const status=!prevStatus;

        const response=await fetch("http://localhost:8080/api/updateStatus",{
            method:"PUT",
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
                id,
                status
            })
        })

        const result=await response.json();

        if(result.success){
            setTodoList((prevTodos)=>{
                return prevTodos.map((todo)=>{
                    if(todo.id===id){
                        return {...todo,status:!todo.status};
                    }
                    return todo;
                }
                )
            })
        }else{
            alert("Error while changing status");
        }
    }

    useEffect(()=>{
        console.log(todoList);
    },[todoList])

    return (
        <div className='bg-white place-self-center rounded-xl w-11/12 max-w-md min-h-[550px] max-h-[550px] overflow-auto p-7 flex flex-col mt-10'>
            
            {/*-------titile--------*/}

            <div className='flex items-center gap-2 mt-7'>
                <img className='w-8' src={todo_icon}></img>
                <h1 className='text-3xl font-semibold'>To-Do List</h1>
            </div>

            {/*-------input box--------*/}
            
            <div className='my-7 flex items-center bg-gray-200 rounded-full'>
                <input ref={todoRef} className='bg-transparent border-0 outline-none h-14 pl-6 pr-2 placeholder:text-slate-600' type='text' placeholder='Create a new todo'></input>
                <button onClick={Add} className='w-32 h-14 text-white text-lg font-medium cursor-ponter border-none bg-green-600 rounded-full ml-14' >ADD +</button>
            </div>

            {/*------ToDo list--------*/}

            <div>
                {todoList.map((todo,index)=>{
                    return <ToDoitems key={index} title={todo.title} id={todo.id} status={todo.status} deleteTodo={deleteTodo} toggle={toggle}/>
                })}
            </div>
        </div>
    )
}

export default ToDo;