"use client";

import { signOut } from "firebase/auth";
import { auth } from "@/utils/firebase";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await signOut(auth);
    router.push("/");
  }

  return (
    <button onClick={handleLogout} className="px-4 py-2 bg-[#6F6049] font-semibold text-black rounded hover:bg-[#AC9B83]">
      Logout
    </button>
  );
}
