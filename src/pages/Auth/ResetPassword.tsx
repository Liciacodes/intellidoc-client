import { useEffect, useState, type FormEvent } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const ResetPassword: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const token = searchParams.get("token") || "";
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (!token) {
      setError("Invalid or missing reset token");
    }
  }, [token]);

  
  useEffect(() => {
    document.documentElement.classList.add("dark");
    return () => {
      document.documentElement.classList.remove("dark");
    };
  });

  const handleSubmit = async (e: FormEvent) => {
  e.preventDefault();

  setError("");
  setSuccess("");

  if (!newPassword || !confirmPassword) {
    setError("Please fill in both password fields");
    return;
  }

  if (newPassword !== confirmPassword) {
    setError("Passwords do not match.");
    return;
  }

  try {
    const res = await fetch(`http://localhost:5000/api/auth/reset-password?token=${token}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ newPassword }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Failed to reset password.");
      return;
    }

    setSuccess("Password reset successful!");
    setTimeout(() => navigate("/login"), 2000);

  } catch (err) {
    setError("Something went wrong. Please try again.");
    console.error(err);
  }
};


  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background-light dark:bg-background-dark px-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-900 p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white text-center">
          Reset Your Password
        </h1>

        {error && (
          <div className="mb-4 text-red-600 text-center font-semibold">{error}</div>
        )}
        {success && (
          <div className="mb-4 text-green-600 text-center font-semibold">{success}</div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="form-input rounded-md border p-3 dark:bg-gray-800 dark:text-white"
            required
            minLength={6}
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="form-input rounded-md border p-3 dark:bg-gray-800 dark:text-white"
            required
            minLength={6}
          />

          <button
            type="submit"
            className="bg-primary text-white py-3 rounded-md hover:bg-primary/90 transition"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  )
};

export default ResetPassword;
