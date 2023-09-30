import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const getLocalItems = () => {
    let tasks = localStorage.getItem("tasks");

    if (tasks) return JSON.parse(tasks);
    else return [];
  };

  const [tasks, setTasks] = useState(getLocalItems());

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    const inputElement = document.getElementById("taskIp");
    const taskText = inputElement.value;

    if (taskText.trim() === "") return;

    const newTask = {
      text: taskText,
      id: new Date().getTime(),
      completed: false,
    };

    setTasks([...tasks, newTask]);
    inputElement.value = "";
  };

  const toggleTask = (taskId) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, completed: true };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  return (
    <div>
      <h1>MY TO-DO LIST</h1>
      <div className="container" id="container">
        <div className="inputContainer">
          <input
            type="text"
            id="taskIp"
            placeholder="Enter Task"
            onKeyDown={(e) => {
              if (e.key === "Enter") addTask();
            }}
          />
          <button type="button" id="add" className="btn" onClick={addTask}>
            ADD
          </button>
        </div>
        <div className="task-container">
          {tasks.map((task) => (
            <>
              <div key={task.id} className="taskbox">
                <input
                  type="checkbox"
                  onClick={() => toggleTask(task.id)}
                  disabled={task.completed}
                />
                <div
                  className={`task ${task.completed ? "checked" : ""}`}
                  style={{
                    textDecoration: task.completed ? "line-through" : "none",
                  }}
                >
                  {task.text}
                </div>
                <button
                  className="btn"
                  id="deleteBtn"
                  type="button"
                  onClick={() => deleteTask(task.id)}
                >
                  x
                </button>
              </div>
              <hr></hr>
            </>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
