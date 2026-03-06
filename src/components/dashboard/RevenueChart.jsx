import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import ChartWidget from "./ChartWidget";
import { revenueData } from "../../data/chartData";
import ChartFilter from "./ChartFilter";
import { useState } from "react";

const RevenueChart = () => {
  const [range, setRange] = useState("monthly");

  const data = revenueData[range];
  return (
    <ChartWidget
      title="User Growth"
      action={<ChartFilter value={range} onChange={setRange} />}
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />

          <XAxis dataKey="name" axisLine={false} tickLine={false} />

          <YAxis axisLine={false} tickLine={false} />

          <Tooltip />

          <Bar dataKey="revenue" fill="#2563EB" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartWidget>
  );
};

export default RevenueChart;
