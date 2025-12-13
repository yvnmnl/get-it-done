"use client";
import { useState } from "react";

export default function TaskItem({ task, toggleTask, deleteTask, editTask }) {

  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);

  function handleEdit () {
    if (editText.trim() && editText !== task.text) {
      editTask(task.id, editText.trim());
    }
    setIsEditing(false);
  }

  function handleCancel() {
    setEditText(task.text);
    setIsEditing(false);
  }
  
  if (isEditing) {
    return (
      <li className="flex items-center gap-2 p-3 bg-white rounded-lg border border-[#8BA888]">
        <input
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleEdit();
            if (e.key === "Escape") handleCancel();
          }}
          className="flex-1 px-2 py-1 border border-[#E5E5E4] rounded focus:outline-none focus:border-[#668962] text-[#4D3E29]"
          autoFocus
        />
        <button
          onClick={handleEdit}
          className="ml-3 px-3 py-1.5 bg-[#668962] text-white rounded hover:bg-[#405845] transition"
        >
          Save
        </button>
        <button
          onClick={handleCancel}
          className="ml-3 px-3 py-1.5 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition"
        >
          Cancel
        </button>
      </li>
    );
  }

  return (
    <li className="flex items-center justify-between p-3 bg-white rounded-lg border border-[#E5E5E4]">
      <span
        className={`
          flex-1 rounded px-2 py-1
          ${task.completed ? "line-through text-[#6F6049]" : "text-[#1E1E1E]"}
        `}
      >
        {task.text}
      </span>
      
      <div className="flex gap-2">
        <button
          onClick={() => setIsEditing(true)}
          className="px-3 py-1.5 bg-blue-100 text-[#4D3E29] rounded text-sm hover:bg-blue-200 transition"
        >
          Edit
        </button>

        <button
          onClick={() => toggleTask(task.id, task.completed)}
          className={`
            ml-3 px-3 py-1.5 rounded text-sm font-medium transition
            ${
              task.completed
                ? "bg-[#8BA888] text-white hover:bg-[#668962]"
                : "bg-[#B7CDB5] text-[#405845] hover:bg-[#8BA888]"
            }
          `}
        >
          {task.completed ? "Completed" : "Complete"}
        </button>

        <button
          onClick={() => deleteTask(task.id)}
          className="ml-4 px-3 py-1 text-sm bg-red-200 text-red-800 rounded hover:bg-red-300 transition"
        >
          Delete
        </button>
      </div>
    </li>
  );
}
