import { useMemo, useState } from "react";
import { reports } from "../data/reports";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Papa from "papaparse";
import Input from "../components/ui/Input";
import { sortData } from "../utils/utils/sortingData";

const Reports = () => {
  const [statusFilter, setStatusFilter] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");

  const filteredReports = reports.filter((report) => {
    const reportDate = new Date(report.date);

    const searchMatch =
      report.user.toLowerCase().includes(search.toLowerCase()) ||
      report.type.toLowerCase().includes(search.toLowerCase());

    const statusMatch = statusFilter ? report.status === statusFilter : true;

    const startMatch = startDate ? reportDate >= new Date(startDate) : true;

    const endMatch = endDate ? reportDate <= new Date(endDate) : true;

    return searchMatch && statusMatch && startMatch && endMatch;
  });

  const sortedReports = useMemo(() => {
    return sortData(filteredReports, sortField, sortDirection);
  }, [filteredReports, sortField, sortDirection]);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const totalAmount = filteredReports.reduce(
    (sum, report) => sum + report.amount,
    0,
  );

  const handleExport = () => {
    const csv = Papa.unparse(sortedReports);

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "reports.csv";
    link.click();
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
        Reports
      </h1>

      <Card className="flex flex-wrap justify-between items-center dark:bg-slate-800">
        <Input
          type="text"
          placeholder="Search reports..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className=" border rounded-lg px-3 py-2 w-64 dark:bg-slate-800 dark:text-gray-100 dark:border-slate-700"
        />
        <div className="flex flex-wrap gap-4">
          <select
            className="border rounded-lg px-3 py-2 dark:bg-slate-800 dark:text-gray-100 dark:border-slate-700"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All Status</option>
            <option value="Completed">Completed</option>
            <option value="Pending">Pending</option>
          </select>

          <input
            type="date"
            className="border rounded-lg px-3 py-2 dark:bg-slate-800 dark:text-gray-100 dark:border-slate-700"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />

          <input
            type="date"
            className="border rounded-lg px-3 py-2 dark:bg-slate-800 dark:text-gray-100 dark:border-slate-700"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />

          <Button onClick={handleExport}>Export CSV</Button>
        </div>
      </Card>

      <Card>
        <table className="w-full text-sm border-separate border-spacing-0">
          <thead className="bg-gray-50 text-gray-600 text-xs uppercase tracking-wider dark:bg-slate-800 dark:text-gray-300">
            <tr>
              <th
                onClick={() => handleSort("user")}
                className="py-3 px-4 text-left font-semibold cursor-pointer "
              >
                User
                {sortField === "user" && (sortDirection === "asc" ? "▲" : "▼")}
              </th>
              <th
                onClick={() => handleSort("type")}
                className="py-3 px-4 text-left font-semibold cursor-pointer"
              >
                Type
                {sortField === "type" && (sortDirection === "asc" ? "▲" : "▼")}
              </th>
              <th
                onClick={() => handleSort("status")}
                className="py-3 px-4 text-left font-semibold cursor-pointer"
              >
                Status
                {sortField === "status" &&
                  (sortDirection === "asc" ? "▲" : "▼")}
              </th>
              <th
                onClick={() => handleSort("amount")}
                className="py-3 px-4 text-left font-semibold cursor-pointer"
              >
                Amount
                {sortField === "amount" &&
                  (sortDirection === "asc" ? "▲" : "▼")}
              </th>
              <th
                onClick={() => handleSort("date")}
                className="py-3 px-4 text-left font-semibold cursor-pointer"
              >
                Date
                {sortField === "date" && (sortDirection === "asc" ? "▲" : "▼")}
              </th>
            </tr>
          </thead>

          <tbody>
            {sortedReports.length === 0 ? (
              <tr>
                <td
                  colSpan="5"
                  className="text-center py-6 text-gray-500 dark:text-gray-400"
                >
                  No reports found.
                </td>
              </tr>
            ) : (
              sortedReports.map((report) => (
                <tr
                  key={report.id}
                  className="hover:bg-gray-50 dark:hover:bg-slate-700 transition"
                >
                  <td className="py-3 px-4 border-b border-gray-100 dark:border-slate-700 dark:text-gray-100">
                    {report.user}
                  </td>
                  <td className="py-3 px-4 border-b border-gray-100 dark:border-slate-700 dark:text-gray-100">
                    {report.type}
                  </td>
                  <td className="py-3 px-4 border-b border-gray-100 dark:border-slate-700 dark:text-gray-100">
                    {report.status}
                  </td>
                  <td className="py-3 px-4 border-b border-gray-100 dark:border-slate-700 dark:text-gray-100">
                    ${report.amount.toLocaleString()}
                  </td>
                  <td className="py-3 px-4 border-b border-gray-100 dark:border-slate-700 dark:text-gray-100">
                    {report.date}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        <div className="mt-4 flex justify-around text-sm text-gray-600 dark:text-gray-300">
          <span>Showing {filteredReports.length} reports</span>

          <span className="font-semibold dark:text-gray-100">
            Total Amount: ${totalAmount}
          </span>
        </div>
      </Card>
    </div>
  );
};

export default Reports;
