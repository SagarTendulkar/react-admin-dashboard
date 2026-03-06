import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

const MainLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-linear-to-r/srgb from-gray-100 to-gray-300 dark:from-slate-900 dark:to-slate-700  ">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Topbar />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
};

export default MainLayout;
