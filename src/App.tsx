import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";

interface Todo {
  id: number;
  title: string;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    axios
      .get<Todo[]>("https://jsonplaceholder.typicode.com/gtodos")
      .then((res) => setTodos(res.data))
      .catch(err => setError(err.message) );
       
  }, []);

  return (
    <div className="p-4">
      <h1 className="py-10 text-lg text-center">Todo App Fetching with API</h1>
      {error && <p className="text-red-600 py-5">{error}</p>}
      <ul className="">
        {todos.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
