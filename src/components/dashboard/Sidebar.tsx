import { Link, useLocation, useNavigate } from "react-router-dom";
import Button from "../ui/Button";
import { useUserStore } from "../../store/useUserStore";
import { useState } from "react";

const Sidebar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useUserStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { icon: "dashboard", label: "Dashboard", path: "/dashboard" },
    { icon: "folder", label: "My Documents", path: "/dashboard/my-document" },
    { icon: "spark", label: "AI Tools", path: "/dashboard/ai-tools" },
    { icon: "settings", label: "Settings", path: "/dashboard/settings" },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Mobile Hamburger Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-dashboard-primary text-white p-2 rounded-lg shadow-lg"
        aria-label="Toggle menu"
      >
        <span className="material-symbols-outlined">
          {isMobileMenuOpen ? "close" : "menu"}
        </span>
      </button>

      {/* Overlay for mobile */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={closeMobileMenu}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static
          inset-y-0 left-0
          z-40
          w-64 
          bg-dashboard-bg-light dark:bg-dashboard-sidebar-dark 
          flex flex-col 
          border-r border-gray-200 dark:border-gray-700
          transform transition-transform duration-300 ease-in-out
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Logo Header */}
        <div className="flex items-center gap-3 p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="bg-dashboard-primary p-2 rounded-xl">
            <span className="material-symbols-outlined text-white">
              auto_awesome
            </span>
          </div>
          <h1 className="text-dashboard-text-light dark:text-dashboard-text-dark text-xl font-bold">
            IntelliDoc
          </h1>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-2 p-4">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.label}
                to={item.path}
                onClick={closeMobileMenu} // Close menu on mobile when clicking a link
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

        {/* Logout Button */}
        <div className="mt-auto p-4">
          <Button
            variant="special"
            onClick={() => {
              handleLogout();
              closeMobileMenu();
            }}
          >
            Log Out
          </Button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;





