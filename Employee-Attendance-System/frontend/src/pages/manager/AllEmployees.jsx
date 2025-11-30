import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../components/common/Navbar";
import Sidebar from "../../components/common/Sidebar";
import Loader from "../../components/common/Loader";
import managerService from "../../services/managerService";
import { setEmployees, setManagerLoading } from "../../store/managerSlice";
import { Link } from "react-router-dom";

const AllEmployees = () => {
  const dispatch = useDispatch();
  const { employees, loading } = useSelector((state) => state.manager);

  useEffect(() => {
    const loadEmployees = async () => {
      dispatch(setManagerLoading(true));
      const res = await managerService.getAllEmployees();
      dispatch(setEmployees(res.data));
      dispatch(setManagerLoading(false));
    };
    loadEmployees();
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
              All Employees
            </h2>
            <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="p-3 text-left text-gray-600 font-medium">
                      Name
                    </th>
                    <th className="p-3 text-left text-gray-600 font-medium">
                      Email
                    </th>
                    <th className="p-3 text-left text-gray-600 font-medium">
                      Department
                    </th>
                    <th className="p-3 text-left text-gray-600 font-medium">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {employees.map((emp, i) => (
                    <tr key={i} className="border-t border-gray-100">
                      <td className="p-3">{emp.name}</td>
                      <td className="p-3">{emp.email}</td>
                      <td className="p-3">{emp.department}</td>
                      <td className="p-3">
                        <Link
                          to={`/manager/employee/${emp.id}`}
                          className="text-[#0AC423] hover:underline text-sm font-medium"
                        >
                          View Details
                        </Link>
                      </td>
                    </tr>
                  ))}
                  {employees.length === 0 && (
                    <tr>
                      <td colSpan={4} className="p-3 text-center text-gray-500">
                        No employees found.
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

export default AllEmployees;
