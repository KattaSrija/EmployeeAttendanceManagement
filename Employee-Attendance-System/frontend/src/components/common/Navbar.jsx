import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/authSlice";
import { useNavigate, Link } from "react-router-dom";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  // Menu links based on role
  const employeeMenu = [
    { path: "/employee/dashboard", label: "Dashboard" },
    { path: "/employee/mark", label: "Mark Attendance" },
    { path: "/employee/history", label: "History" },
    { path: "/employee/summary", label: "Summary" },
    { path: "/employee/profile", label: "Profile" },
  ];

  const managerMenu = [
    { path: "/manager/dashboard", label: "Dashboard" },
    { path: "/manager/employees", label: "Employees" },
    { path: "/manager/calendar", label: "Calendar" },
    { path: "/manager/reports", label: "Reports" },
  ];

  const menuLinks = user?.role === "manager" ? managerMenu : employeeMenu;

  return (
    <div className="w-full bg-white border-b border-gray-200 shadow-sm">
      <div className="flex items-center justify-between px-6 h-16">
        {/* Logo / Title */}
        <h1 className="text-xl font-bold text-[#0AC423]">Attendance System</h1>

        {/* Horizontal Menu */}
        <div className="hidden md:flex gap-6">
          {menuLinks.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className="text-gray-700 hover:text-[#0AC423] font-medium text-sm transition-all"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* User & Logout */}
        <div className="flex items-center gap-4">
          <span className="text-gray-700 text-sm font-medium">
            {user?.name}
          </span>
          <button
            onClick={handleLogout}
            className="px-4 py-1 rounded-lg bg-[#0AC423] hover:bg-[#089E1C] text-white text-sm font-medium shadow-md transition-all"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Mobile menu (optional dropdown) */}
      <div className="flex md:hidden flex-wrap gap-4 px-6 pb-2">
        {menuLinks.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className="text-gray-700 hover:text-[#0AC423] font-medium text-sm transition-all"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
