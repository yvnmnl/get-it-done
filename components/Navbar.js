"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import LogoutButton from "./LogoutButton";

export default function Navbar() {
  const { user } = useAuth();

  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-gray-900 text-white">
      <Link href="/" className="font-bold text-xl">
        GetItDone
      </Link>

      <div className="flex gap-4 text-sm items-center">
        {!user && (
          <>
            <Link href="/login">Login</Link>
            <Link href="/register">Register</Link>
          </>
        )}

        {user && (
          <>
            <Link href="/dashboard">Dashboard</Link>
            <LogoutButton />
          </>
        )}
      </div>
    </nav>
  );
}
