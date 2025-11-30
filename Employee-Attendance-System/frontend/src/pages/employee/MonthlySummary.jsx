import { useEffect } from "react";
import Sidebar from "../../components/common/Sidebar";
import Navbar from "../../components/common/Navbar";
import attendanceService from "../../services/attendanceService";
import { useDispatch, useSelector } from "react-redux";
import { setSummary, setAttendanceLoading } from "../../store/attendanceSlice";
import Loader from "../../components/common/Loader";

const MonthlySummary = () => {
  const dispatch = useDispatch();
  const { summary, loading } = useSelector((state) => state.attendance);

  useEffect(() => {
    const loadSummary = async () => {
      try {
        dispatch(setAttendanceLoading(true));
        const res = await attendanceService.getSummary();
        dispatch(setSummary(res.data));
      } catch (error) {
        console.error("Error loading summary", error);
      } finally {
        dispatch(setAttendanceLoading(false));
      }
    };
    loadSummary();
  }, [dispatch]);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 bg-white min-h-screen">
        <Navbar />

        {loading || !summary ? (
          <Loader />
        ) : (
          <div className="p-6 space-y-4">
            <h2 className="text-2xl font-semibold text-[#0AC423]">
              Monthly Summary
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
                <p className="text-gray-600">Present Days</p>
                <h3 className="text-3xl font-bold text-gray-900">
                  {summary.present}
                </h3>
              </div>

              <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
                <p className="text-gray-600">Absent Days</p>
                <h3 className="text-3xl font-bold text-gray-900">
                  {summary.absent}
                </h3>
              </div>

              <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
                <p className="text-gray-600">Late Days</p>
                <h3 className="text-3xl font-bold text-gray-900">
                  {summary.late}
                </h3>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MonthlySummary;
