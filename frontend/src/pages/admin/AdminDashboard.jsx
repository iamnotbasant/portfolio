import React from "react";
import { useAuthStore } from "../../store/useAuthStore";

export const AdminDashboard = () => {
  const { authUser, logout } = useAuthStore();
  const handleLogout = async () => {
    // Call the logout function from the store
    await logout();

    // Redirect to login page
    window.location.href = "/";
  };
  return (
    <div className="dashboard-container bg-black">
      <h1 className="text-white neue-med text-5xl text-center mt-12">
        Admin Dashboard
      </h1>
      <div className="logout">
        <button onClick={handleLogout} className="logout-button text-white">
          Logout
        </button>
      </div>
    </div>
  );
};
