import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Icon from '@mdi/react';
import { mdilEye, mdilEyeOff } from '@mdi/light-js';
import { loginUser } from "../../features/auth/authSlice";

export default function Login() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const dispatch = useDispatch();
  const {status, error} = useSelector(state => state.auth);
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
        await dispatch(loginUser({email, password})).unwrap();
        alert("Logged in successfully!");
        navigate("/");
    } catch (error) {
        console.log(error);
        alert("Unable to login");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md">
        <h1 className="py-2 px-4 mx-2 my-4 bg-gradient-to-br from-gray-300 to-gray-600 text-white text-center rounded-lg text-xl font-bold">
                CONSTRUCTION AGENT
            </h1>

        <h2 className="text-2xl font-semibold text-center text-gray-800 mt-4">
          Login
        </h2>

        <form onSubmit={handleLogin} className="my-4 space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-gray-800"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="relative">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-gray-800"
              placeholder="Enter your password"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute d-flex mt-4 text-gray-700 z-10 top-5 right-3"
            >
              <Icon path={showPassword ? mdilEyeOff : mdilEye} size={0.8} />
            </button>
          </div>
          {error && <p className="text-sm text-red-500 text-center">{error}</p>}
          <button
            type="submit"
            className={`w-full px-4 py-2 mt-4 text-white bg-gray-600 rounded-md hover:bg-gray-800 transition duration-300 focus:outline-none focus:ring focus:ring-gray-800 ${
              status==="loading" ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={status==="loading"}
          >
            {status==="loading" ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
