import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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
import { ProblemPage } from "./pages/ProblemPage";
import { Loader } from "./components/Loader";

function App() {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    const checkAuthentication = async () => {
      await checkAuth();
    };
    checkAuthentication();
  }, [checkAuth]);

  // if (isCheckingAuth && !authUser) {
  //   return (
  //     <div className="flex items-center justify-center h-screen bg-[#111]">
  //       <Loader />
  //     </div>
  //   );
  // }
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<LandingPage />} />
          </Route>

          <Route
            path="/login"
            element={authUser ? <Navigate to="/dashboard" /> : <Login />}
          />
          <Route
            path="/sign-up"
            element={authUser ? <Navigate to="/dashboard" /> : <SignUp />}
          />
          <Route
            path="/dashboard"
            element={authUser ? <Dashboard /> : <Navigate to="/login" />}
          />
          <Route
            path="/profile"
            element={
              isCheckingAuth ? (
                <div className="flex items-center justify-center h-screen bg-[#111]">
                  <Loader />
                </div>
              ) : authUser ? (
                <Profile />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          <Route
            path="/problem/:id"
            element={
              isCheckingAuth ? (
                <div className="flex items-center justify-center h-screen bg-[#111]">
                  <Loader />
                </div>
              ) : authUser ? (
                <ProblemPage />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          <Route element={<AdminRoute />}>
            <Route
              path="/add-problem"
              element={authUser ? <AddProblem /> : <Navigate to="/login" />}
            />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
      <Analytics />
    </>
  );
}

export default App;
