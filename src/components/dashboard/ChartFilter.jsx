const filters = [
  { label: "W", value: "weekly" },
  { label: "M", value: "monthly" },
  { label: "Y", value: "yearly" },
];

const ChartFilter = ({ value, onChange }) => {
  return (
    <div className="flex gap-2">
      {filters.map((filter) => (
        <button
          key={filter.value}
          onClick={() => onChange(filter.value)}
          className={`px-2 py-1 text-xs rounded-md border transition
            ${
              value === filter.value
                ? "bg-blue-600 text-white border-blue-600"
                : "border-gray-300 text-gray-600 hover:bg-gray-100"
            }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
};

export default ChartFilter;
