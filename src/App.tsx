import './App.css';
import axios from 'axios';
import {useState, useEffect} from 'react';



function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
   axios.get('https://jsonplaceholder.typicode.com/todos')
        .then(res => console.log(res))
}, [])

  return (
    <div className="App">

    </div>
  )
}

export default App
