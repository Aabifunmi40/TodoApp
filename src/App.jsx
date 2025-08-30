import React, { useState } from "react";
import Header from "./static/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Taskform from "./pages/Taskform";
import TaskList from "./pages/Tasklist";   // ✅ added import
import SignIn from "./pages/SignIn";       // ✅ consistent casing

const App = () => {
  const [tasks, setTasks] = useState([]);

  // Add task
  const addTask = (task) => {
    setTasks([...tasks, task]);
  };

  // Delete task
  const deleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Taskform addTask={addTask} />} />
          <Route
            path="/tasklist"
            element={<TaskList tasks={tasks} deleteTask={deleteTask} />}
          />
          <Route path="/signin" element={<SignIn />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
