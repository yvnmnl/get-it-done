import "./globals.css";
import ClientProvider from "@/components/ClientProvider";
import { Quicksand } from "next/font/google";
import Navbar from "@/components/Navbar";

const quicksand = Quicksand({
  subsets: ["latin"],
  variable: "--font-quicksand",
  weight: ["300", "400", "500", "600", "700"]
});

export const metadata = {
  title: "Get It Done",
  description: "Task Manager App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={quicksand.variable}>
      <body className="font-quicksand">
        <ClientProvider>
          <Navbar />
          {children}
        </ClientProvider>
      </body>
    </html>
  );
}
