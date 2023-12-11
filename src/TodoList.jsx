import { useState, useEffect } from "react";
import TodoItem from "./TodoItem";

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    console.log("Saving");
    try {
      localStorage.setItem("tasks", JSON.stringify(tasks));
      console.log("Tasks saved successfully");
    } catch (error) {
      console.error("Error saving tasks to localStorage:", error);
    }
    console.log(tasks);
  }, [tasks]);

  useEffect(() => {
    console.log("Loading");
    try {
      const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
      console.log("Loaded tasks:", storedTasks);
      setTasks(storedTasks);
      console.log(storedTasks);
    } catch (error) {
      console.error("Error loading tasks from localStorage:", error);
    }
  }, []);

  const addTask = (title, task, status) => {
    const newTask = {
      id: Date.now(),
      title: title || "Untitled Task",
      task: task || "No description",
      status: status || "Not Started",
    };

    setTasks([...tasks, newTask]);
  };

  const updateTask = (id, newTitle, newTask, newStatus) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, title: newTitle, task: newTask, status: newStatus }
          : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const title = e.target.title.value;
          const task = e.target.task.value;
          const status = e.target.status.value;
          addTask(title, task, status);
          e.target.reset();
        }}
        className="form-container"
      >
        <table className="w-full border-black rounded">
          <thead>
            <tr>
              <th className="border p-2">Title</th>
              <th className="border p-2">Task</th>
              <th className="border p-2">Status</th>
              <th className="border p-2"></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border p-2">
                <input
                  type="text"
                  name="title"
                  required
                  className="w-full border rounded p-1"
                />
              </td>
              <td className="border p-2">
                <input
                  type="text"
                  name="task"
                  required
                  className="w-full border rounded p-1"
                />
              </td>
              <td className="border p-2">
                <select name="status" className="w-full border rounded p-1">
                  <option value="Not Started">Not Started</option>
                  <option value="Ongoing">Ongoing</option>
                  <option value="Complete">Complete</option>
                </select>
              </td>
              <td className="border p-2">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-2 py-1 rounded"
                >
                  Add Task
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>

      <table className="w-full border rounded">
        <thead>
          <tr>
            <th className="border p-2">Title</th>
            <th className="border p-2">Task</th>
            <th className="border p-2">Status</th>
            <th className="border p-2"></th>
          </tr>
        </thead>
        <tbody>
          {tasks
            .slice()
            .reverse()
            .map((task) => (
              <TodoItem
                key={task.id}
                task={task}
                updateTask={updateTask}
                deleteTask={deleteTask}
              />
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default TodoList;
