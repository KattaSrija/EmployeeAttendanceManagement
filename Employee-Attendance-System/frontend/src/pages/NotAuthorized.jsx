import { Link } from "react-router-dom";

const NotAuthorized = () => {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center gap-4 bg-white">
      <h1 className="text-4xl font-bold text-red-500">403</h1>
      <p className="text-lg text-gray-700">
        You are not authorized to view this page.
      </p>
      <Link
        className="px-4 py-2 bg-[#0AC423] hover:bg-[#089E1C] text-white rounded-lg shadow-md transition-all"
        to="/"
      >
        Go Home
      </Link>
    </div>
  );
};

export default NotAuthorized;
