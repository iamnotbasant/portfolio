import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { motion } from "framer-motion";
import { useState, useRef } from "react";
import "../styles/Dashboard.css";
import { Navbar } from "../components/Navbar";
import bg from "../assets/images/arkham4.png";

export const Dashboard = () => {
  const navigate = useNavigate();
  const { authUser, logout } = useAuthStore();
  const sectionRef = useRef(null);

  const [filters, setFilters] = useState({
    search: "",
    tags: "",
    difficulty: "",
  });

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const isAdmin = authUser?.role === "ADMIN";

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="min-h-screen dashboard-container" ref={sectionRef}>
      <Navbar />

      {/* profile pic whith intials of the user  */}

      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        className="dash-card mt-2 w-full flex items-start gap-4 justify-start"
      >
        <div className="sm:w-40 sm:h-40 relative overflow-hidden w-0 h-0 rounded-lg bg-[#0014c8] text-[#3960fe] hover:text-[#a2bbff] transition-all duration-300 ease-in-out">
          <span className="absolute -bottom-6 right-0 text-9xl">
            {authUser?.name
              ? authUser.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
              : "N/A"}
          </span>
        </div>
        <div className="flex flex-col justify-center gap-1">
          <h3 className="text-3xl text-white neue-med">
            Welcome Back, {authUser?.name} ✨
          </h3>
          <p className="text-base text-white neue-reg">
            Good Afternoon • Tuesday, May 13, 2025
          </p>
          <p className="text-sm text-white/80 neue-reg">
            k4p1ll.23@gmail.com <br />
            {!isAdmin && (
              <span className="neue-reg">
                {authUser?.streak || 0} day streak 🔥
              </span>
            )}
          </p>
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        className="dash-card mb-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Search problems..."
            className="bg-[#668fff49] border border-white/20 rounded-lg px-4 py-2 text-white filter-input"
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          />
          <input
            type="text"
            placeholder="Filter by tags..."
            className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white"
            value={filters.tags}
            onChange={(e) => setFilters({ ...filters, tags: e.target.value })}
          />
          <select
            className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 "
            value={filters.difficulty}
            onChange={(e) =>
              setFilters({ ...filters, difficulty: e.target.value })
            }
          >
            <option value="">All Difficulties</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
          <button className="bg-white/10 hover:bg-white/20 transition-all text-white rounded-lg">
            Create Playlist
          </button>
        </div>
      </motion.div>

      {/* Problems Table */}
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        className="table-card"
      >
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left py-4 text-white/80">Status</th>
              <th className="text-left py-4 text-white/80">Title</th>
              <th className="text-left py-4 text-white/80">Tags</th>
              <th className="text-left py-4 text-white/80">Acceptance</th>
              <th className="text-left py-4 text-white/80">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-white/10">
              <td className="py-4">✅</td>
              <td className="py-4 text-white">Two Sum</td>
              <td className="py-4">
                <span className="bg-white/10 px-2 py-1 rounded-full text-sm text-white mr-2">
                  Array
                </span>
                <span className="bg-white/10 px-2 py-1 rounded-full text-sm text-white">
                  Hash Table
                </span>
              </td>
              <td className="py-4 text-white">45%</td>
              <td className="py-4">
                <button className="text-blue-400 hover:text-blue-300 mr-4">
                  Save
                </button>
                {isAdmin && (
                  <button className="text-red-400 hover:text-red-300">
                    Delete
                  </button>
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </motion.div>
    </div>
  );
};
