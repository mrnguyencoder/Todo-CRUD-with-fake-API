import './App.css';
import axios from 'axios';
import {useState, useEffect} from 'react';

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
   axios.get('https://jsonplaceholder.typicode.com/todos')
}, [])

  return (
    <div className="App">
      <h1 className="text-amber-200">Hello</h1>
    </div>
  )
}

export default App
