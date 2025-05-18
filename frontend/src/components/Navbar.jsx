import React from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import logo from "../assets/images/logo2.png";

export const Navbar = () => {
  const { authUser, logout } = useAuthStore();
  const isAdmin = authUser?.role === "ADMIN";

  const handleLogout = async (e) => {
    e.preventDefault();
    await logout();
    navigate("/login");
  };
  return (
    <nav>
      <motion.nav
        initial={{ opacity: 0, y: -60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "backInOut" }}
        className="navbar flex justify-between items-center px-3 py-2"
      >
        <div className="flex items-center gap-4">
          <div className="logo w-[50px] h-auto z-50">
            <img src={logo} alt="logo" />
          </div>
          <h1 className="text-lg text-white/90 nulshock">Arkham Labs</h1>
        </div>

        <div className="flex items-center gap-4">
          <p className="text-sm text-white/80 neue-reg">
            {!isAdmin && (
              <span className="neue-reg">
                {authUser?.streak || 0} day streak 🔥
              </span>
            )}
          </p>
          {isAdmin && (
            <Link
              to="/add-problem"
              className="add-btn text-white/90  px-4 py-2 neue-med rounded-md transition duration-300 ease-in-out text-sm"
            >
              [A] &nbsp; Add Problem
            </Link>
          )}
          <button
            onClick={handleLogout}
            className="px-4 py-2  rounded-lg neue-med hover:bg-red-500/50 transition-all text-white text-sm"
          >
            Logout
          </button>
        </div>
      </motion.nav>
    </nav>
  );
};
