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
    if (!loading && !user) {
      router.push("/login");
    }
  }, [loading, user, router]);

  async function loadTasks() {
    if (!user) return;

    const res = await fetch(`/api/tasks?userId=${user.uid}`);
    const data = await res.json();
    setTasks(data);
  }

  useEffect(() => {
    if (user) loadTasks();
  }, [user]);

  async function addTask(text) {
    if (!user) return;
    await fetch("/api/tasks", {
      method: "POST",
      body: JSON.stringify({ text, userId: user.uid }),
    });
    loadTasks();
  }

  async function toggleTask(id, currentState) {
    if (!user) return;
    await fetch(`/api/tasks/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ completed: !currentState }),
    });
    loadTasks();
  }

  async function deleteTask(id) {
    if (!user) return;
    await fetch(`/api/tasks/${id}`, { method: "DELETE" });
    loadTasks();
  }

  const filtered = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  });

  if (loading) {
    return <p className="text-center py-6">Loading...</p>;
  }

  if (!user) {
    return null;
  }

  return (
    <main className="min-h-screen flex justify-center p-6 bg-[#F4F4F4]">
      <div className="bg-white p-8 rounded-xl shadow-md max-w-2xl w-full">
        
        <h1 className="text-3xl font-bold text-[#405845] mb-2">Your Tasks</h1>

        <p className="text-[#6F6049] mb-6">
          Welcome back,{" "}
          <span className="font-semibold text-[#1E1E1E]">
            {user.displayName || user.email}
          </span>
        </p>

        <div className="mb-6">
          <AddTaskForm addTask={addTask} />
        </div>

        <div className="mb-6">
          <FilterButtons filter={filter} setFilter={setFilter} />
        </div>

        <div className="bg-[#F9F9F8] p-4 rounded-lg border border-[#E5E5E4]">
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