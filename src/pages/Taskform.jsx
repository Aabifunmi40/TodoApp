import React, { useState } from "react";

const TaskForm = ({ addTask }) => {
  const [taskText, setTaskText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskText.trim() === "") return;

    addTask({ title: taskText });
    setTaskText(""); // clear input
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-2 mb-4 justify-center mt-8"
    >
      <textarea
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
        placeholder="Enter a task"
        rows={2} // short height
        className="border rounded p-2 h-12 w-1/2"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      > 
        Add
      </button>
    </form>
  );
};

export default TaskForm;
