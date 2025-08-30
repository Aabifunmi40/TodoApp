import React from "react";

const TaskList = ({ tasks, deleteTask }) => {
  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-green-600">Task List</h2>
      {tasks.length === 0 ? (
        <p className="text-gray-500">No tasks yet...</p>
      ) : (
        tasks.map((task, index) => (
          <div
            key={index}
            className="flex justify-between items-center border p-2 rounded mb-2"
          >
            <span className="text-blue-600 font-medium">{task.title}</span>
            <button
              onClick={() => deleteTask(index)}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default TaskList;
