import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Sidebar = () => {
  // const { user } = useSelector((state) => state.auth);
  // const employeeLinks = [
  //   { to: "/employee/dashboard", label: "Dashboard" },
  //   { to: "/employee/mark", label: "Mark Attendance" },
  //   { to: "/employee/history", label: "History" },
  //   { to: "/employee/summary", label: "Summary" },
  //   { to: "/employee/profile", label: "Profile" },
  // ];
  // const managerLinks = [
  //   { to: "/manager/dashboard", label: "Dashboard" },
  //   { to: "/manager/employees", label: "Employees" },
  //   { to: "/manager/calendar", label: "Team Calendar" },
  //   { to: "/manager/reports", label: "Reports" },
  // ];
  // const links = user?.role === "manager" ? managerLinks : employeeLinks;
  // return (
  //   <div className="w-64 h-screen bg-white border-r border-gray-200 shadow-sm p-5">
  //     <h2 className="text-lg font-semibold mb-6 text-[#0AC423]">Menu</h2>
  //     <ul className="space-y-2">
  //       {links.map((item, i) => (
  //         <li key={i}>
  //           <Link
  //             to={item.to}
  //             className="block px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-[#0AC423] transition-all"
  //           >
  //             {item.label}
  //           </Link>
  //         </li>
  //       ))}
  //     </ul>
  //   </div>
  // );
};

export default Sidebar;
