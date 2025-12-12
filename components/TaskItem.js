"use client";

export default function TaskItem({ task, toggleTask, deleteTask }) {
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
    </li>
  );
}
