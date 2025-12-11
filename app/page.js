export default function HomePage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-[#E5E5E4] p-6">
      <div className="bg-white p-8 rounded-lg shadow max-w-lg text-center">
        <h1 className="text-4xl font-bold mb-4 text-[#405845]"> GetItDone </h1>
        <p className="text-gray-600 text-lg mb-6">
          A simple task management website.<br />  
          Create an account or log in to start managing your tasks.
        </p>

        <div className="flex justify-center gap-4">
          <a href="/login"
            className="px-4 py-2 bg-[#D0C6B9] text-black rounded hover:bg-[#AC9B83]"
          >
            Login
          </a>

          <a href="/register"
            className="px-4 py-2 bg-[#8BA888] text-black rounded hover:bg-[#668962]"
          >
            Register
          </a>
        </div>
      </div>
    </main>
  );
}
