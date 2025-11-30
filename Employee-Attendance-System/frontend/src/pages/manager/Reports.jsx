import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../components/common/Navbar";
import Sidebar from "../../components/common/Sidebar";
import Loader from "../../components/common/Loader";
import managerService from "../../services/managerService";
import { setReports, setManagerLoading } from "../../store/managerSlice";

const Reports = () => {
  const dispatch = useDispatch();
  const { reports, loading } = useSelector((state) => state.manager);
  const [dateRange, setDateRange] = useState({
    from: "",
    to: "",
  });

  useEffect(() => {
    const loadReports = async () => {
      dispatch(setManagerLoading(true));
      const res = await managerService.getExportData();
      dispatch(setReports(res.data));
      dispatch(setManagerLoading(false));
    };
    loadReports();
  }, [dispatch]);

  const handleChange = (e) => {
    setDateRange({ ...dateRange, [e.target.name]: e.target.value });
  };

  const handleExport = () => {
    if (!reports || reports.length === 0) return;

    const headers = ["Date", "Employee", "Check In", "Check Out", "Status"];
    const rows = reports.map((r) => [
      r.date,
      r.employeeName,
      r.checkInTime,
      r.checkOutTime,
      r.status,
    ]);

    const csvContent = [headers, ...rows]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "attendance-report.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const filteredReports = (reports || []).filter((r) => {
    if (!dateRange.from && !dateRange.to) return true;
    const d = new Date(r.date);
    const from = dateRange.from ? new Date(dateRange.from) : null;
    const to = dateRange.to ? new Date(dateRange.to) : null;
    if (from && d < from) return false;
    if (to && d > to) return false;
    return true;
  });

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 bg-white min-h-screen">
        <Navbar />
        {loading ? (
          <Loader />
        ) : (
          <div className="p-6 space-y-4">
            <h2 className="text-2xl font-semibold text-[#0AC423]">Reports</h2>

            <div className="flex gap-4 items-end mb-4">
              <div>
                <p className="text-sm text-gray-600">From</p>
                <input
                  type="date"
                  name="from"
                  value={dateRange.from}
                  onChange={handleChange}
                  className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:border-[#0AC423]"
                />
              </div>

              <div>
                <p className="text-sm text-gray-600">To</p>
                <input
                  type="date"
                  name="to"
                  value={dateRange.to}
                  onChange={handleChange}
                  className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:border-[#0AC423]"
                />
              </div>

              <button
                onClick={handleExport}
                className="px-4 py-2 bg-[#0AC423] hover:bg-[#089E1C] text-white rounded-lg shadow-md transition-all text-sm font-medium"
              >
                Export CSV
              </button>
            </div>

            <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="p-3 text-left text-gray-600 font-medium">
                      Date
                    </th>
                    <th className="p-3 text-left text-gray-600 font-medium">
                      Employee
                    </th>
                    <th className="p-3 text-left text-gray-600 font-medium">
                      Check In
                    </th>
                    <th className="p-3 text-left text-gray-600 font-medium">
                      Check Out
                    </th>
                    <th className="p-3 text-left text-gray-600 font-medium">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredReports.map((r, i) => (
                    <tr key={i} className="border-t border-gray-100">
                      <td className="p-3">{r.date}</td>
                      <td className="p-3">{r.employeeName}</td>
                      <td className="p-3">{r.checkInTime}</td>
                      <td className="p-3">{r.checkOutTime}</td>
                      <td className="p-3 capitalize">{r.status}</td>
                    </tr>
                  ))}
                  {filteredReports.length === 0 && (
                    <tr>
                      <td colSpan={5} className="p-3 text-center text-gray-500">
                        No reports found for selected range.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reports;
