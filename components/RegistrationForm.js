"use client";

import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "@/utils/firebase";
import { useRouter } from "next/navigation";

export default function RegistrationForm() {
  const router = useRouter();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleRegister(e) {
    e.preventDefault();
    setError("");

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await updateProfile(userCredential.user, {
        displayName: `${firstName} ${lastName}`,
      });

      router.push("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <main className="flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-lg shadow max-w-lg w-full">
        <h2 className="text-3xl font-bold mb-4 text-center text-[#405845]">
          Create an Account
        </h2>

        <p className="text-[#1E1E1E] text-center mb-6 text-lg">
          Enter your information to start using GetItDone.
        </p>

        {error && (
          <p className="text-red-600 text-sm mb-4 text-center">{error}</p>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="w-full sm:w-1/2">
              <label className="block text-[#6F6049] mb-1 font-semibold"> First Name </label>
              <input
                type="text"
                className="w-full border p-2 rounded text-[#1E1E1E]"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>

            <div className="w-full sm:w-1/2">
              <label className="block text-[#6F6049] mb-1 font-semibold"> Last Name </label>
              <input
                type="text"
                className="w-full border p-2 rounded text-[#1E1E1E]"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-[#6F6049] mb-1 font-semibold"> Email </label>
            <input
              type="email"
              className="w-full border p-2 rounded text-[#1E1E1E]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>


          <div>
            <label className="block text-[#6F6049] mb-1 font-semibold"> Password </label>
            <input
              type="password"
              className="w-full border p-2 rounded text-[#4D3E29]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            className="w-full py-2 bg-[#D0C6B9] text-black rounded hover:bg-[#AC9B83] transition"
          >
            Register
          </button>

          <p className="text-center text-sm mt-2 text-[#1E1E1E]">
            Already have an account?{" "}
            <a href="/login" className="text-[#405845] font-semibold hover:underline">
              Login
            </a>
          </p>
        </form>
      </div>
    </main>
  );
}
