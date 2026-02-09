import React, { useState } from "react";
import { useUserStore } from "../../../store/useUserStore";

const ProfileSettings: React.FC = () => {
  const { user } = useUserStore();

  // Password state only (personal info is read-only)
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      // Validation
      if (!currentPassword || !newPassword || !confirmPassword) {
        setError("Please fill in all password fields.");
        return;
      }

      if (newPassword !== confirmPassword) {
        setError("New password and confirm password do not match.");
        return;
      }

      if (newPassword.length < 6) {
        setError('New password must be at least 6 characters long.');
        return;
      }

      // Get token from localStorage
      const token = localStorage.getItem('token');
      
      if (!token) {
        setError("You need to be logged in to change your password.");
        return;
      }

      // Call the change-password endpoint
      const response = await fetch('http://localhost:5000/api/auth/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          currentPassword,
          newPassword
        })
      });

      // Handle response
      if (!response.ok) {
        const text = await response.text();
        try {
          const data = JSON.parse(text);
          setError(data.error || "Failed to change password");
        } catch {
          setError(text || "Failed to change password");
        }
        return;
      }

      const data = await response.json();
      setMessage("Password changed successfully!");
      
      // Clear password fields
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      
    } catch (error: any) {
      console.error("Change password error:", error);
      setError("Network error. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 overflow-y-auto bg-dashboard-secondary dark:bg-[#111418]/50 font-display">
      <div className="p-2 sm:p-8">
        {/* Header Section */}
        <div className="flex flex-wrap justify-between gap-4 mb-8">
          <div className="flex flex-col gap-1">
            <p className="text-dashboard-text-light dark:text-dashboard-text-dark text-lg md:text-3xl font-bold leading-tight">
              Profile Settings
            </p>
            <p className="text-dashboard-text-secondary-light dark:text-dashboard-text-secondary-dark text-base font-normal">
              Manage your personal information and security preferences.
            </p>
          </div>
          
         
         
        </div>

      
        <div className="bg-dashboard-bg-light dark:bg-dashboard-sidebar-dark rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-8">
          <h2 className="text-dashboard-text-light dark:text-dashboard-text-dark text-lg md:text-3xl font-semibold mb-6">
            Personal Information
          </h2>

          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-dashboard-text-secondary-light dark:text-dashboard-text-secondary-dark mb-2">
                  Name
                </label>
                <div className="w-full rounded-lg p-2 border border-gray-300 dark:border-gray-700 text-dashboard-text-light dark:text-dashboard-text-dark bg-dashboard-secondary dark:bg-dashboard-card-dark">
                  {user?.name || "Olivia Johnson"}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-dashboard-text-secondary-light dark:text-dashboard-text-secondary-dark mb-2">
                  Email
                </label>
                <div className="w-full rounded-lg p-2 border border-gray-300 dark:border-gray-700 text-dashboard-text-light dark:text-dashboard-text-dark bg-dashboard-secondary dark:bg-dashboard-card-dark">
                  {user?.email || "olivia@intellidoc.com"}
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-dashboard-text-secondary-light dark:text-dashboard-text-secondary-dark mb-2">
                  Phone Number
                </label>
                <div className="w-full rounded-lg p-2 border border-gray-300 dark:border-gray-700 text-dashboard-text-light dark:text-dashboard-text-dark bg-dashboard-secondary dark:bg-dashboard-card-dark">
                  +234 28379292
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-dashboard-text-secondary-light dark:text-dashboard-text-secondary-dark mb-2">
                  Location
                </label>
                <div className="w-full rounded-lg p-2 border border-gray-300 dark:border-gray-700 text-dashboard-text-light dark:text-dashboard-text-dark bg-dashboard-secondary dark:bg-dashboard-card-dark">
                  Lagos, Nigeria
                </div>
              </div>
            </div>
          </div>
        </div>

     
        <div className="bg-dashboard-bg-light dark:bg-dashboard-sidebar-dark rounded-xl border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-dashboard-text-light dark:text-dashboard-text-dark text-lg font-semibold mb-6">
            Security
          </h2>
           <div className="flex flex-col items-end gap-2">
            {message && (
              <div className="p-3 bg-green-100 border border-green-400 text-green-700 rounded">
                {message}
              </div>
            )}
            {error && (
              <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                {error}
              </div>
            )}
          </div>

          <form onSubmit={handleChangePassword} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-dashboard-text-secondary-light dark:text-dashboard-text-secondary-dark mb-2">
                Current Password
              </label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="********"
                className="w-full rounded-lg p-2 border border-gray-300 dark:border-gray-700 text-dashboard-text-light dark:text-dashboard-text-dark bg-dashboard-secondary dark:bg-dashboard-card-dark focus:ring-dashboard-primary focus:border-dashboard-primary"
                disabled={loading}
                required
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                
                <label className="block text-sm font-medium text-dashboard-text-secondary-light dark:text-dashboard-text-secondary-dark mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="********"
                  className="w-full rounded-lg p-2 border border-gray-300 dark:border-gray-700 text-dashboard-text-light dark:text-dashboard-text-dark bg-dashboard-secondary dark:bg-dashboard-card-dark focus:ring-dashboard-primary focus:border-dashboard-primary"
                  disabled={loading}
                  required
                  minLength={6}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-dashboard-text-secondary-light dark:text-dashboard-text-secondary-dark mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="********"
                  className="w-full rounded-lg p-2 border border-gray-300 dark:border-gray-700 text-dashboard-text-light dark:text-dashboard-text-dark bg-dashboard-secondary dark:bg-dashboard-card-dark focus:ring-dashboard-primary focus:border-dashboard-primary"
                  disabled={loading}
                  required
                />
              </div>
            </div>
            
            <div className="flex justify-end">
              
              <button
                type="submit"
                disabled={loading}
                className="bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded-lg text-sm font-semibold transition-colors disabled:opacity-50"
              >
                {loading ? "Updating Password..." : "Update Password"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;