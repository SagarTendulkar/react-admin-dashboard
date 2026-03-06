const Badge = ({ status }) => {
  const styles =
    status === "Active"
      ? "bg-green-100 text-green-700 border border-green-200"
      : "bg-red-100 text-red-700 border border-red-200";

  return (
    <span
      className={`px-2.5 py-0.5 text-xs font-medium rounded-full ${styles}`}
    >
      {status}
    </span>
  );
};

export default Badge;
