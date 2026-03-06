import {
  FileText,
  LayoutDashboard,
  Users,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`bg-white border-r border-gray-200 dark:bg-slate-900 dark:border-slate-600 transition-all duration-300 ease-in-out h-screen sticky top-0 flex flex-col
      ${collapsed ? "w-20" : "w-64"}`}
    >
      {/* Header Section */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-gray-50 dark:border-slate-700">
        {!collapsed && (
          <span className="font-bold text-xl text-blue-600 tracking-tight">
            AdminPro
          </span>
        )}

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded-lg bg-gray-50 hover:bg-gray-400 hover:text-gray-100 text-gray-500 dark:text-gray-100 dark:hover:bg-slate-500 dark:hover:text-slate-900 dark:bg-slate-800 cursor-pointer transition-colors"
          aria-label={collapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      {/* Navigation Section */}
      <nav className="flex-1 px-3 py-4 space-y-2 overflow-y-auto custom-scrollbar">
        <NavItem
          to="/"
          label="Dashboard"
          icon={LayoutDashboard}
          collapsed={collapsed}
          end // Ensures exact match for the home route
        />
        <NavItem to="/users" label="Users" icon={Users} collapsed={collapsed} />
        <NavItem
          to="/reports"
          label="Reports"
          icon={FileText}
          collapsed={collapsed}
        />
      </nav>

      <div className="p-4 border-t border-gray-100 dark:border-slate-600">
        <div
          className={`flex items-center ${collapsed ? "justify-center" : "gap-3"}`}
        >
          <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-xs">
            PT
          </div>
          {!collapsed && (
            <span className="text-sm font-medium text-gray-700 dark:text-slate-300">
              Prish T.
            </span>
          )}
        </div>
      </div>
    </aside>
  );
};

const NavItem = ({ to, label, icon: Icon, collapsed, end = false }) => (
  <NavLink
    to={to}
    end={end}
    title={collapsed ? label : ""} // Basic Tooltip
    className={({ isActive }) =>
      `flex items-center py-2.5 rounded-xl text-sm font-medium transition-all group
      ${collapsed ? "justify-center px-0" : "gap-3 px-4"}
      ${
        isActive
          ? "bg-blue-600 text-white shadow-md shadow-blue-200 dark:bg-blue-500 dark:shadow-blue-400"
          : "text-gray-500 hover:bg-gray-50 hover:text-blue-600 dark:text-gray-300 dark:hover:bg-slate-800 dark:hover:text-blue-400"
      }`
    }
  >
    <Icon size={20} className={`${collapsed ? "" : "shrink-0"}`} />

    {!collapsed && <span className="truncate">{label}</span>}
  </NavLink>
);

export default Sidebar;
