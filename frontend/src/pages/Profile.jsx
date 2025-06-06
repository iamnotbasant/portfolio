import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Mail, User, Shield, Image, Edit, Key } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import ProfileSubmission from "../components/ProfileSubmission";
import ProblemSolvedByUser from "../components/ProblemSolvedByUser";
import { Navbar } from "../components/Navbar";
import { motion } from "framer-motion";
import "../styles/Profile.css";
import UserStats from "../components/UserStats";
import SubmissionHeatmap from "../components/SubmissionHeatmap";
import Sidebar from "../components/Sidebar";

const Profile = () => {
  const { authUser } = useAuthStore();
  console.log("Auth User:", authUser);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
        duration: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  };

  return (
    <div className="profile-container">
      <Navbar />
      <Sidebar />
      {/* Header with back button */}
      <motion.div
        className="profile-header w-full"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="flex items-center gap-3 mt-4">
          <Link to="/dashboard" className="bg-opacity-20 backdrop-blur-sm">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-2xl font-bold neue-med">Profile</h1>
        </div>
      </motion.div>

      <motion.div className="flex items-start justify-start gap-4">
        <motion.div variants={itemVariants} className="profile-card">
          <div>
            {/* Profile Header */}
            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* Avatar */}
              <motion.div
                className="profile-avatar"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              >
                <div>
                  <div className="sm:w-24 sm:h-24 relative overflow-hidden w-0 h-0 rounded-lg bg-[#0001] pfp transition-all duration-300 ease-in-out">
                    <span className="absolute -bottom-3 right-0 text-7xl">
                      {authUser?.name
                        ? authUser.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                        : "N/A"}
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Name and Role Badge */}
              <div className="text-center md:text-left">
                <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-black to-gray-600 dark:from-white dark:to-gray-400 neue-med">
                  {authUser.name}
                </h2>
                <div>{authUser.role}</div>
              </div>
            </div>

            <div className="profile-divider"></div>

            {/* User Information */}
            <div className="grid grid-cols-1 gap-6">
              {/* Email */}
              <motion.div className="profile-stats p-4" variants={itemVariants}>
                <div className="stat-figure text-primary">
                  <Mail className="w-8 h-8" />
                </div>
                <div className="stat-title">Email</div>
                <div className="stat-value text-lg break-all">
                  {authUser.email}
                </div>
              </motion.div>

              {/* User ID */}
              <motion.div className="profile-stats p-4" variants={itemVariants}>
                <div className="stat-figure text-primary">
                  <User className="w-8 h-8" />
                </div>
                <div className="stat-title">User ID</div>
                <div className="stat-value text-sm break-all">
                  {authUser.id}
                </div>
              </motion.div>

              {/* Role Status */}
              <motion.div className="profile-stats p-4" variants={itemVariants}>
                <div className="stat-figure text-primary">
                  <Shield className="w-8 h-8" />
                </div>
                <div className="stat-title">Role</div>
                <div className="stat-value text-lg">{authUser.role}</div>
                <div className="stat-desc">
                  {authUser.role === "ADMIN"
                    ? "Full system access"
                    : "Limited access"}
                </div>
              </motion.div>
            </div>

            {/* Action Buttons */}
            {/* <motion.div
              className="flex justify-between mt-6 gap-3"
              variants={itemVariants}
            >
              <button className="profile-btn profile-btn-outline flex items-center gap-2">
                <Edit size={16} /> Edit Profile
              </button>
              <button className="profile-btn profile-btn-primary flex items-center gap-2">
                <Key size={16} /> Change Password
              </button>
            </motion.div> */}
          </div>
        </motion.div>

        {/* Components */}
        <motion.div
          className="profile-component-section mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.3 }}
        >
          <UserStats />
          <SubmissionHeatmap />

          <motion.div variants={itemVariants}>
            <ProfileSubmission />
          </motion.div>

          <motion.div variants={itemVariants}>
            <ProblemSolvedByUser />
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Profile;
