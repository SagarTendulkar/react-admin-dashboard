import { TrendingDown, TrendingUp } from "lucide-react";
import Card from "../ui/Card";

const StatCard = ({ title, value, growth, icon: Icon, color }) => {
  const isPositive = growth?.startsWith("+");

  return (
    <Card className="flex items-center justify-between hover:shadow-md transition">
      <div>
        <p className="text-sm text-gray-500 dark:text-gray-100">{title}</p>

        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100  ">
          {value}
        </h2>

        <span
          className={`text-xs font-medium ${
            isPositive ? "text-green-600" : "text-red-600"
          }`}
        >
          {growth}
          {isPositive ? (
            <TrendingUp size={14} className="inline ml-1" />
          ) : (
            <TrendingDown size={14} className="inline ml-1" />
          )}
        </span>
      </div>

      {Icon && (
        <div className={`p-3 rounded-xl ${color} bg-opacity-10`}>
          <Icon size={22} className={color.replace("bg-", "text-")} />
        </div>
      )}
    </Card>
  );
};

export default StatCard;
