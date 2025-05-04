import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import "../styles/SignUp.css";
import bg from "../assets/images/arkham9.png";
import batLogo from "../assets/images/batrang2.png";

const BACKEND_URL = import.meta.env.VITE_API_URL;

export const SignUp = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // SignUp logic would go here
    try {
      const response = await axios.post(
        `${BACKEND_URL}/auth/register`,
        {
          name,
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );

      if (response.data.success) {
        // Store user info in localStorage for persistence
        localStorage.setItem("user", JSON.stringify(response.data.user));
        // Redirect based on user role
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Sign up failed:", error);
      if (error.response) {
        // Server responded with an error
        if (error.response.status === 400) {
          setError("Invalid input. Please check your details.");
        } else if (error.response.data.message) {
          setError(error.response.data.message);
        } else {
          setError("Sign up failed. Please try again.");
        }
      } else if (error.request) {
        // Request was made but no response
        setError("Server not responding. Please try again later.");
      } else {
        // Something else happened
        setError("An unexpected error occurred. Please try again.");
      }
    }
    console.log("Sign up attempt with:", { name, email, password });
  };

  // Animation variants (same as login)
  const containerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    initial: { y: 20, opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  };

  const ButtonVariants = {
    initial: { y: 20, opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        visualDuration: 0.2,
        bounce: 0.15,
        mass: 0.2,
        stiffness: 300,
      },
    },
    hover: {
      scale: 1.05,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
    tap: {
      scale: 0.95,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
  };

  const logoVariants = {
    initial: { scale: 0.8, opacity: 0, rotate: -180 },
    animate: {
      scale: 1,
      opacity: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
        duration: 1.5,
      },
    },
  };

  return (
    <div className="min-h-screen bg-black w-full flex justify-center items-center login-container">
      {/* Background */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ scale: 1.1, opacity: 0.4 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.8 }}
      >
        <img
          src={bg}
          alt="Arkham background"
          className="w-full h-full object-cover"
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
      </motion.div>

      {/* Spotlight effects */}
      <motion.div
        className="spotlight-1 signup-spotlight"
        initial={{ opacity: 0, rotate: "270deg" }}
        animate={{ opacity: 0.3, rotate: "310deg" }}
        transition={{ delay: 0.5, duration: 1.5 }}
      />
      <motion.div
        className="spotlight-2 signup-spotlight"
        initial={{ opacity: 0, rotate: "235deg" }}
        animate={{ opacity: 0.26, rotate: "235deg" }}
        transition={{ delay: 0.8, duration: 1.5 }}
      />

      <motion.div
        className="signup-spotlight-3"
        initial={{ opacity: 0, rotate: "275deg" }}
        animate={{ opacity: 0.26, rotate: "235deg" }}
        transition={{ delay: 0.8, duration: 1.5 }}
      />

      <motion.img
        className="absolute w-[75%] mix-blend-color-dodge"
        src={batLogo}
        alt=""
        loading="eager"
        fetchPriority="high"
        decoding="async"
      />

      {/* Back to home button */}
      <motion.div
        className="absolute top-5 left-5 text-white/70 transition-all duration-300 hover:text-white ease-linear"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
      >
        <Link to="/" className="back-to-home neue-med">
          ← Back to Home
        </Link>
      </motion.div>

      <motion.div
        className="z-10 signup-form-container backdrop-blur-md"
        variants={containerVariants}
        initial="initial"
        animate="animate"
      >
        <div className="blue-glow"></div>
        {/* Logo */}
        <motion.div className="login-logo-container" variants={logoVariants}>
          <img
            src={batLogo}
            alt="Arkham Labs"
            loading="eager"
            fetchPriority="high"
            decoding="async"
            className="login-logo"
          />
        </motion.div>

        <motion.h1
          className="sepulture text-4xl text-center mb-2 text-white/80"
          variants={itemVariants}
        >
          Arkham Labs
        </motion.h1>

        <motion.p
          className="text-center text-[#adadad] mb-8 neue-reg"
          variants={itemVariants}
        >
          Create an account to begin training
        </motion.p>

        <motion.form
          onSubmit={handleSubmit}
          className="login-form"
          variants={containerVariants}
        >
          <motion.div className="signup-form-group" variants={itemVariants}>
            <label htmlFor="name" className="form-label neue-med">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-input signup-form-input"
              placeholder="Bruce Wayne"
              required
            />
          </motion.div>

          <motion.div className="signup-form-group" variants={itemVariants}>
            <label htmlFor="email" className="form-label neue-med">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input signup-form-input"
              placeholder="your.email@example.com"
              required
            />
          </motion.div>

          <motion.div className="signup-form-group" variants={itemVariants}>
            <label htmlFor="password" className="form-label neue-med">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input signup-form-input"
              placeholder="••••••••••••"
              required
            />
          </motion.div>

          <motion.div className="signup-form-group" variants={itemVariants}>
            <label htmlFor="confirmPassword" className="form-label neue-med">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="form-input signup-form-input"
              placeholder="••••••••••••"
              required
            />
          </motion.div>

          <motion.button
            type="submit"
            className="signup-button"
            whileHover={{
              scale: 1,
            }}
            whileTap={{ scale: 0.98 }}
            variants={ButtonVariants}
          >
            <span className="login-btn-star">✦</span> Sign Up
          </motion.button>

          <motion.div
            className="text-center mt-6 neue-reg text-[#adadad]"
            variants={itemVariants}
          >
            Already have an account?{" "}
            <Link to="/login" className="sign-up-link">
              Login
            </Link>
          </motion.div>
        </motion.form>
      </motion.div>
    </div>
  );
};
