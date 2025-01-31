import { useState} from 'react';
import ToDo from "./component/ToDo";
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='h-screen bg-gradient-to-b from-purple-700 to-blue-900 py-4'>
      <ToDo/>
    </div>
  )
}

export default App
