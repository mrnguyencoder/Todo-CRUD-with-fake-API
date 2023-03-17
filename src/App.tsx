import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";

interface Todo {
  id: number;
  title: string;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    axios
      .get<Todo[]>("https://jsonplaceholder.typicode.com/todos", {
        signal: controller.signal,
      })
      .then((res) => setTodos(res.data))
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
      });

    return () => controller.abort();
  }, []);

  const deleteTodo = (todo: Todo) => {
    const originalTodos = [...todo];
    setTodos(todos.filter((t) => t.id !== todo.id));

    axios
      .delete("https://jsonplaceholder.typicode.com/todos" + todo.id)
      .catch((err) => {
        setError(err.message);
        setTodos(originalTodos);
      });
  };

  const addTodo = () => {
    const originalTodos = [...todos];
    const newTodo = { id: 0, title: "my new todo" };
    setTodos([newTodo, ...todos]);

    axios
      .post("https://jsonplaceholder.typicode.com/todos", newTodo)
      .then((res) => setTodos([res.data, ...todos]))
      .catch(err => {
        setError(err.message);
        setTodos(originalTodos);
      });
  };

  return (
    <div className="p-4 flex flex-col">
      <h1 className="py-10 text-2xl text-center text-slate-800">
        Todo App Fetching with API
      </h1>
      {error && <p className="text-red-600 py-5">{error}</p>}
      <button
        className="border px-4 py-1 rounded-2xl bg-indigo-500 justify-end my-4 text-slate-50"
        onClick={addTodo}
      >
        Create new Todo +{" "}
      </button>
      <ul className="">
        {todos.map((todo) => (
          <li key={todo.id} className="flex justify-between space-y-2">
            <div className="max-w-[15rem] md:w-full text-lg text-slate-700">
              {todo.title}
            </div>
            <div className="">
              <button className="border px-4 py-1 rounded-full bg-blue-400 mr-2 hover:opacity-80">
                Update
              </button>
              <button
                className="border px-4 py-1 rounded-full bg-yellow-300 hover:opacity-80"
                onClick={() => deleteTodo(todo)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
