import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "../styles/Login.css";
import bg from "../assets/images/arkham6.png";
import batLogo from "../assets/images/batrang.png";

export const SignUp = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // SignUp logic would go here
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
    <div className="min-h-screen w-full flex justify-center items-center login-container">
      {/* Background */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ scale: 1.1, opacity: 0.4 }}
        animate={{ scale: 1, opacity: 0.8 }}
        transition={{ duration: 1.8 }}
      >
        <img
          src={bg}
          alt="Arkham background"
          className="w-full h-full object-cover bg filter blur-sm"
        />

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d0d0d80] to-[#0d0d0d] opacity-90"></div>
      </motion.div>

      {/* Spotlight effects */}
      <motion.div
        className="spotlight-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ delay: 0.5, duration: 1.5 }}
      />
      <motion.div
        className="spotlight-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ delay: 0.8, duration: 1.5 }}
      />

      <motion.div
        className="z-10 login-form-container backdrop-blur-md"
        variants={containerVariants}
        initial="initial"
        animate="animate"
      >
        {/* Logo */}
        <motion.div className="login-logo-container" variants={logoVariants}>
          <img src={batLogo} alt="Arkham Labs" className="login-logo" />
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
          <motion.div className="form-group" variants={itemVariants}>
            <label htmlFor="name" className="form-label neue-med">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-input"
              placeholder="Bruce Wayne"
              required
            />
          </motion.div>

          <motion.div className="form-group" variants={itemVariants}>
            <label htmlFor="email" className="form-label neue-med">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"
              placeholder="your.email@example.com"
              required
            />
          </motion.div>

          <motion.div className="form-group" variants={itemVariants}>
            <label htmlFor="password" className="form-label neue-med">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
              placeholder="••••••••••••"
              required
            />
          </motion.div>

          <motion.div className="form-group" variants={itemVariants}>
            <label htmlFor="confirmPassword" className="form-label neue-med">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="form-input"
              placeholder="••••••••••••"
              required
            />
          </motion.div>

          <motion.button
            type="submit"
            className="login-button"
            whileHover={{
              scale: 1.03,
              boxShadow: "0 0 15px rgba(255, 255, 255, 0.2)",
            }}
            whileTap={{ scale: 0.98 }}
            variants={itemVariants}
          >
            <span className="login-btn-star">✦</span> Sign Up
          </motion.button>

          <motion.div
            className="text-center mt-6 neue-reg"
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
