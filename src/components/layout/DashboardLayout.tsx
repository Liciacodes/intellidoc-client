import Sidebar from "../dashboard/Sidebar";
import Header from "../dashboard/Header";
import { Outlet } from "react-router-dom";



const DashboardLayout: React.FC = () => {
  // Apply dark mode class when layout mounts
//   useEffect(() => {
//     document.documentElement.classList.add("dark");
//     return () => {
//       document.documentElement.classList.remove("dark");
//     };
//   }, []);

  return (
    <div className="flex h-screen transition-colors duration-300 bg-dashboard-bg-light dark:bg-background-dark font-display">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <div className="flex-1 overflow-y-auto p-8 bg-dashboard-secondary dark:bg-background-dark/50">
      <Outlet/>
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;