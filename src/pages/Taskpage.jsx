import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "https://backend-todoapp-4.onrender.com/api/tasks";

const TaskPage = () => {
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState("");
  const [loading, setLoading] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");

  // Fetch all tasks
  const fetchTasks = async () => {
    try {
      const res = await axios.get(`${API_URL}/getTask`);
      setTasks(res.data);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  };

  // Add new task
  const addTask = async (e) => {
    e.preventDefault();
    if (!taskText.trim()) return;

    try {
      setLoading(true);
      const res = await axios.post(`${API_URL}/create`, { title: taskText });
      setTasks([...tasks, res.data]);
      setTaskText("");
    } catch (err) {
      console.error("Error adding task:", err);
    } finally {
      setLoading(false);
    }
  };

  // Delete task
  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API_URL}/deletetask/${id}`);
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  // Toggle task completion
  const toggleTask = async (id, completed) => {
    try {
      const res = await axios.put(`${API_URL}/updatetask/${id}`, {
        completed: !completed,
      });
      setTasks(tasks.map((task) => (task._id === id ? res.data : task)));
    } catch (err) {
      console.error("Error updating task:", err);
    }
  };

  // Start editing
  const startEdit = (task) => {
    setEditId(task._id);
    setEditText(task.title);
  };

  // Save edit
  const saveEdit = async (id) => {
    if (!editText.trim()) return;

    try {
      const res = await axios.put(`${API_URL}/updatetask/${id}`, {
        title: editText,
      });
      setTasks(tasks.map((task) => (task._id === id ? res.data : task)));
      setEditId(null);
      setEditText("");
    } catch (err) {
      console.error("Error editing task:", err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="min-h-screen bg-blue-200 p-6 flex flex-col items-center">
      {/* Header */}
      <header className="w-full max-w-2xl flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-black">📝 Todo App</h1>
      </header>

      {/* Task Form */}
      <form
        onSubmit={addTask}
        className="w-full max-w-2xl flex gap-2 mb-6 justify-center"
      >
        <input
          type="text"
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
          placeholder="Enter a task"
          className="flex-1 border rounded px-3 py-2"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? "Adding..." : "Add"}
        </button>
      </form>

      {/* Task List */}
      <div className="w-full max-w-2xl bg-white shadow rounded p-4">
        {tasks.length === 0 ? (
          <p className="text-gray-500 text-center">No tasks yet.</p>
        ) : (
          tasks.map((task) => (
            <div
              key={task._id}
              className="flex justify-between items-center border-b py-2"
            >
              {editId === task._id ? (
                <>
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className="flex-1 border rounded px-2 py-1 mr-2"
                  />
                  <button
                    onClick={() => saveEdit(task._id)}
                    className="px-3 py-1 rounded bg-blue-500 text-white hover:bg-blue-600"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditId(null)}
                    className="px-3 py-1 rounded bg-gray-400 text-white hover:bg-gray-500 ml-2"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <span
                    className={`flex-1 ${
                      task.completed ? "line-through text-gray-500" : ""
                    }`}
                  >
                    {task.title}
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => toggleTask(task._id, task.completed)}
                      className="px-3 py-1 rounded bg-green-500 text-white hover:bg-green-600"
                    >
                      {task.completed ? "Undo" : "Done"}
                    </button>
                    <button
                      onClick={() => startEdit(task)}
                      className="px-3 py-1 rounded bg-yellow-500 text-white hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteTask(task._id)}
                      className="px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TaskPage;
