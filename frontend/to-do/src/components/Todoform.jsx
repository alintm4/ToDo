import React, { useState } from "react";

function Todoform({ item }) {
  const [dataitem, setDataItem] = useState("");

  const submitfncn = async (e) => {
    e.preventDefault();
    item(dataitem);
    setDataItem("");
    const token = localStorage.getItem("token");

    const response = await fetch("https://to-do-list-tor6.onrender.com/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
      body: JSON.stringify({ todo_task: dataitem }),
    });

    const data = await response.json();
    console.log(data);
  };
  return (
    <form
      onSubmit={submitfncn}
      className="flex flex-col items-center gap-4 bg-gray-100 p-6 rounded-lg shadow-md w-full max-w-md mx-auto"
    >
      <h1 className="text-4xl font-bold text-gray-800 mb-4">
        Manage Your <span className="text-blue-500">Todos</span>
      </h1>
      <div className="flex gap-2 items-center">
        <input
          type="text"
          placeholder="Enter your task..."
          className="p-3 w-72 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={dataitem}
          onChange={(e) => setDataItem(e.target.value)}
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          Add Task
        </button>
      </div>
    </form>
  );
}

export default Todoform;