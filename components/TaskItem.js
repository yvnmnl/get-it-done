"use client";

export default function TaskItem({ task, toggleTask, deleteTask }) {
  return (
    <li className="flex items-center justify-between p-3 bg-white rounded-lg border border-[#E5E5E4]">
      <button
        onClick={() => toggleTask(task.id)}
        className={`flex-1 text-left cursor-pointer rounded px-2 py-1 transition
          ${task.completed ? "line-through text-[#6F6049]" : "text-[#1E1E1E]"}
          hover:bg-[#E5E5E4]
        `}
      >
        {task.text}
      </button>

      <button
        onClick={() => deleteTask(task.id)}
        className="ml-4 px-3 py-1 text-sm bg-red-200 text-red-800 rounded hover:bg-red-300 transition"
      >
        Delete
      </button>
    </li>
  );
}
