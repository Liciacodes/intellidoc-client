import {  useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: connect to backend password reset route
    console.log("Password reset requested for:", email);
  };

  useEffect(()=> {
    document.documentElement.classList.add("dark");
    return () => {
      document.documentElement.classList.remove("dark");
    };
  })

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
              />
            </label>

            <button
              type="submit"
              className="font-display w-full cursor-pointer rounded-lg h-12 px-5 bg-primary text-white text-base font-semibold leading-normal tracking-wide hover:bg-primary/90 transition-colors duration-200 mt-4"
            >
              Send Reset Instructions
            </button>
          </form>

          {/* Back to login */}
          <div className="mt-8 text-center">
            <button
              onClick={() => navigate("/login")}
              className="font-display text-sm text-primary hover:underline"
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
