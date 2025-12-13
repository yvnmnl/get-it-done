export default function FilterButtons({ filter, setFilter }) {
  const base =
    "px-4 py-2 rounded font-medium transition border border-[#E5E5E4]";

  const active =
    "bg-[#668962] text-black border-[#405845]";
  const inactive =
    "bg-white text-[#6F6049] hover:bg-[#B7CDB5]";

  return (
    <div className="flex gap-3 justify-center">
      <button
        className={`${base} ${filter === "uncomplete" ? active : inactive}`}
        onClick={() => setFilter("uncomplete")}
      >
        To Do
      </button>
      
      <button
        className={`${base} ${filter === "completed" ? active : inactive}`}
        onClick={() => setFilter("completed")}
      >
        Completed
      </button>

      <button
        className={`${base} ${filter === "all" ? active : inactive}`}
        onClick={() => setFilter("all")}
      >
        All
      </button>
    </div>
  );
}
