"use client";
import Sidebar from "@/UI/UserDashboard/Components/Sidebar";
import Header from "@/UI/UserDashboard/Components/Header";
import { AuthProvider } from "@/providers/AuthProvider";

export default function UserLayout({ children }) {

  return (
    <AuthProvider>
      <div className="flex min-h-screen bg-white">
        <Sidebar />
        <div className="flex-1">
          <Header />
          <main className="p-6">
            {children}
          </main>
        </div>
      </div>
    </AuthProvider>
  );
}

