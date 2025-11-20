import { useState, useEffect, type ChangeEvent, type FormEvent } from "react";

interface FormData {
  email: string;
  password: string;
  terms: boolean;
}

export default function Register() {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    terms: false,
  });

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState(""); // Add error state

  // ✅ Enable dark mode by default
  useEffect(() => {
    document.documentElement.classList.add("dark");
    return () => {
      document.documentElement.classList.remove("dark");
    };
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setError(""); // Clear error when user starts typing
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(""); // Clear previous errors
    console.log("Form data submitted:", formData);

    if (!formData.terms) {
      setError("You must agree to the Terms of Service and Privacy Policy");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json()
        setError(errorData.error || "Signup failed. Please try again.");
        return;
      }

      const data = await response.json()
       alert(`User created successfully! User ID: ${data.userId}`);
       window.location.href = '/login'
    } catch (error) {
      setError("Something went wrong. Please try again.");
      console.error("Registration error:", error);
    }
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center bg-background-dark p-4 font-display">
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-white">
            IntelliDoc
          </h1>
          <p className="mt-2 text-lg text-gray-400">
            Create your IntelliDoc account
          </p>
        </div>

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

        {/* Social login buttons */}
        <div className="flex flex-col space-y-3">
          <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-white p-3 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 transition">
            <img
              className="h-5 w-5"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBi14E0uPAsB3mfJ0ODjSfSIcZqAYx2I8Q1_uoSpcIDEbv8WhtMPCt0qbqjMZhqepAa4A91NeSbBAxKw-ifE9VPLqBy5-a477O2GfNtmtzRqTibq2S4sc3vUFyqB772dcJThPQ6f6gvlvLxrLaQ8xg_gJzVtC7w-34c8JTkTp7ukmLviS_LQwBiq8MBS_TkEQ-nPXuUqrZXi9cLe6W2g4cZ4jIAIt8ejbF8ji6PgPgsDh2AGz2_c40j9tbDe5JqAbzHboyF-sy3cEMg"
              alt="Google logo"
            />
            <span className="text-sm font-semibold leading-6">
              Continue with Google
            </span>
          </button>

          <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-white p-3 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 transition">
            <img
              className="h-5 w-5"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuC3XHrs1tkuIw0YRuHdEChpoWZn3N0EYNIpHj-Wztzcw3mr_e9dkUyCaX0R3EvoSpmCZvbsvuYMcpj8XKiz6IUB1UxcJSRzf0h_N-g1jbAc_1CLmu18cRHl-5D4B0NweAeW_wVRsv9243QjyrmSPgSqCHCdeZ0ULrIR-Y3O8FURCUYh0_5RKov4N38r7j8cAJxSd2nnlCiRuK4eoEa2a2m_j9bZetF-I_rJiQqYjq1_wRugwLVcC271nFD6tkYpUuvw8MMTtvivFR_P"
              alt="Microsoft logo"
            />
            <span className="text-sm font-semibold leading-6">
              Continue with Microsoft
            </span>
          </button>
        </div>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-600" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-background-dark px-2 text-gray-400">OR</span>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-300"
            >
              Email Address
            </label>
            <div className="mt-2">
             <input
  type="email"
  name="email"
  placeholder="Enter your email"
  value={formData.email}
  onChange={handleChange}
  className="w-full rounded-lg border border-[#3b4754] bg-background-light dark:bg-[#1c2127]
  text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400
  px-3 py-2.5 outline-none"
/>
            </div>
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium leading-6 text-gray-300"
            >
              Password
            </label>
            <div className="relative mt-2">
              <input
  type={showPassword ? "text" : "password"}
  name="password"
  placeholder="Enter your password"
  value={formData.password}
  onChange={handleChange}
  className="w-full rounded-lg border border-[#3b4754] bg-background-light dark:bg-[#1c2127]
  text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400
  px-3 py-2.5 outline-none"
/>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500"
              >
                <span className="material-symbols-outlined text-lg">
                  {showPassword ? "visibility_off" : "visibility"}
                </span>
              </button>
            </div>
          </div>

          {/* Terms */}
          <div className="flex items-center">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              checked={formData.terms}
              onChange={handleChange}
              className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
            />
            <label htmlFor="terms" className="ml-2 block text-sm text-gray-300">
              I agree to the{" "}
              <a href="#" className="text-primary hover:underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-primary hover:underline">
                Privacy Policy
              </a>
            </label>
          </div>

          {/* Submit */}
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-lg bg-primary px-3 py-2.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primary/90  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:opacity-50"
            >
              Create Account
            </button>
          </div>
        </form>

        {/* Login link */}
        <p className="mt-10 text-center text-sm text-gray-400">
          Already have an account?{" "}
          <a
            href="/login"
            className="font-semibold leading-6 text-primary hover:text-primary/90"
          >
            Log in
          </a>
        </p>
      </div>
    </div>
  );
}