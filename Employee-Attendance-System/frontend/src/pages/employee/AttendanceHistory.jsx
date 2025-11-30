import { useEffect } from "react";
import Sidebar from "../../components/common/Sidebar";
import Navbar from "../../components/common/Navbar";
import attendanceService from "../../services/attendanceService";
import { useDispatch, useSelector } from "react-redux";
import { setHistory, setAttendanceLoading } from "../../store/attendanceSlice";
import Loader from "../../components/common/Loader";

const AttendanceHistory = () => {
  const dispatch = useDispatch();
  const { history, loading } = useSelector((state) => state.attendance);

  useEffect(() => {
    const loadHistory = async () => {
      dispatch(setAttendanceLoading(true));
      const res = await attendanceService.getHistory();
      dispatch(setHistory(res.data));
      dispatch(setAttendanceLoading(false));
    };
    loadHistory();
  }, [dispatch]);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 bg-white min-h-screen">
        <Navbar />

        {loading ? (
          <Loader />
        ) : (
          <div className="p-6">
            <h2 className="text-2xl font-semibold mb-4 text-[#0AC423]">
              Attendance History
            </h2>

            <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="p-3 text-left text-gray-600 font-medium">
                      Date
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
                  {history.map((item, i) => (
                    <tr key={i} className="border-t border-gray-100">
                      <td className="p-3">{item.date}</td>
                      <td className="p-3">{item.checkInTime}</td>
                      <td className="p-3">{item.checkOutTime}</td>
                      <td className="p-3 capitalize">{item.status}</td>
                    </tr>
                  ))}
                  {history.length === 0 && (
                    <tr>
                      <td colSpan={4} className="p-3 text-center text-gray-500">
                        No attendance records found.
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

export default AttendanceHistory;
