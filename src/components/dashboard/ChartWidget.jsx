import Card from "../ui/Card";

const ChartWidget = ({ title, action, children }) => {
  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>

        {action}
      </div>

      <div className="h-72">{children}</div>
    </Card>
  );
};

export default ChartWidget;
