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
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
      {/* Sidebar */}
      <div
        className={`sidebar ${sidebarOpen ? "sidebar-open" : ""}`}
        onMouseLeave={() => setSidebarOpen(false)}
      >
        <div className="sidebar-header">
          <h3 className="text-xl text-white neue-med">Quick Access</h3>
        </div>
        <div className="sidebar-content">
          <div className="sidebar-item">
            <span className="sidebar-icon">📋</span>
            <span className="sidebar-text">My Problems</span>
          </div>
          <div className="sidebar-item">
            <span className="sidebar-icon">🏆</span>
            <span className="sidebar-text">Leaderboard</span>
          </div>
          <div className="sidebar-item">
            <span className="sidebar-icon">📊</span>
            <span className="sidebar-text">Statistics</span>
          </div>
          <div className="sidebar-item">
            <span className="sidebar-icon">📚</span>
            <span className="sidebar-text">Learning Paths</span>
          </div>
          <div className="sidebar-item">
            <span className="sidebar-icon">⚙️</span>
            <span className="sidebar-text">Settings</span>
          </div>
        </div>
        <div className="sidebar-footer">
          <button onClick={handleLogout} className="sidebar-logout">
            <span className="sidebar-icon">🚪</span>
            <span className="sidebar-text">Logout</span>
          </button>
        </div>
      </div>

      <div
        className={`sidebar-trigger ${sidebarOpen ? "hidden-trigger" : ""}`}
        onMouseEnter={() => setSidebarOpen(true)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="ionicon"
          viewBox="0 0 512 512"
          className="pr-1"
        >
          <path
            fill="none"
            stroke="currentColor"
            stroke-linecap="square"
            stroke-miterlimit="10"
            stroke-width="48"
            d="M180 112l144 144-144 144"
          />
          <path
            fill="none"
            stroke="currentColor"
            stroke-linecap="square"
            stroke-miterlimit="10"
            stroke-width="48"
            d="M312 112l144 144-144 144"
          />
        </svg>
      </div>

      <div className="max-w-[1200px] mx-auto">
        <Navbar />

        {/* profile pic whith intials of the user  */}

        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          className="dash-card mt-2 w-full flex items-start gap-4 justify-start"
        >
          <div className="sm:w-36 sm:h-36 relative overflow-hidden w-0 h-0 rounded-lg bg-[#0001] pfp transition-all duration-300 ease-in-out">
            <span className="absolute -bottom-6 right-0 text-9xl">
              {authUser?.name
                ? authUser.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                : "N/A"}
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="text-3xl text-white neue-med">
              Welcome Back, {authUser?.name} ✨
            </h3>
            <p className="text-base text-white neue-reg">
              Good Afternoon • Tuesday, May 13, 2025
            </p>
            <p className="text-sm text-white/80 neue-reg">
              k4p1ll.23@gmail.com <br />
            </p>
            <p className="text-sm text-white/80 bg-[#ffffff38] font-mono tracking-tighter uppercase hover:text-red-500 hover:bg-[#0e0e0e9a] duration-200 ease-out cursor-pointer w-fit">
              <span>[C]</span> Create Playlist
            </p>

            <p className="text-sm text-white/80 neue-reg">
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
          className="dash-card mb-2 mt-2"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Search problems..."
              className=" px-4 py-2 text-white filter-input"
              value={filters.search}
              onChange={(e) =>
                setFilters({ ...filters, search: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Filter by tags..."
              className="px-4 py-2 text-white filter-input"
              value={filters.tags}
              onChange={(e) => setFilters({ ...filters, tags: e.target.value })}
            />
            <select
              className="px-4 py-2 filter-input"
              value={filters.difficulty}
              onChange={(e) =>
                setFilters({ ...filters, difficulty: e.target.value })
              }
            >
              <option className="bg-black/90" value="">
                All Difficulties
              </option>
              <option className="bg-black/90" value="Easy">
                Easy
              </option>
              <option className="bg-black/90" value="Medium">
                Medium
              </option>
              <option className="bg-black/90" value="Hard">
                Hard
              </option>
            </select>
          </div>
        </motion.div>

        {/* Problems Table */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          className="table-card "
        >
          <table className="w-full ">
            <thead>
              <tr className="border-b border-white/30">
                <th className="text-left py-2 text-white/80 neue-med">
                  Status
                </th>
                <th className="text-left py-2 text-white/80 neue-med">Title</th>
                <th className="text-left py-2 text-white/80 neue-med">Tags</th>
                <th className="text-left py-2 text-white/80 neue-med">
                  Acceptance
                </th>
                <th className="text-left py-2 text-white/80 neue-med">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-white/30">
                <td className="py-2">✅</td>
                <td className="py-2 text-white"> Two Sum Two Sum Two Sum </td>
                <td className="py-2">
                  <span className="bg-white/10 px-2 py-1 rounded-full text-sm text-white mr-2">
                    Array
                  </span>
                  <span className="bg-white/10 px-2 py-1 rounded-full text-sm text-white">
                    Hash Table
                  </span>
                </td>
                <td className="py-2 text-white">45%</td>
                <td className="py-2">
                  <button className="text-white hover:text-blue-300 mr-4">
                    💾
                  </button>
                  {isAdmin && (
                    <button className="text-red-200 hover:text-red-300">
                      🗑️
                    </button>
                  )}
                </td>
              </tr>
              <tr className="border-b border-white/30">
                <td className="py-2">✅</td>
                <td className="py-2 text-white"> Two Sum Two Sum Two Sum </td>
                <td className="py-2">
                  <span className="bg-white/10 px-2 py-1 rounded-full text-sm text-white mr-2">
                    Array
                  </span>
                  <span className="bg-white/10 px-2 py-1 rounded-full text-sm text-white">
                    Hash Table
                  </span>
                </td>
                <td className="py-2 text-white">45%</td>
                <td className="py-2">
                  <button className="text-white hover:text-blue-300 mr-4">
                    💾
                  </button>
                  {isAdmin && (
                    <button className="text-red-200 hover:text-red-300">
                      🗑️
                    </button>
                  )}
                </td>
              </tr>
              <tr className="border-b border-white/30">
                <td className="py-2">✅</td>
                <td className="py-2 text-white"> Two Sum Two Sum Two Sum </td>
                <td className="py-2">
                  <span className="bg-white/10 px-2 py-1 rounded-full text-sm text-white mr-2">
                    Array
                  </span>
                  <span className="bg-white/10 px-2 py-1 rounded-full text-sm text-white">
                    Hash Table
                  </span>
                </td>
                <td className="py-2 text-white">45%</td>
                <td className="py-2">
                  <button className="text-white hover:text-blue-300 mr-4">
                    💾
                  </button>
                  {isAdmin && (
                    <button className="text-red-200 hover:text-red-300">
                      🗑️
                    </button>
                  )}
                </td>
              </tr>
              <tr className="border-b border-white/30">
                <td className="py-2">✅</td>
                <td className="py-2 text-white"> Two Sum Two Sum Two Sum </td>
                <td className="py-2">
                  <span className="bg-white/10 px-2 py-1 rounded-full text-sm text-white mr-2">
                    Array
                  </span>
                  <span className="bg-white/10 px-2 py-1 rounded-full text-sm text-white">
                    Hash Table
                  </span>
                </td>
                <td className="py-2 text-white">45%</td>
                <td className="py-2">
                  <button className="text-white hover:text-blue-300 mr-4">
                    💾
                  </button>
                  {isAdmin && (
                    <button className="text-red-200 hover:text-red-300">
                      🗑️
                    </button>
                  )}
                </td>
              </tr>
              <tr className="border-b border-white/30">
                <td className="py-2">✅</td>
                <td className="py-2 text-white"> Two Sum Two Sum Two Sum </td>
                <td className="py-2">
                  <span className="bg-white/10 px-2 py-1 rounded-full text-sm text-white mr-2">
                    Array
                  </span>
                  <span className="bg-white/10 px-2 py-1 rounded-full text-sm text-white">
                    Hash Table
                  </span>
                </td>
                <td className="py-2 text-white">45%</td>
                <td className="py-2">
                  <button className="text-white hover:text-blue-300 mr-4">
                    💾
                  </button>
                  {isAdmin && (
                    <button className="text-red-200 hover:text-red-300">
                      🗑️
                    </button>
                  )}
                </td>
              </tr>{" "}
              <tr className="border-b border-white/30">
                <td className="py-2">✅</td>
                <td className="py-2 text-white"> Two Sum Two Sum Two Sum </td>
                <td className="py-2">
                  <span className="bg-white/10 px-2 py-1 rounded-full text-sm text-white mr-2">
                    Array
                  </span>
                  <span className="bg-white/10 px-2 py-1 rounded-full text-sm text-white">
                    Hash Table
                  </span>
                </td>
                <td className="py-2 text-white">45%</td>
                <td className="py-2">
                  <button className="text-white hover:text-blue-300 mr-4">
                    💾
                  </button>
                  {isAdmin && (
                    <button className="text-red-200 hover:text-red-300">
                      🗑️
                    </button>
                  )}
                </td>
              </tr>{" "}
              <tr className="border-b border-white/30">
                <td className="py-2">✅</td>
                <td className="py-2 text-white"> Two Sum Two Sum Two Sum </td>
                <td className="py-2">
                  <span className="bg-white/10 px-2 py-1 rounded-full text-sm text-white mr-2">
                    Array
                  </span>
                  <span className="bg-white/10 px-2 py-1 rounded-full text-sm text-white">
                    Hash Table
                  </span>
                </td>
                <td className="py-2 text-white">45%</td>
                <td className="py-2">
                  <button className="text-white hover:text-blue-300 mr-4">
                    💾
                  </button>
                  {isAdmin && (
                    <button className="text-red-200 hover:text-red-300">
                      🗑️
                    </button>
                  )}
                </td>
              </tr>{" "}
              <tr className="border-b border-white/30">
                <td className="py-2">✅</td>
                <td className="py-2 text-white"> Two Sum Two Sum Two Sum </td>
                <td className="py-2">
                  <span className="bg-white/10 px-2 py-1 rounded-full text-sm text-white mr-2">
                    Array
                  </span>
                  <span className="bg-white/10 px-2 py-1 rounded-full text-sm text-white">
                    Hash Table
                  </span>
                </td>
                <td className="py-2 text-white">45%</td>
                <td className="py-2">
                  <button className="text-white hover:text-blue-300 mr-4">
                    💾
                  </button>
                  {isAdmin && (
                    <button className="text-red-200 hover:text-red-300">
                      🗑️
                    </button>
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </motion.div>
      </div>
    </div>
  );
};
