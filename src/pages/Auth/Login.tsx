import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState(""); // Add error state
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(""); // Clear error when user starts typing
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); // Clear previous errors
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
        }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        setError(
          errorData.error || "Login failed. Please check your credentials."
        ); // Set error state instead of alert
        return;
      }

      const data = await response.json();

      navigate("/dashboard");
    } catch (error) {
      setError("Something went wrong. Please try again."); // Set error state instead of alert
      console.error("Login error:", error);
    }
    console.log("Login submitted:", form);
  };

  useEffect(() => {
    document.documentElement.classList.add("dark");
    return () => {
      document.documentElement.classList.remove("dark");
    };
  }, []);
  return (
    <div className="bg-background-light dark:bg-black font-display min-h-screen flex flex-col justify-center py-6 sm:py-12">
      <div className="relative bg-white dark:bg-[#1c2127] px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-lg sm:rounded-xl sm:px-10">
        <div className="mx-auto max-w-md">
          {/* Logo + Title */}
          <div className="flex items-center gap-2 mb-8 justify-center">
            <span className="material-symbols-outlined text-primary text-4xl!">
              document_scanner
            </span>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              IntelliDoc
            </h1>
          </div>

          {/* Header text */}
          <div className="text-center">
            <p className="text-gray-900 dark:text-white text-3xl font-black leading-tight tracking-[-0.033em]">
              Welcome back to IntelliDoc
            </p>
            <p className="text-dashboard-text-secondary-dark text-base font-normal leading-normal mt-2">
              Log in to your account
            </p>
          </div>

          {/* Form */}
          <div className="divide-y divide-gray-300/50 dark:divide-gray-700/50">
            <div className="space-y-6 py-8 text-base leading-7 text-gray-600 dark:text-gray-400">
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Error Message Display */}
                {error && (
                  <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                    <div className="flex items-center gap-2 text-red-800 dark:text-red-200">
                      <span className="material-symbols-outlined text-sm">
                        error
                      </span>
                      <span className="text-sm font-medium">{error}</span>
                    </div>
                  </div>
                )}

                {/* Email field */}
                <label className="flex flex-col">
                  <p className="text-gray-900 dark:text-white text-sm font-medium leading-normal pb-2">
                    Email Address
                  </p>
                  <input
                    name="email"
                    type="email"
                    placeholder="Enter your email address"
                    value={form.email}
                    onChange={handleChange}
                    className="form-input w-full resize-none rounded-lg border border-[#3b4754] bg-background-light dark:bg-[#1c2127] h-12 px-4 text-sm font-normal text-gray-900 dark:text-white placeholder:text-dashboard-text-secondary-dark focus:outline-0 focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                </label>

                {/* Password field */}
                <label className="flex flex-col">
                  <p className="text-gray-900 dark:text-white text-sm font-medium leading-normal pb-2">
                    Password
                  </p>
                  <div className="relative w-full flex items-stretch">
                    <input
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={form.password}
                      onChange={handleChange}
                      className="form-input w-full resize-none rounded-lg border border-[#3b4754] bg-background-light dark:bg-[#1c2127] h-12 px-4 pr-10 text-sm font-normal text-gray-900 dark:text-white placeholder:text-dashboard-text-secondary-dark focus:outline-0 focus:ring-2 focus:ring-primary focus:border-primary"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 flex items-center pr-3 text-dashboard-text-secondary-dark hover:text-primary"
                    >
                      <span className="material-symbols-outlined">
                        {showPassword ? "visibility_off" : "visibility"}
                      </span>
                    </button>
                  </div>
                </label>

                {/* Forgot password */}
                <div className="text-right">
                  <button
                    type="button"
                    onClick={() => navigate("/forgot-password")}
                    className="text-sm font-medium text-primary hover:underline"
                  >
                    Forgot Password?
                  </button>
                </div>

                {/* Login button */}
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-lg bg-primary px-3 py-2.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:opacity-50"
                >
                  Log In
                </button>
              </form>

              {/* Divider */}
              <div className="relative flex items-center py-2">
                <div className="grow border-t border-gray-300 dark:border-gray-700"></div>
                <span className="mx-4 text-sm text-gray-400 dark:text-gray-500">
                  Or continue with
                </span>
                <div className="grow border-t border-gray-300 dark:border-gray-700"></div>
              </div>

              {/* Social logins */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button className="flex items-center justify-center gap-2 w-full rounded-lg h-12 px-5 bg-white dark:bg-[#2a3038] text-gray-800 dark:text-white border border-gray-300 dark:border-[#3b4754] hover:bg-gray-100 dark:hover:bg-[#3b4754] transition-colors">
                  <img
                    src="https://www.svgrepo.com/show/475656/google-color.svg"
                    alt="Google"
                    className="w-5 h-5"
                  />
                  <span className="text-sm font-medium">Google</span>
                </button>

                <button className="flex items-center justify-center gap-2 w-full rounded-lg h-12 px-5 bg-white dark:bg-[#2a3038] text-gray-800 dark:text-white border border-gray-300 dark:border-[#3b4754] hover:bg-gray-100 dark:hover:bg-[#3b4754] transition-colors">
                  <img
                    src="https://www.svgrepo.com/show/475661/microsoft.svg"
                    alt="Microsoft"
                    className="w-5 h-5"
                  />
                  <span className="text-sm font-medium">Microsoft</span>
                </button>
              </div>
            </div>

            {/* Sign up link */}
            <div className="pt-6 text-base font-medium leading-6">
              <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                Don't have an account?{" "}
                <button
                  onClick={() => navigate("/register")}
                  className="text-primary hover:underline"
                >
                  Sign up
                </button>
              </p>
            </div>
          </div>

          {/* Footer */}
          <footer className="pt-8 text-center text-xs text-gray-400 dark:text-gray-500">
            <a href="#" className="hover:underline">
              Terms of Service
            </a>{" "}
            ·{" "}
            <a href="#" className="hover:underline">
              Privacy Policy
            </a>
          </footer>
        </div>
      </div>
    </div>
  );
}
