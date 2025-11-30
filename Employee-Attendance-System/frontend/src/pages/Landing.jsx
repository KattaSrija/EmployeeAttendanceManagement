import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center gap-6 bg-white">
      <h1 className="text-4xl font-bold text-[#0AC423] tracking-wide">
        Employee Attendance System
      </h1>
      <p className="text-gray-600 text-lg">A simple way to manage attendance</p>

      <div className="flex gap-4">
        <Link
          className="px-6 py-2 bg-[#0AC423] hover:bg-[#089E1C] text-white rounded-lg shadow-md transition-all"
          to="/login"
        >
          Login
        </Link>
        <Link
          className="px-6 py-2 bg-white text-[#0AC423] border border-gray-300 hover:bg-gray-50 rounded-lg shadow-sm transition-all"
          to="/register"
        >
          Register
        </Link>
      </div>
    </div>
  );
};

export default Landing;
