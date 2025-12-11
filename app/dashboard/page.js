"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import AddTaskForm from "@/components/AddTaskForm";
import TaskList from "@/components/TaskList";
import FilterButtons from "@/components/FilterButtons";

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    if (!loading && !user) router.push("/login");
  }, [loading, user, router]);

  function addTask(text) {
    setTasks([...tasks, { id: Date.now(), text, completed: false }]);
  }

  function toggleTask(id) {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }

  function deleteTask(id) {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  const filtered = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  });

  return (
    <main className="min-h-screen flex justify-center p-6 bg-[#F4F4F4]">
      <div className="bg-white p-8 rounded-xl shadow-md max-w-2xl w-full border border-[#E5E5E4]">
        
        <h1 className="text-3xl font-bold mb-2 text-[#405845]">
          Your Tasks
        </h1>

        <p className="text-[#6F6049] mb-6">
          Welcome back,{" "}
          <span className="font-semibold text-[#1E1E1E]">
            {user?.displayName || user?.email}
          </span>
        </p>

        <div className="mb-6">
          <AddTaskForm addTask={addTask} />
        </div>

        <div className="mb-6">
          <FilterButtons filter={filter} setFilter={setFilter} />
        </div>

        <div className="bg-[#F9F9F8] rounded-lg p-4 border border-[#E5E5E4]">
          <TaskList
            tasks={filtered}
            toggleTask={toggleTask}
            deleteTask={deleteTask}
          />
        </div>
      </div>
    </main>
  );
}
