import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../components/common/Navbar";
import Sidebar from "../../components/common/Sidebar";
import Loader from "../../components/common/Loader";
import managerService from "../../services/managerService";
import { setTeamCalendar, setManagerLoading } from "../../store/managerSlice";

const TeamCalendar = () => {
  const dispatch = useDispatch();
  const { teamCalendar, loading } = useSelector((state) => state.manager);

  useEffect(() => {
    const loadCalendar = async () => {
      try {
        dispatch(setManagerLoading(true));
        const res = await managerService.getTeamSummary();
        dispatch(setTeamCalendar(res.data));
      } catch (error) {
        console.error("Error loading team calendar", error);
      } finally {
        dispatch(setManagerLoading(false));
      }
    };
    loadCalendar();
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
              Team Calendar View
            </h2>
            <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="p-3 text-left text-gray-600 font-medium">
                      Date
                    </th>
                    <th className="p-3 text-left text-gray-600 font-medium">
                      Present
                    </th>
                    <th className="p-3 text-left text-gray-600 font-medium">
                      Absent
                    </th>
                    <th className="p-3 text-left text-gray-600 font-medium">
                      Late
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {teamCalendar.map((day, i) => (
                    <tr key={i} className="border-t border-gray-100">
                      <td className="p-3">{day.date}</td>
                      <td className="p-3">{day.present}</td>
                      <td className="p-3">{day.absent}</td>
                      <td className="p-3">{day.late}</td>
                    </tr>
                  ))}
                  {teamCalendar.length === 0 && (
                    <tr>
                      <td colSpan={4} className="p-3 text-center text-gray-500">
                        No calendar data available.
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

export default TeamCalendar;
