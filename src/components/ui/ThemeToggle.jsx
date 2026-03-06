import { useTheme } from "../../context/ThemeContext";
import { Sun, Moon } from "lucide-react";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg border border-gray-100 bg-slate-700 hover:bg-gray-400 dark:border-slate-700 dark:bg-gray-200 dark:hover:bg-slate-700 cursor-pointer transition text-gray-100 dark:text-gray-800"
    >
      {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
};

export default ThemeToggle;
