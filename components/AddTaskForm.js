"use client";

import { useState } from "react";

export default function AddTaskForm({ addTask }) {
  const [text, setText] = useState("");
  const [notes, setNotes] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!text.trim()) return;
    addTask(text.trim(), notes.trim());
    setText("");
    setNotes("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded-lg border border-[#E5E5E4] flex flex-wrap gap-3 items-center"
    >
      <input
        type="text"
        placeholder="Add a new task..."
        className="flex-1 min-w-[200px] p-2 border rounded text-[#1E1E1E] focus:outline-none focus:ring-2 focus:ring-[#405845]"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <textarea
        placeholder="Add notes (optional)..."
        className="flex-1 min-w-[200px] p-2 border rounded text-[#1E1E1E] focus:outline-none focus:ring-2 focus:ring-[#405845] resize-none"
        rows="1"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />

      <button
        type="submit"
        className="px-4 py-2 bg-[#8BA888] rounded text-black font-semibold hover:bg-[#668962] transition whitespace-nowrap"
      >
        Add
      </button>
    </form>
  );
}
