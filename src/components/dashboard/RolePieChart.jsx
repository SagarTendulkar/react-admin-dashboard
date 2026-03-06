import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import ChartWidget from "./ChartWidget";
import { roleDistribution } from "../../data/roleData";

const COLORS = ["#2563EB", "#16A34A"];

const RolePieChart = () => {
  return (
    <ChartWidget title="Role Distribution">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={roleDistribution}
            dataKey="value"
            nameKey="name"
            outerRadius={100}
            label
          >
            {roleDistribution.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>

          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </ChartWidget>
  );
};

export default RolePieChart;
