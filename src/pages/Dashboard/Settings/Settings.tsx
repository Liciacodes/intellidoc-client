import React from "react";
import { useTheme } from "../../../hooks/useTheme";

const Settings: React.FC = () => {
    const {isDark, setIsDark} = useTheme();    
  return (
    <div className="flex-1 overflow-y-auto bg-secondary dark:bg-[#111418]/50">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap justify-between gap-4 mb-8">
          <div className="flex flex-col gap-1">
            <p className="text-text-light dark:text-dashboard-text-dark text-3xl font-bold leading-tight">
              General Settings
            </p>
            <p className="text-text-secondary-light dark:text-dashboard-text-dark text-base font-normal">
              Customize how IntelliDoc looks and behaves.
            </p>
          </div>
        </div>

        {/* Appearance Settings */}
        <div className="bg-dashboard-bg-light dark:bg-dashboard-sidebar-dark rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-6">
          <h2 className="text-text-light dark:text-dashboard-text-dark text-lg font-semibold mb-4">
            Appearance
          </h2>
          <div className="flex items-center justify-between">
            <p className="text-text-secondary-light dark:text-dashboard-text-dark text-sm">
              Toggle between light and dark mode.
            </p>
            <button className="bg-primary text-dashboard-text-dark dark:text-dashboard-text-dark px-4 py-2 rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors" onClick={() => setIsDark(!isDark)}>
              Toggle Theme
            </button>
          </div>
        </div>

        {/* Notifications Settings */}
        <div className="bg-dashboard-bg-light dark:bg-dashboard-sidebar-dark rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-6">
          <h2 className="text-text-light dark:text-dashboard-text-dark text-lg font-semibold mb-4">
            Notifications
          </h2>
          <div className="flex items-center justify-between">
            <p className="text-text-secondary-light dark:text-dashboard-text-dark text-sm">
              Receive email alerts for document updates.
            </p>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>
        </div>

        {/* Subscription Settings */}
        <div className="bg-dashboard-bg-light dark:bg-dashboard-sidebar-dark rounded-xl border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-text-light dark:text-dashboard-text-dark text-lg font-semibold mb-4">
            Subscription
          </h2>
          <p className="text-dashboard-text-light dark:text-dashboard-text-dark text-sm mb-4">
            You are currently on the <strong>Free Plan</strong>. Upgrade to
            unlock more features.
          </p>
          <button className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors">
            Upgrade Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
