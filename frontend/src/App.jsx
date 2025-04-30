import "./input.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LandingPage } from "./LandingPage";
import { Login } from "./pages/Login";
import { SignUp } from "./pages/SignUp";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
