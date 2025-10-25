import { useEffect, useState } from "react";

const ThemeToggle: React.FC = () => {
  const [isDark, setIsDark] = useState<boolean>(() => {
    const stored = localStorage.getItem("theme");
    if (stored) return stored === "dark";
    // Default to dark if no preference
    return true;
  });

  useEffect(() => {
    const root = document.documentElement;

    if (isDark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }

    // Log to confirm it's in sync
    console.log("Theme is now:", isDark ? "dark" : "light");
  }, [isDark]);

  return (
    <button
      onClick={() => setIsDark(!isDark)}
      className="p-2 rounded-md border border-gray-300 dark:border-gray-700 
                 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100
                 transition-colors duration-300"
      title="Toggle theme"
    >
      {isDark ? "🌙" : "☀️"}
    </button>
  );
};

export default ThemeToggle;
