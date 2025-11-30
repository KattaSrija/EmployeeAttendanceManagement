import { useState } from "react";
import authService from "../../services/authServer";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../store/authSlice";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await authService.login(form);
      dispatch(loginSuccess(res.data));
      navigate(
        res.data.user.role === "employee"
          ? "/employee/dashboard"
          : "/manager/dashboard"
      );
    } catch (err) {
      const msg = err?.response?.data?.message || "Invalid email or password";
      setError(msg);
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-white">
      <form
        onSubmit={handleSubmit}
        className="w-96 bg-white p-8 rounded-2xl shadow-lg space-y-5 border border-gray-200"
      >
        <h2 className="text-3xl font-bold text-center text-[#0AC423]">Login</h2>

        {error && <p className="text-red-500 text-center text-sm">{error}</p>}

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:border-[#0AC423]"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:border-[#0AC423]"
        />

        <button
          type="submit"
          className="w-full bg-[#0AC423] hover:bg-[#089E1C] text-white py-2 rounded-lg shadow-md transition-all"
        >
          Login
        </button>

        <p className="text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link className="text-[#0AC423] hover:underline" to="/register">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
