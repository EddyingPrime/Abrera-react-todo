import { useState } from "react";

const TodoItem = ({ task, updateTask, deleteTask }) => {
  const [isEditing, setEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(task.title);
  const [newTask, setNewTask] = useState(task.task);
  const [newStatus, setNewStatus] = useState(task.status);

  const handleUpdate = () => {
    updateTask(task.id, newTitle, newTask, newStatus);
    setEditing(false);
  };

  return (
    <tr className="border">
      <td className="p-2">
        {isEditing ? (
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="border rounded p-1 w-full"
          />
        ) : (
          <h3 className="text-lg font-bold">{task.title}</h3>
        )}
      </td>
      <td className="p-2">
        {isEditing ? (
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            className="border rounded p-1 w-full"
          />
        ) : (
          <p>{task.task}</p>
        )}
      </td>
      <td className="p-2">
        {isEditing ? (
          <select
            value={newStatus}
            onChange={(e) => setNewStatus(e.target.value)}
            className="border rounded p-1 w-full"
          >
            <option value="Not Started">Not Started</option>
            <option value="Ongoing">Ongoing</option>
            <option value="Complete">Complete</option>
          </select>
        ) : (
          <p className="text-gray-600">Status: {task.status}</p>
        )}
      </td>
      <td className="p-2">
        {isEditing ? (
          <button
            onClick={handleUpdate}
            className="bg-blue-600 text-white px-2 py-1 rounded"
          >
            Update
          </button>
        ) : (
          <>
            <button
              onClick={() => setEditing(true)}
              className="bg-green-600 text-white px-2 py-1 rounded mr-2"
            >
              Edit
            </button>
            <button
              onClick={() => deleteTask(task.id)}
              className="bg-red-600 text-white px-2 py-1 rounded"
            >
              Delete
            </button>
          </>
        )}
      </td>
    </tr>
  );
};

export default TodoItem;
