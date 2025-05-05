"use client";
import Sidebar from "@/UI/UserDashboard/Components/Sidebar";
import Header from "@/UI/UserDashboard/Components/Header";

export default function UserLayout({ children }) {

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}

