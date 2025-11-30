import { useSelector } from "react-redux";
import Sidebar from "../../components/common/Sidebar";
import Navbar from "../../components/common/Navbar";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 bg-white min-h-screen">
        <Navbar />

        <div className="p-6 space-y-4">
          <h2 className="text-2xl font-semibold text-[#0AC423]">My Profile</h2>

          <div className="bg-white p-6 shadow-sm rounded-xl border border-gray-200 space-y-3 text-gray-800 text-sm">
            <p>
              <span className="font-medium">Name: </span>
              {user.name}
            </p>
            <p>
              <span className="font-medium">Email: </span>
              {user.email}
            </p>
            <p>
              <span className="font-medium">Role: </span>
              {user.role}
            </p>
            {user.department && (
              <p>
                <span className="font-medium">Department: </span>
                {user.department}
              </p>
            )}
            {user.employeeId && (
              <p>
                <span className="font-medium">Employee ID: </span>
                {user.employeeId}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
