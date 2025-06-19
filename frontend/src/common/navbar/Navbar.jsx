import React from "react";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logoutUser());
        navigate("/login");
    }

    return (
        <div className="flex justify-between shadow-2xl ">
            <h1 className="py-4 px-2 mx-10 my-4 bg-gradient-to-br from-gray-300 to-gray-600 text-white rounded-lg text-md font-bold">
                CONSTRUCTION AGENT
            </h1>
            <button 
                onClick={handleLogout}
                className="py-2 px-4 mx-10 my-6 bg-gray-600 hover:bg-gray-800 transition duration-300 text-white rounded-lg font-medium"
            >
                Logout
            </button>
        </div>
    )
}