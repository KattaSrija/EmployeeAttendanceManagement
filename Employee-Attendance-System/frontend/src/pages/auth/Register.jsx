import { useState } from "react";
import authService from "../../services/authServer";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "employee",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await authService.register(form);
      navigate("/login");
    } catch (err) {
      console.log("REGISTER ERROR", err?.response?.data);
      const msg = err?.response?.data?.message || "Registration failed";
      setError(msg);
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-white">
      <form
        onSubmit={handleSubmit}
        className="w-96 bg-white p-8 rounded-2xl shadow-lg space-y-5 border border-gray-200"
      >
        <h2 className="text-3xl font-bold text-center text-[#0AC423]">
          Register
        </h2>

        {error && <p className="text-red-500 text-center text-sm">{error}</p>}

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:border-[#0AC423]"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:border-[#0AC423]"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:border-[#0AC423]"
        />

        <select
          name="role"
          onChange={handleChange}
          value={form.role}
          className="w-full border border-gray-300 p-2 rounded-lg bg-white focus:outline-none focus:border-[#0AC423]"
        >
          <option value="employee">Employee</option>
          <option value="manager">Manager</option>
        </select>

        <button
          type="submit"
          className="w-full bg-[#0AC423] hover:bg-[#089E1C] text-white py-2 rounded-lg shadow-md transition-all"
        >
          Register
        </button>

        <p className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link className="text-[#0AC423] hover:underline" to="/login">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
