import React from "react";

export const Dashboard = () => {
  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem("user");

    // Redirect to login page
    window.location.href = "/login";
  };
  return (
    <div className="dashboard-container bg-black">
      <h1 className="text-white neue-med text-5xl text-center mt-12">
        User Dashboard
      </h1>
      <div className="logout">
        <button onClick={handleLogout} className="logout-button text-white">
          Logout
        </button>
      </div>
    </div>
  );
};
