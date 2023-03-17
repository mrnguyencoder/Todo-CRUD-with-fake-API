import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";

interface Todo {
  id: number;
  title: string;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    axios
      .get<Todo[]>("https://jsonplaceholder.typicode.com/todos")
      .then((res) => setTodos(res.data));
  }, []);

  return (
    <>
      <h1 className="py-10 text-lg">Todo App Fetching with API</h1>
      <ul className="">
        {todos.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </>
  );
}

export default App;
