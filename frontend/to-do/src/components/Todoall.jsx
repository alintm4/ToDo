import React, { useEffect, useState } from "react";
import Todoform from "./Todoform";
import Todo from "./Todo";
import { v4 as uuidv4 } from "uuid";
import EditTodoForm from "./EditTodoForm";

function Todoall() {
  const [todos, setTodo] = useState([]);

  useEffect(() => {
    const todo_fetch = async () => {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "https://to-do-list-tor6.onrender.com/todos",
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            "x-auth-token": token,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log("Fetched todos:", data);
        const formattedData = data.map((todo) => ({
          id: todo._id,
          tasks: todo.todo_task,
          isEditing: false,
          completed: false,
        }));
        setTodo(formattedData);
      } else {
        console.log("Error fetching data");
      }
    };
    todo_fetch();
  }, []);
  const item = (todo) => {
    if (todo.trim()) {
      setTodo([
        ...todos,
        { id: uuidv4(), tasks: todo, isEditing: false, completed: false },
      ]);
    } else {
      window.alert("task cannot be empty");
    }
  };

  const taskCompleted = (id) => {
    setTodo(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTask = async (id) => {
    setTodo(todos.filter((todo) => todo.id !== id));
    const token = localStorage.getItem("token");
    const response = await fetch(
      `https://to-do-list-tor6.onrender.com/todos/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
          "x-auth-token": token,
        },
      }
    );
    if (response.ok) {
      setTodo(todos.filter((todo) => todo.id !== id));
    }
  };
  const editTask = (id) => {
    setTodo(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
      )
    );
  };
  const editTasks = (tasks, id) => {
    setTodo(
      todos.map((todo) =>
        todo.id === id ? { ...todo, tasks, isEditing: !todo.isEditing } : todo
      )
    );
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="max-w-lg w-full p-6 rounded-lg shadow-lg bg-white">
        <Todoform item={item} />
        <div className="mt-6 space-y-4">
          {todos.map((todo) =>
            todo.isEditing ? (
              <EditTodoForm key={todo.id} editTask={editTasks} tasks={todo} />
            ) : (
              <Todo
                key={todo.id}
                tasks={todo}
                deleteTask={deleteTask}
                editTask={editTask}
                taskCompleted={taskCompleted}
              />
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default Todoall;
