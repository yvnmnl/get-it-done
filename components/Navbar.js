"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import LogoutButton from "./LogoutButton";

export default function Navbar() {
  const { user } = useAuth();

  {console.log("NAVBAR USER:", user)}


  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-[#668962] text-[#1E1E1E]">
      <Link href="/" className="font-bold text-3xl">
        GetItDone
      </Link>

      <div className="flex gap-4 items-center">
        {!user && (
          <>
            <Link href="/login">Login</Link>
            <Link href="/register">Register</Link>
          </>
        )}

        {user && (
          <>
            <Link href="/dashboard" className = "font-semibold">Dashboard</Link>
            <LogoutButton />
          </>
        )}
      </div>
    </nav>
  );
}
