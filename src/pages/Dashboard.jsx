import RevenueChart from "../components/dashboard/RevenueChart";
import RolePieChart from "../components/dashboard/RolePieChart";
import StatCard from "../components/dashboard/StatCard";
import UserGrowthChart from "../components/dashboard/UserGrowthChart";
import { stats } from "../data/dashboardStats";

const Dashboard = () => {
  return (
    <div className="space-y-8 ">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
            Dashboard
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-100">
            Overview of platform analytics
          </p>
        </div>
      </div>

      <div>
        <h2 className="text-sm font-medium text-gray-500 dark:text-gray-100 mb-4">
          Analytics Overview
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {stats.map((item) => (
            <StatCard
              key={item.id}
              title={item.title}
              value={item.value}
              growth={item.growth}
              icon={item.icon}
              color={item.color}
            />
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-sm font-medium text-gray-500 dark:text-gray-100 mb-4">
          Performance Metrics
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <UserGrowthChart />
          <RevenueChart />
          <RolePieChart />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
