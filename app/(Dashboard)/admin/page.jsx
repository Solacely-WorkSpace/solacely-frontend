import AdminInfo from "@/Components/AdminDashboard/AdminInfo";
import Analytics from "@/Components/AdminDashboard/Analytics";
import View from "@/Components/AdminDashboard/View";
import React from "react";

const AdminDashboard = () => {
  return (
    <section className="flex flex-col mx-auto gap-4 w-full">
      <AdminInfo />
      <Analytics />
      <View />
    </section>
  );
};

export default AdminDashboard;
