import React from "react";


const ProfileSettings: React.FC = () => {
 

  return (
    <div className="flex-1 overflow-y-auto bg-dashboard-secondary dark:bg-[#111418]/50 font-display">
      <div className="max-w-7xl mx-auto p-8">
        {/* Header Section */}
        <div className="flex flex-wrap justify-between gap-4 mb-8">
          <div className="flex flex-col gap-1">
            <p className="text-dashboard-text-light dark:text-dashboard-text-dark text-3xl font-bold leading-tight">
              Profile Settings
            </p>
            <p className="text-dashboard-text-secondary-light dark:text-dashboard-text-secondary-dark text-base font-normal">
              Manage your personal information and security preferences.
            </p>
          </div>
          <button className="bg-dashboard-primary text-white py-2 px-5 rounded-lg text-sm font-semibold hover:bg-dashboard-primary/90 transition-colors self-start">
            Save Changes
          </button>
        </div>

        {/* Personal Information Section */}
        <div className="bg-dashboard-bg-light dark:bg-dashboard-sidebar-dark rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-8">
          <h2 className="text-dashboard-text-light dark:text-dashboard-text-dark text-lg font-semibold mb-6">
            Personal Information
          </h2>

          <form className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-dashboard-text-secondary-light dark:text-dashboard-text-secondary-dark mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Olivia Rhye"
                  className="w-full rounded-lg p-2 border border-gray-300 dark:border-gray-700 text-dashboard-text-light dark:text-dashboard-text-dark bg-dashboard-secondary dark:bg-dashboard-card-dark focus:ring-dashboard-primary focus:border-dashboard-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-dashboard-text-secondary-light dark:text-dashboard-text-secondary-dark mb-2">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="olivia@intellidoc.com"
                  className="w-full rounded-lg p-2 border border-gray-300 dark:border-gray-700 text-dashboard-text-light dark:text-dashboard-text-dark bg-dashboard-secondary dark:bg-dashboard-card-dark focus:ring-dashboard-primary focus:border-dashboard-primary"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-dashboard-text-secondary-light dark:text-dashboard-text-secondary-dark mb-2">
                  Phone Number
                </label>
                <input
                  type="text"
                  placeholder="+234 28379292"
                  className="w-full rounded-lg p-2 border border-gray-300 dark:border-gray-700 text-dashboard-text-light dark:text-dashboard-text-dark bg-dashboard-secondary dark:bg-dashboard-card-dark focus:ring-dashboard-primary focus:border-dashboard-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-dashboard-text-secondary-light dark:text-dashboard-text-secondary-dark mb-2">
                  Location
                </label>
                <input
                  type="text"
                  placeholder="Lagos, Nigeria"
                  className="w-full rounded-lg p-2 border border-gray-300 dark:border-gray-700 text-dashboard-text-light dark:text-dashboard-text-dark bg-dashboard-secondary dark:bg-dashboard-card-dark focus:ring-dashboard-primary focus:border-dashboard-primary"
                />
              </div>
            </div>
          </form>
        </div>

        {/* Security Section */}
        <div className="bg-dashboard-bg-light dark:bg-dashboard-sidebar-dark rounded-xl border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-dashboard-text-light dark:text-dashboard-text-dark text-lg font-semibold mb-6">
            Security
          </h2>

          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-dashboard-text-secondary-light dark:text-dashboard-text-secondary-dark mb-2">
                Current Password
              </label>
              <input
                type="password"
                placeholder="********"
                className="w-full rounded-lg p-2 border border-gray-300 dark:border-gray-700 text-dashboard-text-light dark:text-dashboard-text-dark bg-dashboard-secondary dark:bg-dashboard-card-dark focus:ring-dashboard-primary focus:border-dashboard-primary"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-dashboard-text-secondary-light dark:text-dashboard-text-secondary-dark mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  placeholder="********"
                  className="w-full rounded-lg p-2 border border-gray-300 dark:border-gray-700 text-dashboard-text-light dark:text-dashboard-text-dark bg-dashboard-secondary dark:bg-dashboard-card-dark focus:ring-dashboard-primary focus:border-dashboard-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-dashboard-text-secondary-light dark:text-dashboard-text-secondary-dark mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  placeholder="********"
                  className="w-full rounded-lg p-2 border border-gray-300 dark:border-gray-700 text-dashboard-text-light dark:text-dashboard-text-dark bg-dashboard-secondary dark:bg-dashboard-card-dark focus:ring-dashboard-primary focus:border-dashboard-primary"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
