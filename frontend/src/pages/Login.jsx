import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "../styles/Login.css";
import bg from "../assets/images/arkham6.png";
import batLogo from "../assets/images/batrang2.png";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Login logic would go here
    console.log("Login attempt with:", { email, password });
  };

  // Animation variants
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

  const loginButtonVariants = {
    initial: { y: 20, opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 50,
        damping: 5,
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
        animate={{ scale: 1, opacity: 0.8 }}
        transition={{ duration: 1.8 }}
      >
        <img
          src={bg}
          alt="Arkham background"
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Spotlight effects */}
      <motion.div
        className="spotlight-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ delay: 0.5, duration: 1.5 }}
      />
      <motion.div
        className="spotlight-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.26 }}
        transition={{ delay: 0.8, duration: 1.5 }}
      />
      <motion.div
        className="spotlight-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ delay: 0.8, duration: 1.5 }}
      />

      <motion.img
        className="absolute w-[75%] mix-blend-color-dodge "
        src={batLogo}
        alt=""
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
        className="z-10 login-form-container backdrop-blur-md"
        variants={containerVariants}
        initial="initial"
        animate="animate"
      >
        <div className="green-glow"></div>

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
          Login to continue your training
        </motion.p>

        <motion.form
          onSubmit={handleSubmit}
          className="login-form"
          variants={containerVariants}
        >
          <motion.div className="form-group" variants={itemVariants}>
            <label htmlFor="email" className="form-label neue-med">
              Email
            </label>
            <input
              ref={emailRef}
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
              ref={passwordRef}
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
              placeholder="••••••••••••"
              required
            />
            <motion.div className="text-right mt-1" variants={itemVariants}>
              <Link to="/forgot-password" className="forgot-password neue-reg">
                Forgot password?
              </Link>
            </motion.div>
          </motion.div>

          <motion.button
            type="submit"
            className="login-button"
            whileHover={{
              scale: 1,
            }}
            whileTap={{ scale: 0.98 }}
            variants={loginButtonVariants}
          >
            <span className="login-btn-star">✦</span> Login
          </motion.button>

          <motion.div
            className="text-center mt-6 neue-reg text-[#adadad]"
            variants={itemVariants}
          >
            Don't have an account?{" "}
            <Link to="/sign-up" className="sign-up-link">
              Sign up
            </Link>
          </motion.div>
        </motion.form>
      </motion.div>
    </div>
  );
};
