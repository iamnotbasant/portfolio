import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";

export const Dashboard = () => {
  const navigate = useNavigate();
  const { authUser, logout } = useAuthStore();
  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const isAdmin = authUser?.role === "ADMIN";
  return (
    <div className="dashboard-container min-h-screen bg-[#1f1f1f]">
      <h1 className="text-white neue-med text-3xl text-center">Dashboard</h1>
      <div className="logout">
        <button onClick={handleLogout} className="logout-button text-white">
          Logout
        </button>
        {isAdmin && (
          <Link className="text-white" to="/add-problem">
            <button>Add Problem</button>
          </Link>
        )}
      </div>
    </div>
  );
};
