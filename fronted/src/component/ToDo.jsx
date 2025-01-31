import React from "react";
import {useState,useRef,useEffect} from "react";
import todo_icon from '../assets/list.png'
import ToDoitems from './ToDoitems';

const ToDo=()=>{
    const [todoList,setTodoList]=useState([]);
    const inputRef=useRef();

    const Add=()=>{
        const inputText=inputRef.current.value.trim();
        
        if(inputText===""){
            alert("Input feild can't be empty");
            return ;
        }

        const newToDo={
            id:Date.now(),
            title:inputText,
            status:false
        }

        setTodoList((prev)=>[...prev,newToDo]);
        inputRef.current.value="";
    }
    
    const deleteTodo=(id)=>{
        setTodoList((prevTodos)=>{
            return prevTodos.filter((todo)=> todo.id!==id);
        })
    }

    const toggle=(id)=>{
        setTodoList((prevTodos)=>{
            return prevTodos.map((todo)=>{
                if(todo.id===id){
                    return {...todo,status:!todo.status};
                }
                return todo;
            }
            )
        })
    }

    useEffect(()=>{
        console.log(todoList);
    },[todoList])

    return (
        <div className='bg-white place-self-center rounded-xl w-11/12 max-w-md h-[550px] p-7 flex flex-col mt-10'>
            
            {/*-------titile--------*/}

            <div className='flex items-center gap-2 mt-7'>
                <img className='w-8' src={todo_icon}></img>
                <h1 className='text-3xl font-semibold'>To-Do List</h1>
            </div>

            {/*-------input box--------*/}
            
            <div className='my-7 flex items-center bg-gray-200 rounded-full'>
                <input ref={inputRef} className='bg-transparent border-0 outline-none h-14 pl-6 pr-2 placeholder:text-slate-600' type='text' placeholder='Create a new todo'></input>
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