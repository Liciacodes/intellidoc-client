import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/forgot-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      // Check if response is OK before parsing JSON
      if (!response.ok) {
        // Handle non-JSON responses
        const text = await response.text();
        try {
          // Try to parse as JSON
          const data = JSON.parse(text);
          setError(data.error || "Something went wrong");
        } catch {
          // If not JSON, use the text
          setError(text || "Something went wrong");
        }
        return;
      }

      const data = await response.json();
      setMessage(data.message);
      if (data.token) {
  navigate(`/reset-password?token=${data.token}`);
}
      
    } catch (error: any) {
      console.error("Forgot password error:", error);
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.documentElement.classList.add("dark");
    return () => {
      document.documentElement.classList.remove("dark");
    };
  }, []); // Added empty dependency array

  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-start p-6">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-3xl!">
            document_scanner
          </span>
          <h1 className="font-display text-2xl font-bold text-gray-800 dark:text-white">
            IntelliDoc
          </h1>
        </div>
      </header>

      {/* Main */}
      <main className="flex flex-1 items-center justify-center py-6">
        <div className="flex flex-col max-w-md w-full px-4">
          {/* Heading */}
          <div className="flex flex-col gap-2 text-center mb-8">
            <h2 className="font-display text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
              Forgot Your Password?
            </h2>
            <p className="font-display text-base text-gray-600 dark:text-gray-400">
              Enter your email address below and we'll send you instructions on
              how to reset your password.
            </p>
          </div>

          {/* Error and Success Messages */}
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}
          {message && (
            <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
              {message}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <label className="flex flex-col">
              <p className="font-display text-sm font-medium text-gray-700 dark:text-gray-300 pb-2">
                Email Address
              </p>
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="form-input font-display w-full resize-none rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 h-12 p-3 text-base text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:outline-0 focus:ring-2 focus:ring-primary/50"
                disabled={loading}
              />
            </label>

            <button
              type="submit"
              disabled={loading}
              className="font-display w-full cursor-pointer rounded-lg h-12 px-5 bg-primary text-white text-base font-semibold leading-normal tracking-wide hover:bg-primary/90 transition-colors duration-200 mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Sending..." : "Send Reset Instructions"}
            </button>
          </form>

          {/* Back to login */}
          <div className="mt-8 text-center">
            <button
              onClick={() => navigate("/login")}
              className="font-display text-sm text-primary hover:underline"
              disabled={loading}
            >
              Back to Login
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ForgotPassword;