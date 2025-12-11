"use client";

import "./globals.css";
import { Quicksand } from "next/font/google";
import { AuthProvider } from "@/context/AuthContext";
import ClientProvider from "@/components/ClientProvider";
import Navbar from "@/components/Navbar";

const quicksand = Quicksand({
  subsets: ["latin"],
  variable: "--font-quicksand",
  weight: ["300", "400", "500", "600", "700"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={quicksand.variable}>
      <body className="font-quicksand">

        <AuthProvider>
          <ClientProvider>
            <Navbar />
            {children}
          </ClientProvider>
        </AuthProvider>

      </body>
    </html>
  );
}
