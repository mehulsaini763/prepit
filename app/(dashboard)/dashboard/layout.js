import { getCookie } from "@/utils/misc";
import Header from "./_components/header";
import Sidebar from "./_components/sidebar";
import { redirect } from "next/navigation";

const DashboardLayout = async ({ children }) => {
  const user = await getCookie("[PI USER]");

  if (user && !user.id) {
    redirect("/signin");
  }
  
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex h-full md:overflow-hidden">
        <Sidebar />
        <div className="w-full md:w-4/5 p-2 h-full">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
