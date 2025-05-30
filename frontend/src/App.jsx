import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { useEffect } from "react";
import Layout from "./layouts/Layout";
import { LandingPage } from "./LandingPage";
import { Login } from "./pages/Login";
import { SignUp } from "./pages/SignUp";
import { Dashboard } from "./pages/Dashboard";
import Profile from "./pages/Profile";
import { Analytics } from "@vercel/analytics/react";
import { useAuthStore } from "./store/useAuthStore";
import ToastContainer from "./components/ToastContainer";
import "./input.css";
import AdminRoute from "./components/AdminRoute";
import AddProblem from "./pages/admin/AddProblem";
import EditProblem from "./pages/EditProblem";
import { ProblemPage } from "./pages/ProblemPage";
import { Loader } from "./components/Loader";
import RevisionProblems from "./pages/RevisionProblems";

// Separate component to handle location and auth state
function AppRoutes() {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
  const location = useLocation();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // Create a Protected Route component to handle authentication checks consistently
  const ProtectedRoute = ({ children }) => {
    if (isCheckingAuth) {
      return (
        <div className="flex items-center justify-center h-screen bg-[#111]">
          <Loader />
        </div>
      );
    }

    if (!authUser) {
      // Store the location they were trying to access
      return <Navigate to="/login" state={{ from: location }} />;
    }

    return children;
  };

  // If still checking auth, show a loader
  if (isCheckingAuth) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#111]">
        <Loader />
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<LandingPage />} />
      </Route>
      <Route
        path="/login"
        element={
          authUser ? (
            <Navigate to={location.state?.from?.pathname || "/dashboard"} />
          ) : (
            <Login />
          )
        }
      />
      <Route
        path="/sign-up"
        element={
          authUser ? (
            <Navigate to={location.state?.from?.pathname || "/dashboard"} />
          ) : (
            <SignUp />
          )
        }
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/problem/:id"
        element={
          <ProtectedRoute>
            <ProblemPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/revision"
        element={
          <ProtectedRoute>
            <RevisionProblems />
          </ProtectedRoute>
        }
      />
      <Route element={<AdminRoute />}>
        <Route
          path="/add-problem"
          element={
            <ProtectedRoute>
              <AddProblem />
            </ProtectedRoute>
          }
        />
        <Route
          path="/problem/edit/:id"
          element={
            <ProtectedRoute>
              <EditProblem />
            </ProtectedRoute>
          }
        />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
      <Analytics />
    </>
  );
}

export default App;
