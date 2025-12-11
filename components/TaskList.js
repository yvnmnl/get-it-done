export default function TaskList({ tasks, toggleTask, deleteTask }) {
  if (tasks.length === 0) {
    return (
      <p className="text-center text-[#6F6049] py-6 italic">
        No tasks yet. Add one above!
      </p>
    );
  }

  return (
    <ul className="space-y-4">
      {tasks.map((task) => (
        <li
          key={task.id}
          className="
            flex items-center justify-between 
            p-4 rounded-xl 
            bg-white 
            border border-[#E5E5E4]
            hover:border-[#AC9B83]
            transition
            shadow-sm
          "
        >
          <div
            className={`
              flex-1
              text-[18px]
              ${
                task.completed
                  ? "line-through text-[#AC9B83]"
                  : "text-[#4D3E29]"
              }
            `}
          >
            {task.text}
          </div>

          <button
            onClick={() => toggleTask(task.id)}
            className={`
              ml-4 px-3 py-1.5 text-sm rounded-lg transition
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
            className="
              ml-3 px-3 py-1.5 
              text-sm rounded-lg 
              bg-[#D0C6B9]
              text-[#4D3E29]
              hover:bg-[#AC9B83]
              hover:text-white
              transition
            "
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}
