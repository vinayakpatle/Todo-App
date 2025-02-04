import { useState} from 'react';
import ToDo from "./component/ToDo";
import Login from "./component/LoginHandle";
import './App.css'


function App() {
  const [isLogin,setIsLogin]=useState(false);
  const [todoList,setTodoList]=useState([]);
  const [user_id,setUser_id]=useState(0);

  return (
    <div className='min-h-screen bg-gradient-to-b from-purple-700 to-blue-900 py-4'>
      {isLogin? <ToDo user_id={user_id} todoList={todoList} setTodoList={setTodoList}/> : <Login setUser_id={setUser_id} setIsLogin={setIsLogin} setTodoList={setTodoList}/>}
    </div>
  )
}

export default App
