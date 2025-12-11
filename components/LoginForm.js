"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/utils/firebase";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <main className="flex items-center justify-center p-6">
      <div className="bg-white p-12 rounded-lg shadow w-[500px] max-w-2xl">
        
        <h2 className="text-3xl font-bold mb-4 text-center text-[#405845]">
          Welcome Back
        </h2>

        <p className="text-[#1E1E1E] text-center mb-6 text-lg">
          Log in to continue using GetItDone.
        </p>

        {error && (
          <p className="text-red-600 text-sm mb-4 text-center">{error}</p>
        )}

        <form onSubmit={handleLogin} className="space-y-4">

          <div>
            <label className="block text-[#6F6049] mb-1 font-semibold">
              Email
            </label>
            <input
              type="email"
              className="w-full border p-2 rounded text-[#1E1E1E]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-[#6F6049] mb-1 font-semibold">
              Password
            </label>
            <input
              type="password"
              className="w-full border p-2 rounded text-[#4D3E29]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button className="w-full py-2 bg-[#D0C6B9] text-black rounded hover:bg-[#AC9B83] transition">
            Login
          </button>

          <p className="text-center text-sm mt-2 text-[#1E1E1E]">
            Don’t have an account?{" "}
            <a href="/register" className="text-[#405845] font-semibold hover:underline">
              Register
            </a>
          </p>
        </form>
      </div>
    </main>
  );
}
 