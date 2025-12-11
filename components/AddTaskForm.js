"use client";

import { useState } from "react";

export default function AddTaskForm({ addTask }) {
  const [text, setText] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!text.trim()) return;
    addTask(text.trim());
    setText("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-3 items-center bg-white p-4 rounded-lg border border-[#E5E5E4]"
    >
      <input
        type="text"
        placeholder="Add a new task..."
        className="flex-1 p-2 border rounded text-[#1E1E1E] focus:outline-none focus:ring-2 focus:ring-[#405845]"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button
        type="submit"
        className="px-4 py-2 bg-[#8BA888] rounded text-black font-semibold hover:bg-[#668962] transition"
      >
        Add
      </button>
    </form>
  );
}
