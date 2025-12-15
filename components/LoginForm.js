"use client";

import { useState } from "react";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/utils/firebase";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetMessage, setResetMessage] = useState("");
  const [resetError, setResetError] = useState("");

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

  async function handlePasswordReset(e) {
    e.preventDefault();
    setResetError("");
    setResetMessage("");
    
    try {
      await sendPasswordResetEmail(auth, resetEmail);
      setResetMessage("Password reset email sent! Check your inbox.");
      setTimeout(() => {
        setShowForgotPassword(false);
        setResetEmail("");
        setResetMessage("");
      }, 3000);
    } catch (err) {
      setResetError(err.message);
    }
  }

  return (
    <>
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

            <div className="text-right">
              <button
                type="button"         
                onClick={() => setShowForgotPassword(true)}
                className="text-sm text-[#405845] hover:underline"
              >
                Forgot Password?
              </button>   
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
      
      {showForgotPassword && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
            <h3 className="text-2xl font-bold text-[#405845] mb-4">
              Reset Password
            </h3>
            <p className="text-[#6F6049] mb-4">
              Enter your email address and we'll send you a link to reset your password.
            </p>
            
            {resetMessage && (
              <p className="text-green-600 text-sm mb-4 text-center">{resetMessage}</p>
            )}
            {resetError && (
              <p className="text-red-600 text-sm mb-4 text-center">{resetError}</p>
            )}
            
            <form onSubmit={handlePasswordReset} className="space-y-4">
              <div>
                <label className="block text-[#6F6049] mb-1 font-semibold">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full border p-2 rounded text-[#1E1E1E]"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  required
                />
              </div>
              
              <div className="flex gap-3">
                <button
                  type="submit"
                  className="flex-1 py-2 bg-[#668962] text-white rounded hover:bg-[#405845] transition"
                >
                  Send Reset Link
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForgotPassword(false);
                    setResetEmail("");
                    setResetError("");
                    setResetMessage("");
                  }}
                  className="flex-1 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}