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

  const [tasksLoading, setTasksLoading] = useState(true);

  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("uncomplete");

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [loading, user, router]);

  async function loadTasks() {
    if (!user) return;

    setTasksLoading(true);

    const res = await fetch(`/api/tasks?userId=${user.uid}`);
    const data = await res.json();

    setTasks(data);
    setTasksLoading(false);
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
    console.log("TOGGLE CLICKED →", id, currentState);

    const res = await fetch(`/api/tasks/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: !currentState }),
    });

    console.log("PATCH RESPONSE STATUS:", res.status);

    loadTasks();
  }

  async function deleteTask(id) {
    console.log("DELETE CLICKED →", id);

    const res = await fetch(`/api/tasks/${id}`, {
      method: "DELETE",
    });

    console.log("DELETE RESPONSE STATUS:", res.status);

    loadTasks();
  }

  async function editTask(id, newText) {
    console.log("EDIT CLICKED →", id, newText);

    const res = await fetch(`/api/tasks/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: newText }),
    });

    console.log("EDIT RESPONSE STATUS:", res.status);
    
    loadTasks();
  }

  const filtered = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "uncomplete") return !task.completed;
    return true;
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="h-12 w-12 border-4 border-[#668962] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
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
          {tasksLoading ? (
            <div className="animate-spin h-6 w-6 border-4 border-[#668962] border-t-transparent rounded-full"></div>
          ) : (
            <TaskList
              tasks={filtered}
              toggleTask={toggleTask}
              deleteTask={deleteTask}
              editTask={editTask}
            />
          )}
        </div>
      </div>
    </main>
  );
}