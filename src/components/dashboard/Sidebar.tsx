import { Link, useLocation } from "react-router-dom";

const Sidebar: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { icon: "dashboard", label: "Dashboard", path: "/dashboard" },
    { icon: "folder", label: "My Documents", path: "/dashboard/my-document" },
    { icon: "spark", label: "AI Tools", path: "/dashboard/ai-tools" },
    { icon: "settings", label: "Settings", path: "/dashboard/settings" },
  ];

  return (
    <aside className="w-64 bg-dashboard-bg-light dark:bg-dashboard-sidebar-dark flex flex-col border-r border-gray-200 dark:border-gray-700">
      <div className="flex items-center gap-3 p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="bg-dashboard-primary p-2 rounded-xl">
          <span className="material-symbols-outlined text-white">auto_awesome</span>
        </div>
        <h1 className="text-dashboard-text-light dark:text-dashboard-text-dark text-xl font-bold">IntelliDoc</h1>
      </div>

      <nav className="flex flex-col gap-2 p-4">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.label}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                isActive
                  ? "bg-dashboard-primary/20 text-dashboard-primary"
                  : "text-dashboard-text-secondary-light dark:text-dashboard-text-secondary-dark hover:bg-gray-100 dark:hover:bg-gray-700/50"
              }`}
            >
              <span className="material-symbols-outlined">{item.icon}</span>
              <p className="text-sm font-medium">{item.label}</p>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto p-4">
        <div className="flex flex-col items-center justify-center p-6 rounded-xl bg-dashboard-secondary dark:bg-dashboard-card-dark">
          <div className="bg-dashboard-primary/20 p-3 rounded-full mb-4">
            <span className="material-symbols-outlined text-dashboard-primary text-3xl!">
              cloud_upload
            </span>
          </div>
          <h3 className="text-dashboard-text-light dark:text-white text-base font-semibold text-center mb-1">
            Upgrade your plan
          </h3>
          <p className="text-dashboard-text-secondary-light dark:text-dashboard-text-secondary-dark text-sm text-center mb-4">
            Get more storage and advanced features.
          </p>
          <button disabled className="w-full bg-dashboard-primary text-white py-2 px-4 rounded-lg text-sm font-semibold hover:bg-dashboard-primary/90 transition-colors disabled:cursor-not-allowed">
            Upgrade Now
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;