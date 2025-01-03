import React from "react";

function Todo({ tasks, deleteTask, editTask, taskCompleted }) {


  return (
    <>
     <div
  className="bg-black w-full text-white text-xl mt-4 rounded-lg p-2"
>
  <div className="flex items-center">
    {/* Task Text */}
    <p
      className={`cursor-pointer flex-1 truncate ${
        tasks.completed
          ? "text-purple-300 line-through"
          : "text-white"
      }`}
      onClick={() => taskCompleted(tasks.id)}
    >
      {tasks.tasks}
    </p>

    {/* Action Buttons */}
    <div className="ml-4 flex items-center gap-2">
      <button
        className="p-1 text-yellow-400 hover:text-yellow-500"
        onClick={() => editTask(tasks.id)}
      >
        ✏️
      </button>
      <button
        className="p-1 text-red-400 hover:text-red-500"
        onClick={() => deleteTask(tasks.id)}
      >
        🗑️
      </button>
    </div>
  </div>
</div>

    </>
  );
}

export default Todo;