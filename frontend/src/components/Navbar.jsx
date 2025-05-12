import React from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";

export const Navbar = () => {
  const { authUser } = useAuthStore();
  return <nav></nav>;
};
