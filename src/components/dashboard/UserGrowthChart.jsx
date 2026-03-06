import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { useState } from "react";
import ChartWidget from "./ChartWidget";
import ChartFilter from "./ChartFilter";
import { userGrowthData } from "../../data/chartData";

const UserGrowthChart = () => {
  const [range, setRange] = useState("monthly");

  const data = userGrowthData[range];
  return (
    <ChartWidget
      title="User Growth"
      action={<ChartFilter value={range} onChange={setRange} />}
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />

          <XAxis dataKey="name" axisLine={false} tickLine={false} />

          <YAxis axisLine={false} tickLine={false} />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="users"
            stroke="#3b82f6"
            strokeWidth={3}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartWidget>
  );
};

export default UserGrowthChart;
