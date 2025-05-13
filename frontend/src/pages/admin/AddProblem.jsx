import React from "react";
import ProblemForm from "../../components/ProblemForm";
import { Link } from "react-router-dom";

const AddProblem = () => {
  return (
    <div className="bg-[#101010] min-h-screen ">
      <Link to="/dashboard">
        <button className="text-white">Back</button>
      </Link>
      <h1 className="text-white text-center neue-med text-3xl">Add problem</h1>
      <ProblemForm />
    </div>
  );
};

export default AddProblem;
