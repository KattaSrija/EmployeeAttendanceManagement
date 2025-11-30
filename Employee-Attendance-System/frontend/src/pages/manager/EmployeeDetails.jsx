import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "../../components/common/Navbar";
import Sidebar from "../../components/common/Sidebar";
import Loader from "../../components/common/Loader";
import managerService from "../../services/managerService";
import {
  setSelectedEmployee,
  setManagerLoading,
} from "../../store/managerSlice";

const EmployeeDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedEmployee, loading } = useSelector((state) => state.manager);

  useEffect(() => {
    const loadEmployee = async () => {
      dispatch(setManagerLoading(true));
      const res = await managerService.getEmployeeById(id);
      dispatch(setSelectedEmployee(res.data));
      dispatch(setManagerLoading(false));
    };
    loadEmployee();
  }, [id, dispatch]);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 bg-white min-h-screen">
        <Navbar />
        {loading || !selectedEmployee ? (
          <Loader />
        ) : (
          <div className="p-6 space-y-4">
            <h2 className="text-2xl font-semibold text-[#0AC423]">
              {selectedEmployee.name} - Details
            </h2>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 space-y-2 text-sm text-gray-800">
              <p>
                <span className="font-medium">Email:</span>{" "}
                {selectedEmployee.email}
              </p>
              <p>
                <span className="font-medium">Department:</span>{" "}
                {selectedEmployee.department}
              </p>
              <p>
                <span className="font-medium">Employee ID:</span>{" "}
                {selectedEmployee.employeeId}
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 space-y-2">
              <h3 className="text-xl font-semibold mb-2 text-gray-800">
                Recent Attendance
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="p-2 text-left text-gray-600 font-medium">
                        Date
                      </th>
                      <th className="p-2 text-left text-gray-600 font-medium">
                        Check In
                      </th>
                      <th className="p-2 text-left text-gray-600 font-medium">
                        Check Out
                      </th>
                      <th className="p-2 text-left text-gray-600 font-medium">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedEmployee.recentAttendance?.map((a, i) => (
                      <tr key={i} className="border-t border-gray-100">
                        <td className="p-2">{a.date}</td>
                        <td className="p-2">{a.checkInTime}</td>
                        <td className="p-2">{a.checkOutTime}</td>
                        <td className="p-2 capitalize">{a.status}</td>
                      </tr>
                    ))}
                    {(!selectedEmployee.recentAttendance ||
                      selectedEmployee.recentAttendance.length === 0) && (
                      <tr>
                        <td
                          colSpan={4}
                          className="p-2 text-center text-gray-500"
                        >
                          No attendance records.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeDetails;
