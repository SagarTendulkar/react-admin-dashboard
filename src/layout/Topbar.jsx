import ThemeToggle from "../components/ui/ThemeToggle";

const Topbar = () => {
  return (
    <header className="flex h-16 items-center justify-between bg-white border-b border-gray-200 dark:bg-slate-900 dark:border-slate-600 px-6">
      <h1 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
        Admin Dashboard
      </h1>
      <ThemeToggle />
    </header>
  );
};

export default Topbar;
